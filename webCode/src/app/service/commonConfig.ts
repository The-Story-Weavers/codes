export class Page {
  page = 1; // 当前页码
  total = 0; // 总共几条
  size = 24; // 一页显示几条
}

export const tipConfig = {
  nzDuration: 2000,
  nzPauseOnHover: true
};
// 接口过滤白名单 不弹窗，不做任何处理
export const whiteList = [];

export const ABI = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  { type: 'function', name: 'DistributeFragNum', inputs: [], outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }], stateMutability: 'view' },
  {
    type: 'function',
    name: 'RewardArticle',
    inputs: [{ name: 'textHex', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'addArticle',
    inputs: [
      { name: 'textId', type: 'int256', internalType: 'int256' },
      { name: 'textHex', type: 'bytes32', internalType: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'generateHash',
    inputs: [{ name: 'input', type: 'string', internalType: 'string' }],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'isUserRegistered',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  { type: 'function', name: 'loginUser', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', name: 'owner', inputs: [], outputs: [{ name: '', type: 'address', internalType: 'address' }], stateMutability: 'view' },
  { type: 'function', name: 'registerUser', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'registeredUsers',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      { name: 'lastLoginTime', type: 'uint256', internalType: 'uint256' },
      { name: 'frog', type: 'uint256', internalType: 'uint256' },
      { name: 'isRegistered', type: 'bool', internalType: 'bool' },
      { name: 'isMember', type: 'bool', internalType: 'bool' }
    ],
    stateMutability: 'view'
  },
  { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'view' },
  {
    type: 'function',
    name: 'setupDistrubuteNum',
    inputs: [{ name: 'num', type: 'uint8', internalType: 'uint8' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'textData',
    inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'id', type: 'int256', internalType: 'int256' },
      { name: 'uploadTime', type: 'uint256', internalType: 'uint256' },
      { name: 'frogNum', type: 'uint256', internalType: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'textDataById',
    inputs: [{ name: '', type: 'int256', internalType: 'int256' }],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'thumbsUp',
    inputs: [{ name: 'id', type: 'int256', internalType: 'int256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'AddArticle_',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'textHex', type: 'bytes32', indexed: false, internalType: 'bytes32' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'DistributeFrag',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'num', type: 'uint8', indexed: false, internalType: 'uint8' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' }
    ],
    anonymous: false
  },
  { type: 'event', name: 'RechargeMember', inputs: [{ name: 'user', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  {
    type: 'event',
    name: 'ThumbUp_',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'writer', type: 'bytes32', indexed: false, internalType: 'bytes32' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transform',
    inputs: [
      { name: 'sender', type: 'address', indexed: true, internalType: 'address' },
      { name: 'receiver', type: 'address', indexed: true, internalType: 'address' },
      { name: 'value', type: 'uint256', indexed: false, internalType: 'uint256' }
    ],
    anonymous: false
  },
  { type: 'event', name: 'UserLoggedIn', inputs: [{ name: 'user', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  { type: 'event', name: 'UserRegistered', inputs: [{ name: 'user', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  {
    type: 'event',
    name: 'fallbackCalled',
    inputs: [
      { name: 'Sender', type: 'address', indexed: false, internalType: 'address' },
      { name: 'Value', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'Data', type: 'bytes', indexed: false, internalType: 'bytes' }
    ],
    anonymous: false
  },
  { type: 'event', name: 'setUpDistributeNum', inputs: [{ name: 'num', type: 'uint8', indexed: false, internalType: 'uint8' }], anonymous: false },
  {
    type: 'error',
    name: 'ArticleAlreadyThumbup',
    inputs: [
      { name: 'user', type: 'address', internalType: 'address' },
      { name: 'textHex', type: 'bytes32', internalType: 'bytes32' }
    ]
  },
  { type: 'error', name: 'CanNotThumbupSelf', inputs: [] },
  { type: 'error', name: 'NoArticleInfo', inputs: [] },
  { type: 'error', name: 'NoEnoughFrog', inputs: [] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address', internalType: 'address' }] },
  { type: 'error', name: 'OwnableUnauthorizedAccount', inputs: [{ name: 'account', type: 'address', internalType: 'address' }] },
  { type: 'error', name: 'RepeatRegisted', inputs: [{ name: 'user', type: 'address', internalType: 'address' }] },
  { type: 'error', name: 'RepeatUpload', inputs: [{ name: 'textHex', type: 'bytes32', internalType: 'bytes32' }] },
  { type: 'error', name: 'RewardFailed', inputs: [] },
  { type: 'error', name: 'UsrNotRegisted', inputs: [{ name: 'user', type: 'address', internalType: 'address' }] }
];
