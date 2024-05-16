import axios from "axios";
import express, { NextFunction, Request, Response } from "express";

const port = 8932;
const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "An internal server error occurred",
  });
});

app.get(
  "/api/v1/owner/:collection/:index",
  async (req: Request, res: Response) => {
    const collection_address = req.params.collection;
    const index = req.params.index;

    const result = await axios.get(
      "https://testnet.toncenter.com/api/v3/nft/items",
      {
        params: {
          collection_address,
          index,
          limit: 128,
          offset: 0,
        },
      }
    );

    if (result.data && result.data["nft_items"].length > 0) {
      const owner = result.data["nft_items"][0].owner_address;
      res.json({
        status: "success",
        data: {
          owner,
        },
      });
    } else {
      res.json({
        status: "not found",
        message: "No owner found for the given collection and index",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
