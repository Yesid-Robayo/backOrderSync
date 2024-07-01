import { Router } from "express";
import { addOrdersWithProducts, deleteOrdersWithProducts, getOrderProductsByOrderId, getOrdersWhithFilters, updateOrder, updateStatusOrder } from "../controllers/ordersController";
const router = Router();


router.get('/orderswhitFilters', getOrdersWhithFilters);
router.post('/orders', addOrdersWithProducts);
router.delete('/orders/:id', deleteOrdersWithProducts);
router.put('/orders/:id', updateOrder);
router.put('/updateStatusOrder', updateStatusOrder);
router.get('/ordersProductsbyid', getOrderProductsByOrderId)

export default router;
