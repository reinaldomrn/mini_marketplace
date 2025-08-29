import { Request, Response } from "express";
import QueryParams from "../interface/QueryParams.interface";
import productRepository from "../repository/product.repository";


const getProducts = async (req:Request, res:Response) => {
  const params: QueryParams = req.query;
  try {
    const result = await productRepository.search(params);
    res.status(200).json({data: result})
  } catch (error) {
    res.status(500).json({message: 'Error al consultar', error})
  }
}

const getProductById = async (req: Request, res: Response) => {
  const {idProduct} = req.params
  try {
    const product = await productRepository.getById(idProduct)
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: `Error al optener el producto con id ${idProduct}`, error });
  }
};


export { getProducts, getProductById };