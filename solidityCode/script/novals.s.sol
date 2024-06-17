// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {NovelPlatform} from "../src/novels.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        NovelPlatform novel = new NovelPlatform();
        vm.stopBroadcast();
    }
}
