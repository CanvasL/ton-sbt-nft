import pinataSDK from "@pinata/sdk";

export const uploadToIPFS = async (path: string) => {
  const pinata = new pinataSDK({
    pinataApiKey: "dbb6d532725fb4a2d8a0",
    pinataSecretApiKey:
      "02b8a20f750bded82a2850d365dd1ac1d760ca988f26f38a4d32765bf3bfd9a1",
  });

  const response = await pinata.pinFromFS(path);

  return `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
};
