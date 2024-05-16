import { Address, beginCell, toNano } from "@ton/core";
import { NetworkProvider } from "@ton/blueprint";
import { SbtCollection } from "../wrappers/SbtCollection";

export async function run(provider: NetworkProvider) {
  const collectionAddr = Address.parse(
    "EQBa9wdY7ykmBXT_stkHBPsv_SP_tgLysJxYoERc_4vpOqbL"
  );

  const collection = provider.open(SbtCollection.fromAddress(collectionAddr));

  const result = await collection.send(
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
