// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserLogin {
    error UsrNotRegisted(address user);
    error UsrAlreadyRegisted(address user);
    event UserRegistered(address indexed user); // 用户注册
    event UserLoggedIn(address indexed user); // 用户登录
    event RechargeMember(address indexed user); // 充值会员
    event AddArticle_(address indexed user, bytes32 textHex); // 上传文字
    event DistributeFrag(address indexed user, uint8 num); // 发代币

    uint8 constant distributeNum = 2; // Number of frogs distributed each time

    //define user data
    struct User {
        uint256 lastLoginTime;
        uint256 frog;
        bool isRegisted;
        bool isMember;
        bytes32[] textHex;
    }
    //define text data
    struct Text {
        address owner;
        uint256 uploadTime;
    }

    mapping(address => User) private registeredUsers; // save user data
    mapping(bytes32 => Text) private textData; // save text data

    // 注册新用户
    function registerUser() external {
        if (registeredUsers[msg.sender].isRegisted) {
            revert UsrAlreadyRegisted(msg.sender);
        }
        registeredUsers[msg.sender].isRegisted = true;
        registeredUsers[msg.sender].frog = distributeNum; // distribute frag
        emit UserRegistered(msg.sender);
        emit DistributeFrag(msg.sender, distributeNum);
    }

    // 登录
    function loginUser() external {
        if (!registeredUsers[msg.sender].isRegisted) {
            revert UsrNotRegisted(msg.sender);
        }
        emit UserLoggedIn(msg.sender);
        // 每日首次登录发放青蛙
        if (isAfterMidnight(registeredUsers[msg.sender].lastLoginTime)) {
            registeredUsers[msg.sender].frog += distributeNum;
            emit DistributeFrag(msg.sender, distributeNum);
        }
    }

    // 检查用户是否已注册
    function isUserRegistered(address user) external view returns (bool) {
        return registeredUsers[user].isRegisted;
    }

    function addArticle(bytes32 textHex) external returns (bool) {
        User memory user = registeredUsers[msg.sender];
        if (!user.isRegisted) {
            revert UsrNotRegisted(msg.sender);
        }
        textData[textHex].owner = msg.sender;
        textData[textHex].uploadTime = block.timestamp;
        registeredUsers[msg.sender].textHex.push(textHex);
        emit AddArticle_(msg.sender, textHex);
        return true;
    }

    function getArticle(bytes32 textHex) external view returns (bool) {
        if (textData[textHex].uploadTime != 0) {
            return true;
        }
        return false;
    }

    // 判断时间戳是否在今天的 00:00 点之后
    function isAfterMidnight(uint256 timestamp) public view returns (bool) {
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
