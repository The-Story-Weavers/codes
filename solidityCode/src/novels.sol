// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract NovelPlatform is Ownable {
    error UsrNotRegisted(address user); // 用户未注册
    error RepeatRegisted(address user); // 重复注册
    error ArticleAlreadyThumbup(address user, bytes32 textHex); // 重复投币
    error RepeatUpload(bytes32 textHex); // 重复上传
    error NoEnoughFrog(); // 币不足
    error CanNotThumbupSelf(); // 不能投币给自己的文章
    error NoArticleInfo(); // 文章不存在
    error RewardFailed(); // 打赏失败

    event UserRegistered(address indexed user); // 用户注册
    event UserLoggedIn(address indexed user); // 用户登录
    event RechargeMember(address indexed user); // 充值会员
    event AddArticle_(address indexed user, bytes32 textHex); // 上传文字
    event DistributeFrag(address indexed user, uint8 num); // 领币
    event ThumbUp_(address indexed user, bytes32 writer); // 投币
    event setUpDistributeNum(uint8 num); // 修改每日领币数量
    event Transform(
        address indexed sender,
        address indexed receiver,
        uint256 value
    ); // 交易信息
    event fallbackCalled(address Sender, uint256 Value, bytes Data); // fallback信息

    //define user data
    struct User {
        uint256 lastLoginTime;
        uint256 frog;
        bool isRegistered;
        bool isMember;
        bytes32[] textHex;
        mapping(bytes32 => bool) thumbupHistory;
    }
    //define text data
    struct Text {
        address owner;
        int id;
        uint256 uploadTime;
        uint256 frogNum;
    }

    uint8 public DistributeFragNum; // Number of frogs distributed each time
    mapping(address => User) public registeredUsers; // save user data
    mapping(bytes32 => Text) public textData; // save text data
    mapping(int => bytes32) public textDataById; // save text data

    constructor() Ownable(msg.sender) {
        DistributeFragNum = 2;
    }

    receive() external payable {
        emit Transform(msg.sender, address(this), msg.value);
    }

    fallback() external payable {
        emit fallbackCalled(msg.sender, msg.value, msg.data);
    }

    // 禁用renounceOwnership
    function renounceOwnership() public view override onlyOwner {
        revert("renounceOwnership is disabled");
    }

    // 设定每日发放数量
    function setupDistrubuteNum(uint8 num) external onlyOwner {
        DistributeFragNum = num;
        emit setUpDistributeNum(num);
    }

    // 注册新用户
    function registerUser() external {
        if (registeredUsers[msg.sender].isRegistered) {
            revert RepeatRegisted(msg.sender);
        }
        registeredUsers[msg.sender].isRegistered = true;
        registeredUsers[msg.sender].frog = DistributeFragNum; // distribute frag
        emit UserRegistered(msg.sender);
        emit DistributeFrag(msg.sender, DistributeFragNum);
    }

    // 登录
    function loginUser() external {
        if (!registeredUsers[msg.sender].isRegistered) {
            revert UsrNotRegisted(msg.sender);
        }
        emit UserLoggedIn(msg.sender);
        // 每日首次登录发放青蛙
        if (isAfterMidnight(registeredUsers[msg.sender].lastLoginTime)) {
            registeredUsers[msg.sender].frog += DistributeFragNum;
            emit DistributeFrag(msg.sender, DistributeFragNum);
        }
    }

    // 检查用户是否已注册
    function isUserRegistered(address user) external view returns (bool) {
        return registeredUsers[user].isRegistered;
    }

    // 上传文字
    function addArticle(int textId, bytes32 textHex) external returns (bool) {
        if (!registeredUsers[msg.sender].isRegistered) {
            revert UsrNotRegisted(msg.sender);
        }
        if (textData[textHex].owner != address(0)) {
            revert RepeatUpload(textHex);
        }
        textData[textHex].owner = msg.sender;
        textData[textHex].uploadTime = block.timestamp;
        textData[textHex].id = textId;
        textDataById[textId] = textHex;
        registeredUsers[msg.sender].textHex.push(textHex);
        emit AddArticle_(msg.sender, textHex);
        return true;
    }

    // 点赞
    function thumbsUp(int id) external {
        User storage user = registeredUsers[msg.sender];
        bytes32 textHex = textDataById[id];
        if (!user.isRegistered) {
            revert UsrNotRegisted(msg.sender);
        }
        if (user.thumbupHistory[textHex]) {
            revert ArticleAlreadyThumbup(msg.sender, textHex);
        }
        if (user.frog < 1) {
            revert NoEnoughFrog();
        }
        if (textData[textHex].uploadTime == 0) {
            revert NoArticleInfo();
        }

        address writer = textData[textHex].owner;
        if (writer == msg.sender) {
            revert CanNotThumbupSelf();
        }
        user.frog -= 1;
        textData[textHex].frogNum += 1;
        user.thumbupHistory[textHex] = true;
        emit ThumbUp_(msg.sender, textHex);
    }

    // 打赏
    function RewardArticle(bytes32 textHex) external payable {
        User storage user = registeredUsers[msg.sender];
        address payable writer = payable(textData[textHex].owner);
        if (!user.isRegistered) {
            revert UsrNotRegisted(msg.sender);
        }
        if (textData[textHex].uploadTime == 0) {
            revert NoArticleInfo();
        }
        bool success = writer.send(msg.value);
        if (!success) {
            revert RewardFailed();
        }
        emit Transform(msg.sender, writer, msg.value);
    }

    // 生成文章哈希值
    function generateHash(string memory input) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(input));
    }

    // 判断时间戳是否在今天的 00:00 点之后
    function isAfterMidnight(uint256 timestamp) internal view returns (bool) {
        // 获取今天的 00:00 点的时间戳
        uint256 todayMidnight = getTodayMidnightTimestamp();

        // 比较输入的时间戳是否在今天的 00:00 点之后
        return timestamp > todayMidnight;
    }

    function getTodayMidnightTimestamp() internal view returns (uint256) {
        // 获取当前区块时间戳（UTC 时间）
        uint256 currentTimestamp = block.timestamp;

        // 计算今天的 00:00 点的时间戳
        uint256 todayMidnight = currentTimestamp - (currentTimestamp % 86400); // 86400 seconds in a day

        return todayMidnight;
    }
}
