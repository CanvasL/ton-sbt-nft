import { Address, beginCell, toNano } from "@ton/core";
import { NetworkProvider } from "@ton/blueprint";
import { SbtCollection } from "../wrappers/SbtCollection";
import addresses from "../deployment/mainnet.json";

export async function run(provider: NetworkProvider) {
  const collectionAddr = Address.parse(
    addresses.collection
  );

  const collection = provider.open(SbtCollection.fromAddress(collectionAddr));

  await collection.send(
    provider.sender(),
    { value: toNano("0.1") },
    {
      $$type: "RequestMint",
      index: 1n,
      owner_address: provider.sender().address!,
      authority_address: provider.sender().address!,
      content: beginCell().endCell(),
    }
  );
}
