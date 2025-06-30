import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/product";
import { validateRequest } from "../middlewares/validateRequest";
import { productSchema } from "../schema/productSchema";

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getSingleProduct);
productRouter.post('/', validateRequest(productSchema), createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
export default productRouter;