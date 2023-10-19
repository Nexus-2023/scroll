import { run } from "hardhat";

export async function verifyContract(contractAddress: string, constructorArguments: any) {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}

async function main() {
  contracts = 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
