import express from "express";
import { createOrder, getMyOrders, getOrdersById, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router();

router.route("/")
.post(protect,admin,createOrder)
.get(protect,admin,getAllOrders)

router.get("/myorders", protect, getMyOrders)
router.get("/:id", protect, getOrdersById)

router.put("/:id/status", protect, admin, updateOrderStatus)



export default router;