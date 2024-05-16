import { beginCell, toNano } from "@ton/ton";
import { NetworkProvider } from "@ton/blueprint";
import { SbtCollection } from "../wrappers/SbtCollection";

export async function run(provider: NetworkProvider) {
  const OFFCHAIN_CONTENT_PREFIX = 0x01;
  const string_first =
    "https://gateway.pinata.cloud/ipfs/QmSdru81z4utZkFQJn6DWjhvCe9THHxqF47pRFa8iicGhL/"; // Change to the content URL you prepared
  let newContent = beginCell()
    .storeInt(OFFCHAIN_CONTENT_PREFIX, 8)
    .storeStringRefTail(string_first)
    .endCell();

  // ===== Parameters =====
  // Replace owner with your address (if you use deeplink)
  let owner = provider.sender().address!;

  let collection = provider.open(
    await SbtCollection.fromInit(owner, newContent, {
      $$type: "RoyaltyParams",
      numerator: 350n, // 350n = 35%
      denominator: 1000n,
      destination: owner,
    })
  );

  // Do deploy
  await collection.send(
    provider.sender(),
    { value: toNano("0.1") },
    {
      $$type: "RequestMint",
      index: 2n,
      owner_address: provider.sender().address!,
      authority_address: provider.sender().address!,
      content: beginCell().endCell(),
    }
  );

  console.log(collection.address);

  await provider.waitForDeploy(collection.address);
}