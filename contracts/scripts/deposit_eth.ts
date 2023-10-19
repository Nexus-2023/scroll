import { ethers } from "hardhat";
import * as hre from "hardhat";
/* eslint-disable node/no-missing-import */
/* eslint-disable no-console, no-inner-declarations, no-undef, import/no-unresolved */
import { selectAddressFile } from "./utils";

async function main() {
  const addressFile = selectAddressFile(hre.network.name);
  console.log("test");
  console.log(addressFile.get("L1ETHGateway.proxy"));
  const [deployer] = await ethers.getSigners();
  const L1ETHGateway = await ethers.getContractAt("L1ETHGateway", addressFile.get("L1ETHGateway.proxy"), deployer);
  await L1ETHGateway.connect(deployer).depositETHAndCall(
    deployer.address,
    hre.ethers.utils.parseEther("200"),
    "0x",
    500000,
    { value: hre.ethers.utils.parseEther("200") }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
