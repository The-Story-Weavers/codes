// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NovelPlatform} from "../src/novels.sol";

contract CounterTest is Test {
    NovelPlatform public novelplatform;

    function setUp() public {
        novelplatform = new NovelPlatform();
    }

    function test_setupDistrubuteNum(uint8 num) public {
        novelplatform.setupDistrubuteNum(num);
        assertEq(novelplatform.DistributeFragNum(), num);
    }
}
