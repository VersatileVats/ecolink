const fs = require("fs");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const express = require("express");
const Tesseract = require("tesseract.js");
const docusign = require("docusign-esign");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const PORT = 7580;

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// DocuSign configuration
const config = {
  integratorKey: process.env.integratorKey,
  userId: process.env.userId,
  privateKeyFile: "./keys/private.key",
  basePath: "https://account-d.docusign.com",
  accountId: process.env.accountId,
};

// JSONBIN ENDPOINTS to get the saved accessToken
async function readBin(binId = "6792ea50acd3cb34a8d1fb2f") {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
      headers: {
        "X-Master-Key": process.env.jsonBinAPIKey,
      },
    });
    return {
      accessToken: response.data.record.accessToken,
      changedCount: response.data.record.changed,
      error: "",
    };
  } catch (error) {
    console.error("Error reading bin!!");
    console.log(error.response.data.message);

    return {
      error: error.response.data.message,
    };
  }
}

async function addDataInBin(data, binId = "6792ea50acd3cb34a8d1fb2f") {
  try {
    const response = await axios.put(
      `https://api.jsonbin.io/v3/b/${binId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": process.env.jsonBinAPIKey,
        },
      }
    );

    console.log("Updated the access token");

    return {
      error: "",
      result: response.data,
    };
  } catch (error) {
    console.error("Error updating bin");
    return {
      error,
      result: "",
    };
  }
}

// Function to get access token using JWT
async function getAccessToken(changedCount = 0) {
  try {
    // Initialize API client
    const apiClient = new docusign.ApiClient();
    apiClient.setOAuthBasePath(config.basePath.replace("https://", ""));

    // Load private key
    const privateKey = fs.readFileSync(config.privateKeyFile);

    // Request JWT user token
    const results = await apiClient.requestJWTUserToken(
      config.integratorKey,
      config.userId,
      ["signature", "impersonation"],
      privateKey,
      3600 // Token expiry (1 hour)
    );

    // save the same in JSON BIN
    await addDataInBin({
      accessToken: results.body.access_token,
      changed: changedCount,
    });

    return results.body.access_token;
  } catch (error) {
    // console.log(error.response?.data);
    throw error;
  }
}

// check the access token validity
async function checkTokenValidity(accessToken) {
  try {
    await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: "https://account-d.docusign.com/oauth/userinfo",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

// dfeault endpoint
app.get("/", async (req, res) => {
  res.send({
    result: "Docusign esign server for handling signature requests",
  });
});

/*Example request
{
  "templateId": "877a9230-b209-4590-9aaf-0ae379b7bbc7", and "495d4ebf-85fb-43b2-b2b0-a91338440acd"
  "customFieldValues": [
    {"name": "orderID", "value": "670bef71730860255295"},
    {"name": "orderTotal", "value": "$1201 (120 tfuels)"},
    {"name": "purchaseTime", "value": "1/6/2024, 8:00:55 AM"}
  ],
  "recipients": [
    {
      "email": "allaboutclashing@gmail.com",
      "name": "Ferguson",
      "roleName": "Buyer" // Registrant for t&c email
    }
  ],
  "multiSigning": false
}

*/

// send templates to the resgitrant, or buyers
app.post("/sendTemplate", async (req, res) => {
  let { templateId, recipients, multiSigning } = req.body;
  let { changedCount, accessToken } = await readBin();

  if (!templateId || !recipients)
    return res
      .status(500)
      .send({ succes: false, error: "Provide the entire data" });

  if (!accessToken)
    return res
      .status(500)
      .send({ success: false, error: "No access token provided" });

  try {
    // check the access token's validity
    if (!(await checkTokenValidity(accessToken))) {
      // fetch a new one
      accessToken = await getAccessToken(changedCount + 1);
      console.log(`New access token generated`);
    }

    const apiClient = new docusign.ApiClient();
    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
    apiClient.setBasePath("https://demo.docusign.net/restapi");

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    // for the "order confirmation" agreement
    const tabs =
      templateId === "877a9230-b209-4590-9aaf-0ae379b7bbc7"
        ? {
            textTabs: req.body.customFieldValues.map((field) => ({
              tabLabel: field.name,
              value: field.value,
            })),
          }
        : null;

    // Define TemplateRoles for the envelope
    const templateRoles = recipients.map((recipient, index) => ({
      email: recipient.email,
      name: recipient.name,
      roleName: recipient.roleName,
      routingOrder: multiSigning ? index + 1 : 1, // Sequential if multiSigning is true
      tabs,
    }));

    // Create Envelope Request Body
    const envelopeDefinition = {
      templateId,
      templateRoles,
      status: "sent", // Send immediately
    };

    // Send the Envelope
    const results = await envelopesApi.createEnvelope(config.accountId, {
      envelopeDefinition,
    });

    console.log("Envelope sent! Envelope ID:", results.envelopeId);
    res.status(200).send({
      success: true,
      envelopeId: results.envelopeId,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).send({
      success: false,
      error: error.response?.data?.message || error.message,
    });
  }
});

// get the current status of the envelope
app.get("/envelope-status/:envelopeId?", async (req, res) => {
  let { envelopeId } = req.params;
  let { changedCount, accessToken } = await readBin();

  if (!accessToken || !envelopeId) {
    res.status(500).send({
      success: false,
      error: "Access token or envelope ID is missing",
    });
    return;
  }

  try {
    // check the access token's validity
    if (!(await checkTokenValidity(accessToken))) {
      // fetch a new one
      accessToken = await getAccessToken(changedCount + 1);
      console.log(`New access token generated`);
    }

    const apiClient = new docusign.ApiClient();
    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
    apiClient.setBasePath("https://demo.docusign.net/restapi");

    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    const envelope = await envelopesApi.getEnvelope(
      config.accountId,
      envelopeId
    );

    // envelope.status is the one
    // status is "sent", "delivered", "completed" & can even be "declined"
    res.status(200).json({ success: true, status: envelope.status });
  } catch (error) {
    // console.error(error.response?.data);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message,
    });
  }
});

// fetch the reason of denial for an envelopeId
app.get("/declineReason/:envelopeId?", async (req, res) => {
  let { changedCount, accessToken } = await readBin();
  let { envelopeId } = req.params;

  if (!envelopeId) {
    res.status(500).send({
      success: false,
      error: "Envelope ID is missing",
    });
    return;
  }

  try {
    // check the access token's validity
    if (!(await checkTokenValidity(accessToken))) {
      // fetch a new one
      accessToken = await getAccessToken(changedCount + 1);
      console.log(`New access token generated`);
    }

    const apiClient = new docusign.ApiClient();
    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
    apiClient.setBasePath("https://demo.docusign.net/restapi");

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    const recipients = await envelopesApi.listRecipients(
      config.accountId,
      envelopeId
    );

    const declinedRecipient = recipients.signers.find(
      (signer) => signer.status === "declined"
    );

    if (declinedRecipient) {
      console.log("Declined Reason:", declinedRecipient.declinedReason);
      res.status(200).send({
        success: true,
        reason: declinedRecipient.declinedReason,
      });
    } else {
      res.status(200).send({
        success: false,
        error: "Not declined!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.response?.data?.message || error.message,
    });
  }
});

// Endpoint to extract text from Base64 image data
app.post("/extract-text", async (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: "Base64 image data is required" });
  }

  try {
    const dataDir = path.join(__dirname, "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const imagePath = path.join(dataDir, "temp-image.png");

    // Decode Base64 and save as a temporary file
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(imagePath, base64Data, { encoding: "base64" });

    // Perform OCR on the image
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "eng");
    res.json({ text });

    // Cleanup the temporary image file
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  }
});

(async () => {
  await getAccessToken();
})();
