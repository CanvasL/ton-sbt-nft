import { generateAndUploadMetadata, generateAndUploadSvg } from "./utils/generate";

const airdropList = {
  addresses: [
    "UQC3s8xc9Wa71-fePPKoq2rhfHCO4CtKuSaevO-mT9_ZLt-Q",
    "EQARULUYsmJq1RiZ-YiH-IJLcAZUVkVff-KBPwEmmaQGH6aC",
  ],
  indexes: [1, 2],
};

const main = async () => {
  const images: string[] = [];

  for (let index in airdropList.addresses) {
    const itemImageUrl = await generateAndUploadSvg(
      airdropList.indexes[index],
      airdropList.addresses[index]
    );
    images.push(itemImageUrl);
  }

  const metaFolderUrl = await generateAndUploadMetadata(airdropList.indexes, images);

  console.log("meta folder url:", metaFolderUrl);
};

main();
