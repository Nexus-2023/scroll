/* eslint-disable node/no-missing-import */
import * as dotenv from "dotenv";
import { constants } from "ethers";

import * as hre from "hardhat";
import { ethers } from "hardhat";
import { selectAddressFile } from "./utils";

dotenv.config();

const L1_MESSAGE_QUEUE = process.env.L1_MESSAGE_QUEUE || "none";

async function main() {
  const addressFile = selectAddressFile(hre.network.name);

  const [deployer] = await ethers.getSigners();

  const ScrollChain = await ethers.getContractAt("ScrollChain", addressFile.get("ScrollChain.proxy"), deployer);

  if ((await ScrollChain.owner()) === constants.AddressZero) {
    const tx = await ScrollChain.initialize(
      L1_MESSAGE_QUEUE,
      ethers.utils.getAddress("0xA10Bd70F8479Edb0b067EA4A076290f7243afE08"),
      25
    );
    console.log("initialize ScrollChain, hash:", tx.hash);
    const receipt = await tx.wait();
    console.log(`✅ Done, gas used: ${receipt.gasUsed}`);
  }

  const L1RollupOperatorAddress = process.env.L1_ROLLUP_OPERATOR_ADDR!;
  if ((await ScrollChain.isBatchFinalized(L1RollupOperatorAddress)) === false) {
    console.log("L1_ROLLUP_OPERATOR_ADDR", L1RollupOperatorAddress);
    const tx = await ScrollChain.addSequencer(L1RollupOperatorAddress);
    console.log("updateOperator ScrollChain, hash:", tx.hash);
    const receipt = await tx.wait();
    console.log(`✅ Done, gas used: ${receipt.gasUsed}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
