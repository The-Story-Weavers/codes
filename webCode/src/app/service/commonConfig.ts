export class Page {
  page = 1; // 当前页码
  total = 0; // 总共几条
  size = 24; // 一页显示几条
}

export const tipConfig = {
  nzDuration: 2000,
  nzPauseOnHover: true,
};
// 接口过滤白名单 不弹窗，不做任何处理
export const whiteList = [];

export const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "bytes32", name: "textHex", type: "bytes32" },
    ],
    name: "ArticleAlreadyThumbup",
    type: "error",
  },
  { inputs: [], name: "CanNotThumbupSelf", type: "error" },
  { inputs: [], name: "NoArticleInfo", type: "error" },
  { inputs: [], name: "NoEnoughFrog", type: "error" },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "RepeatRegisted",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "textHex", type: "bytes32" }],
    name: "RepeatUpload",
    type: "error",
  },
  { inputs: [], name: "RewardFailed", type: "error" },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "UsrNotRegisted",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "bytes32",
        name: "textHex",
        type: "bytes32",
      },
    ],
    name: "AddArticle_",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint8", name: "num", type: "uint8" },
    ],
    name: "DistributeFrag",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
    ],
    name: "RechargeMember",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "bytes32",
        name: "writer",
        type: "bytes32",
      },
    ],
    name: "ThumbUp_",
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
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transform",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
    ],
    name: "UserLoggedIn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Value",
        type: "uint256",
      },
      { indexed: false, internalType: "bytes", name: "Data", type: "bytes" },
    ],
    name: "fallbackCalled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "num", type: "uint8" },
    ],
    name: "setUpDistributeNum",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "DistributeFragNum",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "textHex", type: "bytes32" }],
    name: "RewardArticle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "textId", type: "int256" },
      { internalType: "bytes32", name: "textHex", type: "bytes32" },
    ],
    name: "addArticle",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "input", type: "string" }],
    name: "generateHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isUserRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "loginUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "registeredUsers",
    outputs: [
      { internalType: "uint256", name: "lastLoginTime", type: "uint256" },
      { internalType: "uint256", name: "frog", type: "uint256" },
      { internalType: "bool", name: "isRegistered", type: "bool" },
      { internalType: "bool", name: "isMember", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "num", type: "uint8" }],
    name: "setupDistrubuteNum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "nextOwner", type: "address" }],
    name: "setupOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "textData",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "int256", name: "id", type: "int256" },
      { internalType: "uint256", name: "uploadTime", type: "uint256" },
      { internalType: "uint256", name: "frogNum", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "int256", name: "", type: "int256" }],
    name: "textDataById",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "int256", name: "id", type: "int256" }],
    name: "thumbsUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
