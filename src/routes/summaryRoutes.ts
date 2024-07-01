import { Router } from "express";
import { getNumberOfOrders, bestSellingProduct, citywithMostOrders, getNumberOfCustomers, revenueFromTheLastMonth, revenueDateAndCountOrders } from "../controllers/summaryController";

const router = Router();

router.get('/summary/orders', getNumberOfOrders);
router.get('/summary/best-selling-product', bestSellingProduct);
router.get('/summary/city-with-most-orders', citywithMostOrders);
router.get('/summary/customers', getNumberOfCustomers);
router.get('/summary/revenue', revenueFromTheLastMonth);
router.get('/summary/revenue-date-orders', revenueDateAndCountOrders);
export default router;