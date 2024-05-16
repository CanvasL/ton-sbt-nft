import { uploadToIPFS } from "./upload";
import * as fs from "fs";

const METADATA_PATH = "./ipfs/assets/metadata"
const ITEM_JSON_TEMPLATE_PATH = "./ipfs/assets/template/item.json";
const ITEM_SVG_TEMPLATE_PATH = "./ipfs/assets/template/item.svg";

export const generateAndUploadMetadata = async (
  itemIndexs: number[],
  itemImages: string[]
): Promise<string> => {
  for (let i = 0; i < itemIndexs.length; i++) {
      const filePath = `${METADATA_PATH}/${itemIndexs[i]}.json`;
      const originalJsonContent = fs.readFileSync(ITEM_JSON_TEMPLATE_PATH, "utf8");
      const updatedJsonContent = originalJsonContent
        .replace("item_index", itemIndexs[i].toString())
        .replace("item_image", itemImages[i]);

      fs.writeFileSync(filePath, updatedJsonContent);
  }
  const url = await uploadToIPFS(METADATA_PATH);
  return url;
};

export const generateAndUploadSvg = async (
  itemIndex: number,
  ownerAddress: string
): Promise<string> => {
  const filePath = `./ipfs/${itemIndex}.svg`;
  const originalSVGContent = fs.readFileSync(ITEM_SVG_TEMPLATE_PATH, "utf8");
  const updatedSVGContent = originalSVGContent.replace(
    "item_owner",
    ownerAddress
  );
  fs.writeFileSync(filePath, updatedSVGContent);
  const url = await uploadToIPFS(filePath);
  await fs.promises.unlink(filePath);
  return url;
};
