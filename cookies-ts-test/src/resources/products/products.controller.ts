import { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  productAlreadyExists,
} from "./products.service.js";
import { CreateProductDTO } from "./products.types.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const create = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Adiciona um novo produto na base.'
  #swagger.parameter['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateProductDTO' }
  }
  #swagger.responses[201] = { 
    schema: { $ref: '#/definitions/Product' },
  }
  */
  try {
    const product = req.body as CreateProductDTO;

    if (await productAlreadyExists(product.name)) {
      return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    } else {
      const newProduct = await createProduct(product);
      res.status(StatusCodes.CREATED).json(newProduct);
    }
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await getProductById(id);

    if (product) {
      res.status(StatusCodes.OK).json(product);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const update = (req: Request, res: Response) => {};
const remove = (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
