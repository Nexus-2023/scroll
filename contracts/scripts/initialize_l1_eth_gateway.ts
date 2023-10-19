/* eslint-disable node/no-missing-import */
import * as dotenv from "dotenv";

import { constants } from "ethers";
import * as hre from "hardhat";
import { ethers } from "hardhat";
import { selectAddressFile } from "./utils";

dotenv.config();

async function main() {
  const addressFile = selectAddressFile(hre.network.name);

  const [deployer] = await ethers.getSigners();

  const L1ETHGateway = await ethers.getContractAt("L1ETHGateway", addressFile.get("L1ETHGateway.proxy"), deployer);
  await L1ETHGateway.initialize(
    "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "0x2De6a791391A867e36f7433De3A3e0d8a61009C5",
    "0xBFF9eA431740C35565201498e47534451B55cbAc"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
