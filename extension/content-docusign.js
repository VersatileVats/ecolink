// Part of the URL to identify the request (the one which contains the image of the Docusign agreement)
const targetUrlPart = "RasterizerImage.aspx";

let defaultTemperature, defaultTopK, promptSession, errorDiv, question, answer;

// Fetch and convert the image to Base64
async function fetchImageAsBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    return {
      base64,
    };

    // You can send the Base64 string to your server or process it further here
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      error: "Some error occured",
    };
  }
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

// for changing the grayscale filter for the image
function startGrayscaleAnimation(imgElement) {
  imgElement = document.querySelector("#ecolinkImage");

  const intervalId = setInterval(() => {
    imgElement.style.filter =
      imgElement.style.filter === "grayscale(100%)"
        ? "grayscale(0%)"
        : "grayscale(100%)";
  }, 500);

  // Attach the intervalId to the element for later reference
  imgElement.dataset.intervalId = intervalId;
}

// Identify and fetch the image
async function monitorNetworkRequests() {
  const observer = new PerformanceObserver(async (list) => {
    list.getEntries().forEach(async (entry) => {
      if (entry.name.includes(targetUrlPart)) {
        // got the docusign agreement image base644encoded version
        const base64Image = await fetchImageAsBase64(entry.name);
        observer.disconnect();

        const imageUrl = chrome.runtime.getURL("images/logo-64.png");
        const imgElement = document.createElement("img");
        imgElement.setAttribute("id", "ecolinkImage");
        imgElement.alt = "Extension logo";
        imgElement.src = imageUrl;
        Object.assign(imgElement.style, {
          filter: "grayscale(100%)",
          position: "fixed",
          left: "2rem",
          top: "10vh",
          zIndex: "1",
        });

        document.body.appendChild(imgElement);

        errorDiv = document.createElement("p");
        Object.assign(errorDiv.style, {
          color: "white",
          zIndex: "1",
          top: "10vh",
          right: "5rem",
          padding: "4px",
          position: "fixed",
          maxWidth: "200px",
          borderRadius: "4px",
          textAlign: "justify",
          background: "rgba(255, 3, 3, 0.5)",
        });

        document.body.appendChild(errorDiv);

        let stopReason = "";
        let stopHere = false;

        // if there is an error, then stop here
        if (base64Image?.error) {
          stopHere = true;
          stopReason = "OCR failed!!";
        }

        // check for the CHROME AI?
        if (!self.ai) {
          stopHere = true;
          stopReason =
            "Browser does not support Chrome AI. Use Chrome Dev/Canary with AI flags";
        }

        if (stopHere) {
          errorDiv.innerHTML = stopReason;
          return;
        }

        // make a call to the server to fetch the OCR text for the agreement
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          base64Image: base64Image.base64,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        let ocrResult = await fetch(
          "https://esign-versatilevats-dev.apps.rm3.7wse.p1.openshiftapps.com/extract-text",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result)
          .catch((error) => error);

        console.log(ocrResult);

        if (ocrResult?.error) errorDiv.innerHTML = ocrResult.error;
        else {
          document.body.setAttribute("tab1-docusign-text", ocrResult.text);
          imgElement.style.filter = "grayscale(0%)";

          let { defaultTemperature, defaultTopK } =
            await self.ai.languageModel.capabilities();

          promptSession = await self.ai.languageModel.create({
            temperature: defaultTemperature,
            topK: defaultTopK,
            systemPrompt: `You must answer only based on the provided context. Do not include any external knowledge. ${ocrResult.text}`,
          });

          await promptSession
            .prompt(
              "Summarize the content, and do not include external infomation"
            )
            .then((data) => {
              // show the summary in the UI
              const summary = document.createElement("p");
              summary.textContent = data;
              summary.innerHTML = `<b><u>Summary:</u></b><br>${summary.textContent}`;
              Object.assign(summary.style, {
                zIndex: "1",
                top: "20vh",
                left: "2rem",
                padding: "4px",
                color: "black",
                overflow: "auto",
                maxHeight: "70vh",
                maxWidth: "280px",
                position: "fixed",
                borderRadius: "4px",
                textAlign: "justify",
              });
              document.body.appendChild(summary);

              // work on the Q&A section
              question = document.createElement("input");
              question.placeholder = "Use AI to get your questions answered";
              Object.assign(question.style, {
                borderRadius: "8px",
                position: "fixed",
                width: "280px",
                right: "5rem",
                top: "25vh",
                zIndex: "1",
              });

              question.addEventListener("keydown", async (e) => {
                if (e.key == "Enter") {
                  if (e.target.value != "" && e.target.value.length > 8) {
                    startGrayscaleAnimation();

                    e.target.blur();
                    document.body.focus();
                    answer.style.display = "none";
                    e.target.style.pointerEvents = "none";
                    // only proceed if the prompt session is available
                    if (promptSession) {
                      await promptSession
                        .prompt(
                          `Please keep the answer for the following question in 100 words only. ${e.target.value}`
                        )
                        .then((data) => {
                          answer.style.display = "block";
                          answer.textContent = data;
                          return;
                        })
                        .catch((err) => {
                          errorDiv.innerHTML = err;
                        });
                    } else {
                      errorDiv.innerHTML = "Prompt session expired! Refresh";
                    }
                    e.target.style.pointerEvents = "auto";
                    clearInterval(
                      document.querySelector("#ecolinkImage").dataset.intervalId
                    );
                    document.querySelector("#ecolinkImage").style.filter =
                      "grayscale(0%)";
                  } else
                    errorDiv.innerHTML =
                      "Provide a question of more than 8 characters";
                }
              });

              document.body.appendChild(question);

              answer = document.createElement("p");
              answer.setAttribute("id", "answer");
              Object.assign(answer.style, {
                borderRadius: "8px",
                position: "fixed",
                display: "none",
                width: "280px",
                right: "5rem",
                top: "30vh",
                zIndex: "1",
              });

              document.body.appendChild(answer);
            })
            .catch((err) => {
              errorDiv.innerHTML = err;
            });
        }
      }
    });
  });

  observer.observe({ entryTypes: ["resource"] });
}

// observer for URL change
// captures the URL changes on an already opened page
(function monitorURLChanges() {
  let previousUrl = window.location.href;
  console.log(previousUrl);

  const observer = new MutationObserver(() => {
    if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;
      console.log("URL changed to:", previousUrl);
      if (
        window.location.href.includes("https://apps-d.docusign.com/sign/app")
      ) {
        monitorNetworkRequests();

        // Start polling for the ".page-image" element
        const intervalId = setInterval(() => {
          // each page of the template have the class: page-tabs
          const pageTabsElement = document.querySelector(".page-image");
          if (pageTabsElement) {
            console.log(pageTabsElement);
            clearInterval(intervalId); // Stop the interval once the element is found
          }
        }, 100); // Check every 100 milliseconds
      }
    }
  });

  observer.observe(document, { subtree: true, childList: true });
})();
