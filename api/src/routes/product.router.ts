import { Router } from "express";
import { getProducts, getProductById } from "../controller/productController";


const router: Router = Router();

router.get("/", getProducts);
router.get("/:idProduct", getProductById);

export default router