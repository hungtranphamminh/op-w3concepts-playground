export const bridgeAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "oldContract",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newContract",
                type: "address",
            },
        ],
        name: "ContractUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint16",
                name: "emitterChainId",
                type: "uint16",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "emitterAddress",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        name: "TransferRedeemed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        inputs: [],
        name: "WETH",
        outputs: [
            {
                internalType: "contract IWETH",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "_parseTransferCommon",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "to",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "toChain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint256",
                        name: "fee",
                        type: "uint256",
                    },
                ],
                internalType: "struct BridgeStructs.Transfer",
                name: "transfer",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
        ],
        name: "attestToken",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "chainId_",
                type: "uint16",
            },
        ],
        name: "bridgeContracts",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "chainId",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "completeTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "completeTransferAndUnwrapETH",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "completeTransferAndUnwrapETHWithPayload",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "completeTransferWithPayload",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "createWrapped",
        outputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "decimals",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes32",
                        name: "symbol",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "name",
                        type: "bytes32",
                    },
                ],
                internalType: "struct BridgeStructs.AssetMeta",
                name: "meta",
                type: "tuple",
            },
        ],
        name: "encodeAssetMeta",
        outputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "to",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "toChain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint256",
                        name: "fee",
                        type: "uint256",
                    },
                ],
                internalType: "struct BridgeStructs.Transfer",
                name: "transfer",
                type: "tuple",
            },
        ],
        name: "encodeTransfer",
        outputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "to",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "toChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "fromAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                    },
                ],
                internalType: "struct BridgeStructs.TransferWithPayload",
                name: "transfer",
                type: "tuple",
            },
        ],
        name: "encodeTransferWithPayload",
        outputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "evmChainId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "finality",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "governanceActionIsConsumed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "governanceChainId",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "governanceContract",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isFork",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "impl",
                type: "address",
            },
        ],
        name: "isInitialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "isTransferCompleted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "isWrappedAsset",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "outstandingBridged",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parseAssetMeta",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "decimals",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes32",
                        name: "symbol",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "name",
                        type: "bytes32",
                    },
                ],
                internalType: "struct BridgeStructs.AssetMeta",
                name: "meta",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parsePayloadID",
        outputs: [
            {
                internalType: "uint8",
                name: "payloadID",
                type: "uint8",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedRecoverChainId",
                type: "bytes",
            },
        ],
        name: "parseRecoverChainId",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "evmChainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint16",
                        name: "newChainId",
                        type: "uint16",
                    },
                ],
                internalType: "struct BridgeStructs.RecoverChainId",
                name: "rci",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parseRegisterChain",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chainId",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "emitterChainID",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "emitterAddress",
                        type: "bytes32",
                    },
                ],
                internalType: "struct BridgeStructs.RegisterChain",
                name: "chain",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parseTransfer",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "to",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "toChain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint256",
                        name: "fee",
                        type: "uint256",
                    },
                ],
                internalType: "struct BridgeStructs.Transfer",
                name: "transfer",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parseTransferWithPayload",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "payloadID",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "tokenChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "to",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "toChain",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "fromAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                    },
                ],
                internalType: "struct BridgeStructs.TransferWithPayload",
                name: "transfer",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encoded",
                type: "bytes",
            },
        ],
        name: "parseUpgrade",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chainId",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "newContract",
                        type: "bytes32",
                    },
                ],
                internalType: "struct BridgeStructs.UpgradeContract",
                name: "chain",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVM",
                type: "bytes",
            },
        ],
        name: "registerChain",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVM",
                type: "bytes",
            },
        ],
        name: "submitRecoverChainId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "tokenImplementation",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint16",
                name: "recipientChain",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "recipient",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "arbiterFee",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
        ],
        name: "transferTokens",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint16",
                name: "recipientChain",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "recipient",
                type: "bytes32",
            },
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "payload",
                type: "bytes",
            },
        ],
        name: "transferTokensWithPayload",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVm",
                type: "bytes",
            },
        ],
        name: "updateWrapped",
        outputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVM",
                type: "bytes",
            },
        ],
        name: "upgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "wormhole",
        outputs: [
            {
                internalType: "contract IWormhole",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "recipientChain",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "recipient",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "arbiterFee",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
        ],
        name: "wrapAndTransferETH",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "recipientChain",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "recipient",
                type: "bytes32",
            },
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "payload",
                type: "bytes",
            },
        ],
        name: "wrapAndTransferETHWithPayload",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "tokenChainId",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "tokenAddress",
                type: "bytes32",
            },
        ],
        name: "wrappedAsset",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

export const guardianFactoryAbi =  [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "oldContract",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newContract",
                type: "address",
            },
        ],
        name: "ContractUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint32",
                name: "index",
                type: "uint32",
            },
        ],
        name: "GuardianSetAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "payload",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "consistencyLevel",
                type: "uint8",
            },
        ],
        name: "LogMessagePublished",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [],
        name: "chainId",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "evmChainId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentGuardianSetIndex",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "index",
                type: "uint32",
            },
        ],
        name: "getGuardianSet",
        outputs: [
            {
                components: [
                    {
                        internalType: "address[]",
                        name: "keys",
                        type: "address[]",
                    },
                    {
                        internalType: "uint32",
                        name: "expirationTime",
                        type: "uint32",
                    },
                ],
                internalType: "struct Structs.GuardianSet",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getGuardianSetExpiry",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "governanceActionIsConsumed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "governanceChainId",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "governanceContract",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "isFork",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "impl",
                type: "address",
            },
        ],
        name: "isInitialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "messageFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "emitter",
                type: "address",
            },
        ],
        name: "nextSequence",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVM",
                type: "bytes",
            },
        ],
        name: "parseAndVerifyVM",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "version",
                        type: "uint8",
                    },
                    {
                        internalType: "uint32",
                        name: "timestamp",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "nonce",
                        type: "uint32",
                    },
                    {
                        internalType: "uint16",
                        name: "emitterChainId",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "emitterAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint64",
                        name: "sequence",
                        type: "uint64",
                    },
                    {
                        internalType: "uint8",
                        name: "consistencyLevel",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                    },
                    {
                        internalType: "uint32",
                        name: "guardianSetIndex",
                        type: "uint32",
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "r",
                                type: "bytes32",
                            },
                            {
                                internalType: "bytes32",
                                name: "s",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint8",
                                name: "v",
                                type: "uint8",
                            },
                            {
                                internalType: "uint8",
                                name: "guardianIndex",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct Structs.Signature[]",
                        name: "signatures",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes32",
                        name: "hash",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Structs.VM",
                name: "vm",
                type: "tuple",
            },
            {
                internalType: "bool",
                name: "valid",
                type: "bool",
            },
            {
                internalType: "string",
                name: "reason",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedUpgrade",
                type: "bytes",
            },
        ],
        name: "parseContractUpgrade",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chain",
                        type: "uint16",
                    },
                    {
                        internalType: "address",
                        name: "newContract",
                        type: "address",
                    },
                ],
                internalType: "struct GovernanceStructs.ContractUpgrade",
                name: "cu",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedUpgrade",
                type: "bytes",
            },
        ],
        name: "parseGuardianSetUpgrade",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chain",
                        type: "uint16",
                    },
                    {
                        components: [
                            {
                                internalType: "address[]",
                                name: "keys",
                                type: "address[]",
                            },
                            {
                                internalType: "uint32",
                                name: "expirationTime",
                                type: "uint32",
                            },
                        ],
                        internalType: "struct Structs.GuardianSet",
                        name: "newGuardianSet",
                        type: "tuple",
                    },
                    {
                        internalType: "uint32",
                        name: "newGuardianSetIndex",
                        type: "uint32",
                    },
                ],
                internalType: "struct GovernanceStructs.GuardianSetUpgrade",
                name: "gsu",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedRecoverChainId",
                type: "bytes",
            },
        ],
        name: "parseRecoverChainId",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "evmChainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint16",
                        name: "newChainId",
                        type: "uint16",
                    },
                ],
                internalType: "struct GovernanceStructs.RecoverChainId",
                name: "rci",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedSetMessageFee",
                type: "bytes",
            },
        ],
        name: "parseSetMessageFee",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint256",
                        name: "messageFee",
                        type: "uint256",
                    },
                ],
                internalType: "struct GovernanceStructs.SetMessageFee",
                name: "smf",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedTransferFees",
                type: "bytes",
            },
        ],
        name: "parseTransferFees",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "module",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "chain",
                        type: "uint16",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "recipient",
                        type: "bytes32",
                    },
                ],
                internalType: "struct GovernanceStructs.TransferFees",
                name: "tf",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "encodedVM",
                type: "bytes",
            },
        ],
        name: "parseVM",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "version",
                        type: "uint8",
                    },
                    {
                        internalType: "uint32",
                        name: "timestamp",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "nonce",
                        type: "uint32",
                    },
                    {
                        internalType: "uint16",
                        name: "emitterChainId",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "emitterAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint64",
                        name: "sequence",
                        type: "uint64",
                    },
                    {
                        internalType: "uint8",
                        name: "consistencyLevel",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                    },
                    {
                        internalType: "uint32",
                        name: "guardianSetIndex",
                        type: "uint32",
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "r",
                                type: "bytes32",
                            },
                            {
                                internalType: "bytes32",
                                name: "s",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint8",
                                name: "v",
                                type: "uint8",
                            },
                            {
                                internalType: "uint8",
                                name: "guardianIndex",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct Structs.Signature[]",
                        name: "signatures",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes32",
                        name: "hash",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Structs.VM",
                name: "vm",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "nonce",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "payload",
                type: "bytes",
            },
            {
                internalType: "uint8",
                name: "consistencyLevel",
                type: "uint8",
            },
        ],
        name: "publishMessage",
        outputs: [
            {
                internalType: "uint64",
                name: "sequence",
                type: "uint64",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "numGuardians",
                type: "uint256",
            },
        ],
        name: "quorum",
        outputs: [
            {
                internalType: "uint256",
                name: "numSignaturesRequiredForQuorum",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_vm",
                type: "bytes",
            },
        ],
        name: "submitContractUpgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_vm",
                type: "bytes",
            },
        ],
        name: "submitNewGuardianSet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_vm",
                type: "bytes",
            },
        ],
        name: "submitRecoverChainId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_vm",
                type: "bytes",
            },
        ],
        name: "submitSetMessageFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_vm",
                type: "bytes",
            },
        ],
        name: "submitTransferFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "guardianIndex",
                        type: "uint8",
                    },
                ],
                internalType: "struct Structs.Signature[]",
                name: "signatures",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "address[]",
                        name: "keys",
                        type: "address[]",
                    },
                    {
                        internalType: "uint32",
                        name: "expirationTime",
                        type: "uint32",
                    },
                ],
                internalType: "struct Structs.GuardianSet",
                name: "guardianSet",
                type: "tuple",
            },
        ],
        name: "verifySignatures",
        outputs: [
            {
                internalType: "bool",
                name: "valid",
                type: "bool",
            },
            {
                internalType: "string",
                name: "reason",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "version",
                        type: "uint8",
                    },
                    {
                        internalType: "uint32",
                        name: "timestamp",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "nonce",
                        type: "uint32",
                    },
                    {
                        internalType: "uint16",
                        name: "emitterChainId",
                        type: "uint16",
                    },
                    {
                        internalType: "bytes32",
                        name: "emitterAddress",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint64",
                        name: "sequence",
                        type: "uint64",
                    },
                    {
                        internalType: "uint8",
                        name: "consistencyLevel",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                    },
                    {
                        internalType: "uint32",
                        name: "guardianSetIndex",
                        type: "uint32",
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "r",
                                type: "bytes32",
                            },
                            {
                                internalType: "bytes32",
                                name: "s",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint8",
                                name: "v",
                                type: "uint8",
                            },
                            {
                                internalType: "uint8",
                                name: "guardianIndex",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct Structs.Signature[]",
                        name: "signatures",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes32",
                        name: "hash",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Structs.VM",
                name: "vm",
                type: "tuple",
            },
        ],
        name: "verifyVM",
        outputs: [
            {
                internalType: "bool",
                name: "valid",
                type: "bool",
            },
            {
                internalType: "string",
                name: "reason",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];