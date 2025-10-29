import { Request, Response } from "express";
import { AddPurchaseItemDTO } from "./purchaseItems.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const add = async (req: Request, res: Response) => {
  const purchaseItem = req.body as AddPurchaseItemDTO;

  req.session.cart?.push(purchaseItem);
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export default { add };
