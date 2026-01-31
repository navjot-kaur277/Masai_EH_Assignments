import express from "express";
import {
  addOrder,
  getMyOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/add-order", addOrder);
router.get("/get-my-orders/:customerId", getMyOrders);
router.put("/update-order/:orderId", updateOrder);
router.delete("/delete-order/:orderId", deleteOrder);

export default router;
