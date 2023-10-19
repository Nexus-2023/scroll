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

  const L1GatewayRouter = await ethers.getContractAt(
    "L1GatewayRouter",
    addressFile.get("L1GatewayRouter.proxy"),
    deployer
  );

  const L1StandardERC20GatewayAddress = addressFile.get("L1StandardERC20Gateway.proxy");
  const L1ScrollMessengerAddress = addressFile.get("L1ScrollMessenger.proxy");
  const L2GatewayRouterAddress = process.env.L2_GATEWAY_ROUTER_PROXY_ADDR!;

  // if ((await L1GatewayRouter.counterpart()) === constants.AddressZero) {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    const tx = await L1GatewayRouter.initialize(
      "0xA74Feb3d2Afa0CF3927f4D3F42e37a66AB494DE0",
      "0xBC46fb139e83967b850a38CDe4C6025a91F58527"
    );
    console.log("initialize L1StandardERC20Gateway, hash:", tx.hash);
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
