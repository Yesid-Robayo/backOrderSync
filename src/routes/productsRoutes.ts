import { Router } from "express";
import { addProducts, deleteProduct, getProductById, getProducts, getProductsByOffSet, updateProduct } from "../controllers/productsController";
const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/products/offset', getProductsByOffSet);
router.post('/products', addProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;