const contractAddress = "0x5ff66790de20f59f3735fe4eda5c8290398b5dce";
const ABI = `[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`;
let byteCode =
  "60806040523480156200001157600080fd5b506040516200239538038062002395833981016040819052620000349162000764565b8282600562000044838262000883565b50600662000053828262000883565b5050506000620000686200008c60201b60201c565b9050620000763382620000aa565b620000828183620000d0565b5050505062000a49565b6000620000a560016200016160201b620008fc1760201c565b905090565b620000cc8282604051806020016040528060008152506200017260201b60201c565b5050565b620000db82620001f6565b620001425760405162461bcd60e51b815260206004820152602c60248201527f544e543732314d657461646174613a2055524920736574206f66206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b60008281526007602052604090206200015c828262000883565b505050565b60006200016c825490565b92915050565b6200017e838362000213565b6200018d60008484846200034f565b6200015c5760405162461bcd60e51b815260206004820152603260248201527f544e543732313a207472616e7366657220746f206e6f6e20544e54373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840162000139565b60006200016c8260016200044b60201b620009061790919060201c565b6001600160a01b0382166200026b5760405162461bcd60e51b815260206004820181905260248201527f544e543732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640162000139565b6200027681620001f6565b15620002c55760405162461bcd60e51b815260206004820152601c60248201527f544e543732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640162000139565b6001600160a01b038216600090815260208181526040909120620002f49183906200091e62000466821b17901c565b5062000312818360016200047460201b6200092a179092919060201c565b5060405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600062000370846001600160a01b03166200048c60201b620009481760201c565b6200037e5750600162000443565b60006200041163df20cc6d60e01b33888787604051602401620003a594939291906200097d565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050506040518060600160405280603281526020016200236360329139876001600160a01b03166200049260201b6200094e179092919060201c565b90506000818060200190518101906200042b9190620009b2565b6001600160e01b031916630a85bd0160e11b14925050505b949350505050565b600081815260018301602052604081205415155b9392505050565b60006200045f8383620004a3565b60006200044384846001600160a01b038516620004f5565b3b151590565b6060620004438484600085620005a0565b6000818152600183016020526040812054620004ec575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200016c565b5060006200016c565b60008281526001840160205260408120548082036200055e5750506040805180820182528381526020808201848152865460018181018955600089815284812095516002909302909501918255915190820155865486845281880190925292909120556200045f565b82856200056d600184620009de565b8154811062000580576200058062000a00565b90600052602060002090600202016001018190555060009150506200045f565b6060843b620005f25760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640162000139565b600080866001600160a01b0316858760405162000610919062000a16565b60006040518083038185875af1925050503d80600081146200064f576040519150601f19603f3d011682016040523d82523d6000602084013e62000654565b606091505b509150915081156200066a579150620004439050565b8051156200067b5780518082602001fd5b8360405162461bcd60e51b815260040162000139919062000a34565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620006ca578181015183820152602001620006b0565b50506000910152565b600082601f830112620006e557600080fd5b81516001600160401b038082111562000702576200070262000697565b604051601f8301601f19908116603f011681019082821181831017156200072d576200072d62000697565b816040528381528660208588010111156200074757600080fd5b6200075a846020830160208901620006ad565b9695505050505050565b6000806000606084860312156200077a57600080fd5b83516001600160401b03808211156200079257600080fd5b620007a087838801620006d3565b94506020860151915080821115620007b757600080fd5b620007c587838801620006d3565b93506040860151915080821115620007dc57600080fd5b50620007eb86828701620006d3565b9150509250925092565b600181811c908216806200080a57607f821691505b6020821081036200082b57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200015c57600081815260208120601f850160051c810160208610156200085a5750805b601f850160051c820191505b818110156200087b5782815560010162000866565b505050505050565b81516001600160401b038111156200089f576200089f62000697565b620008b781620008b08454620007f5565b8462000831565b602080601f831160018114620008ef5760008415620008d65750858301515b600019600386901b1c1916600185901b1785556200087b565b600085815260208120601f198616915b828110156200092057888601518255948401946001909101908401620008ff565b50858210156200093f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000815180845262000969816020860160208601620006ad565b601f01601f19169290920160200192915050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906200075a908301846200094f565b600060208284031215620009c557600080fd5b81516001600160e01b0319811681146200045f57600080fd5b818103818111156200016c57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000825162000a2a818460208701620006ad565b9190910192915050565b6020815260006200045f60208301846200094f565b61190a8062000a596000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80634f6ccce7116100a257806395d89b411161007157806395d89b411461021d578063a22cb46514610225578063b88d4fde14610238578063c87b56dd1461024b578063e985e9c51461025e57600080fd5b80634f6ccce7146101dc5780636352211e146101ef5780636c0360eb1461020257806370a082311461020a57600080fd5b806318160ddd116100de57806318160ddd1461018d57806323b872dd146101a35780632f745c59146101b657806342842e0e146101c957600080fd5b806301ffc9a71461011057806306fdde0314610138578063081812fc1461014d578063095ea7b314610178575b600080fd5b61012361011e3660046113b3565b61029a565b60405190151581526020015b60405180910390f35b6101406102ec565b60405161012f9190611420565b61016061015b366004611433565b61037e565b6040516001600160a01b03909116815260200161012f565b61018b610186366004611468565b61040b565b005b610195610520565b60405190815260200161012f565b61018b6101b1366004611492565b610531565b6101956101c4366004611468565b610562565b61018b6101d7366004611492565b61058b565b6101956101ea366004611433565b6105a6565b6101606101fd366004611433565b6105bc565b6101406105e4565b6101956102183660046114ce565b6105f3565b61014061067f565b61018b6102333660046114e9565b61068e565b61018b61024636600461153b565b610752565b610140610259366004611433565b61078a565b61012361026c366004611617565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b14806102cb57506001600160e01b03198216635b5e139f60e01b145b806102e657506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600580546102fb9061164a565b80601f01602080910402602001604051908101604052809291908181526020018280546103279061164a565b80156103745780601f1061034957610100808354040283529160200191610374565b820191906000526020600020905b81548152906001019060200180831161035757829003601f168201915b5050505050905090565b60006103898261095d565b6103ef5760405162461bcd60e51b815260206004820152602c60248201527f544e543732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600360205260409020546001600160a01b031690565b6000610416826105bc565b9050806001600160a01b0316836001600160a01b0316036104835760405162461bcd60e51b815260206004820152602160248201527f544e543732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103e6565b336001600160a01b038216148061049f575061049f813361026c565b6105115760405162461bcd60e51b815260206004820152603860248201527f544e543732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103e6565b61051b838361096a565b505050565b600061052c60016108fc565b905090565b61053b33826109d8565b6105575760405162461bcd60e51b81526004016103e690611684565b61051b838383610ac1565b6001600160a01b03821660009081526020819052604081206105849083610c42565b9392505050565b61051b83838360405180602001604052806000815250610752565b6000806105b4600184610c4e565b509392505050565b60006102e68260405180606001604052806029815260200161187a6029913960019190610c6a565b6060600880546102fb9061164a565b60006001600160a01b03821661065e5760405162461bcd60e51b815260206004820152602a60248201527f544e543732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103e6565b6001600160a01b03821660009081526020819052604090206102e6906108fc565b6060600680546102fb9061164a565b336001600160a01b038316036106e65760405162461bcd60e51b815260206004820152601960248201527f544e543732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103e6565b3360008181526004602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61075c33836109d8565b6107785760405162461bcd60e51b81526004016103e690611684565b61078484848484610c77565b50505050565b60606107958261095d565b6107f95760405162461bcd60e51b815260206004820152602f60248201527f544e543732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103e6565b600082815260076020526040812080546108129061164a565b80601f016020809104026020016040519081016040528092919081815260200182805461083e9061164a565b801561088b5780601f106108605761010080835404028352916020019161088b565b820191906000526020600020905b81548152906001019060200180831161086e57829003601f168201915b505050505090506008805461089f9061164a565b90506000036108ae5792915050565b8051156108e0576008816040516020016108c99291906116f1565b604051602081830303815290604052915050919050565b60086108eb84610cf5565b6040516020016108c99291906116f1565b60006102e6825490565b60008181526001830160205260408120541515610584565b60006105848383610d88565b600061094084846001600160a01b038516610dd7565b949350505050565b3b151590565b60606109408484600085610e7a565b60006102e6600183610906565b600081815260036020526040902080546001600160a01b0319166001600160a01b038416908117909155819061099f826105bc565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006109e38261095d565b610a445760405162461bcd60e51b815260206004820152602c60248201527f544e543732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103e6565b6000610a4f836105bc565b9050806001600160a01b0316846001600160a01b03161480610a8a5750836001600160a01b0316610a7f8461037e565b6001600160a01b0316145b8061094057506001600160a01b0380821660009081526004602090815260408083209388168352929052205460ff16949350505050565b826001600160a01b0316610ad4826105bc565b6001600160a01b031614610b3c5760405162461bcd60e51b815260206004820152602960248201527f544e543732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103e6565b6001600160a01b038216610b9e5760405162461bcd60e51b8152602060048201526024808201527f544e543732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103e6565b610ba960008261096a565b6001600160a01b0383166000908152602081905260409020610bcb9082610f66565b506001600160a01b0382166000908152602081905260409020610bee908261091e565b50610bfb6001828461092a565b5080826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b60006105848383610f72565b6000808080610c5d8686610ff8565b9097909650945050505050565b6000610940848484611095565b610c82848484610ac1565b610c8e848484846110fe565b6107845760405162461bcd60e51b815260206004820152603260248201527f544e543732313a207472616e7366657220746f206e6f6e20544e54373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016103e6565b60606000610d02836111cf565b600101905060008167ffffffffffffffff811115610d2257610d22611525565b6040519080825280601f01601f191660200182016040528015610d4c576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610d5657509392505050565b6000818152600183016020526040812054610dcf575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556102e6565b5060006102e6565b6000828152600184016020526040812054808203610e3e575050604080518082018252838152602080820184815286546001818101895560008981528481209551600290930290950191825591519082015586548684528188019092529290912055610584565b8285610e4b6001846117b1565b81548110610e5b57610e5b6117c4565b9060005260206000209060020201600101819055506000915050610584565b6060843b610eca5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016103e6565b600080866001600160a01b03168587604051610ee691906117da565b60006040518083038185875af1925050503d8060008114610f23576040519150601f19603f3d011682016040523d82523d6000602084013e610f28565b606091505b50915091508115610f3c5791506109409050565b805115610f4c5780518082602001fd5b8360405162461bcd60e51b81526004016103e69190611420565b600061058483836112a7565b81546000908210610fd05760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604482015261647360f01b60648201526084016103e6565b826000018281548110610fe557610fe56117c4565b9060005260206000200154905092915050565b8154600090819083106110585760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e604482015261647360f01b60648201526084016103e6565b600084600001848154811061106f5761106f6117c4565b906000526020600020906002020190508060000154816001015492509250509250929050565b600082815260018401602052604081205482816110c55760405162461bcd60e51b81526004016103e69190611420565b50846110d26001836117b1565b815481106110e2576110e26117c4565b9060005260206000209060020201600101549150509392505050565b60006001600160a01b0384163b61111757506001610940565b600061119863df20cc6d60e01b3388878760405160240161113b94939291906117f6565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050506040518060600160405280603281526020016118a3603291396001600160a01b038816919061094e565b90506000818060200190518101906111b09190611833565b6001600160e01b031916630a85bd0160e11b1492505050949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061120e5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061123a576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061125857662386f26fc10000830492506010015b6305f5e1008310611270576305f5e100830492506008015b612710831061128457612710830492506004015b60648310611296576064830492506002015b600a83106102e65760010192915050565b600081815260018301602052604081205480156113905760006112cb6001836117b1565b85549091506000906112df906001906117b1565b905060008660000182815481106112f8576112f86117c4565b906000526020600020015490508087600001848154811061131b5761131b6117c4565b600091825260209091200155611332836001611850565b6000828152600189016020526040902055865487908061135457611354611863565b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506102e6565b60009150506102e6565b6001600160e01b0319811681146113b057600080fd5b50565b6000602082840312156113c557600080fd5b81356105848161139a565b60005b838110156113eb5781810151838201526020016113d3565b50506000910152565b6000815180845261140c8160208601602086016113d0565b601f01601f19169290920160200192915050565b60208152600061058460208301846113f4565b60006020828403121561144557600080fd5b5035919050565b80356001600160a01b038116811461146357600080fd5b919050565b6000806040838503121561147b57600080fd5b6114848361144c565b946020939093013593505050565b6000806000606084860312156114a757600080fd5b6114b08461144c565b92506114be6020850161144c565b9150604084013590509250925092565b6000602082840312156114e057600080fd5b6105848261144c565b600080604083850312156114fc57600080fd5b6115058361144c565b91506020830135801515811461151a57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561155157600080fd5b61155a8561144c565b93506115686020860161144c565b925060408501359150606085013567ffffffffffffffff8082111561158c57600080fd5b818701915087601f8301126115a057600080fd5b8135818111156115b2576115b2611525565b604051601f8201601f19908116603f011681019083821181831017156115da576115da611525565b816040528281528a60208487010111156115f357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561162a57600080fd5b6116338361144c565b91506116416020840161144c565b90509250929050565b600181811c9082168061165e57607f821691505b60208210810361167e57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f544e543732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600081516116e78185602086016113d0565b9290920192915050565b600080845481600182811c91508083168061170d57607f831692505b6020808410820361172c57634e487b7160e01b86526022600452602486fd5b818015611740576001811461175557611782565b60ff1986168952841515850289019650611782565b60008b81526020902060005b8681101561177a5781548b820152908501908301611761565b505084890196505b50505050505061179281856116d5565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156102e6576102e661179b565b634e487b7160e01b600052603260045260246000fd5b600082516117ec8184602087016113d0565b9190910192915050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611829908301846113f4565b9695505050505050565b60006020828403121561184557600080fd5b81516105848161139a565b808201808211156102e6576102e661179b565b634e487b7160e01b600052603160045260246000fdfe544e543732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e544e543732313a207472616e7366657220746f206e6f6e20544e54373231526563656976657220696d706c656d656e746572a264697066735822122005f4b19666abf45f0d8fbc05dfeba7929a43a0f5b4ef31ec2635e1ab5cef84d464736f6c63430008120033544e543732313a207472616e7366657220746f206e6f6e20544e54373231526563656976657220696d706c656d656e746572";

module.exports = {
  contractAddress,
  ABI,
  byteCode,
};
