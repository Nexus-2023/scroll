/* eslint-disable node/no-missing-import */
import * as hre from "hardhat";
import { run } from "hardhat";
export async function verifyContract(contractAddress: string, constructorArguments: any) {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}

async function main() {
  console.log("making all the contracts objects");
  const GATEWAY_ROUTER = await hre.ethers.getContractFactory("L1GatewayRouter");
  const L2GasPriceOracle = await hre.ethers.getContractFactory("L2GasPriceOracle");
  const ETH_ROUTER = await hre.ethers.getContractFactory("L1ETHGateway");
  const CUSTOM_ERC20 = await hre.ethers.getContractFactory("L1CustomERC20Gateway");
  const SCROLL_MESSENGER = await hre.ethers.getContractFactory("L1ScrollMessenger");
  const SCROLL_ROLLUP = await hre.ethers.getContractFactory("ScrollChain");
  const L1MessageQueue = await hre.ethers.getContractFactory("L1MessageQueue");
  const EnforcedTxGateway = await hre.ethers.getContractFactory("EnforcedTxGateway");
  const VERIFIER = await hre.ethers.getContractFactory("RollupVerifier");
  console.log("deploy all the contracts objects");
  const gatewayRouter = await GATEWAY_ROUTER.attach("0x8e82020c738499C722440f74Ff8EC79FE5b55F45");
  console.log("gateway router deployed to:", gatewayRouter.address);
  const ethRouter = await ETH_ROUTER.attach("0x192BFB9F22c86e9Fd6da506Ac8c7E4CF71d5Da4d");
  console.log("eth router deployed to:", ethRouter.address);
  const erc20Router = await CUSTOM_ERC20.attach("0x6a7CEBbC3625Ce52AE63819F704eBC7E8e65d718");
  console.log("erc 20 router deployed to:", erc20Router.address);
  const scrollMessenger = await SCROLL_MESSENGER.attach("0xcf6937e3d52060382725588f370F37f08FA0D158");
  console.log("scroll messenger deployed to:", scrollMessenger.address);
  const scroll = await SCROLL_ROLLUP.attach("0x0A332fEA974d5C778E980099a6ac0a205Bfb8b59");
  console.log("scroll deployed to:", scroll.address);
  const messageQueue = await L1MessageQueue.attach("0x560539c40FEAcB5745C06d82c47312c1Db426020");
  console.log("message queue deployed to:", messageQueue.address);
  const enforcedTX = await EnforcedTxGateway.attach("0x254ef2EBDA9701B1912AF0eC11124a4eA9249e1E");
  console.log("enforce message queue deployed to:", enforcedTX.address);
  const verifier = await VERIFIER.attach("0x44b26c9f2505F6001fDD57Ff6F135A529a72f0ab");
  console.log("verifier deployed to:", verifier.address);
  const oracle = await L2GasPriceOracle.attach("0x09c02b4Efb0cD1355B66F1B93b19a8f65f3cC3d4");
  console.log("oracle deployed to:", oracle.address);
  console.log("initialise all the contracts objects");
//   await ethRouter.initialize(gatewayRouter.address, gatewayRouter.address, scrollMessenger.address);
//   console.log("eth router initialised");
//   await gatewayRouter.initialize(ethRouter.address, erc20Router.address);
//   console.log("gateway router initialised");
//   await erc20Router.initialize(gatewayRouter.address, gatewayRouter.address, scrollMessenger.address);
//   console.log("erc20 router initialised");
//   await scrollMessenger.initialize(gatewayRouter.address, ethRouter.address, scroll.address, messageQueue.address);
//   console.log("scrollMessenger initialised");
//   await scroll.initialize(messageQueue.address, verifier.address, 25);
//   console.log("scroll initialised");
//   await messageQueue.initialize(scrollMessenger.address, scroll.address, enforcedTX.address, oracle.address, 2000000);
//   console.log("messageQueue initialised");
//   await oracle.initialize(250000, 300000, 10, 10);
//   await enforcedTX.initialize(messageQueue.address, gatewayRouter.address);
//   console.log("enforcedTX initialised");
  console.log(await messageQueue.nextCrossDomainMessageIndex());
  console.log("verifying contracts");
//   await verifyContract(ethRouter.address, []);
//   await verifyContract(gatewayRouter.address, []);
//   await verifyContract(erc20Router.address, []);
  await verifyContract(scrollMessenger.address, []);
  await verifyContract(scroll.address, [5]);
  await verifyContract(oracle.address, []);
  await verifyContract(enforcedTX.address, []);
  await verifyContract(messageQueue.address, []);
  await verifyContract(verifier.address, []);
//   await ethRouter.depositETHAndCall(
//     "0xFe6F3e66144009ed7ab6b9Ee015e923345afFd18",
//     hre.ethers.utils.parseEther("200"),
//     "0x",
//     260000,
//     { value: hre.ethers.utils.parseEther("201") }
//   );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
