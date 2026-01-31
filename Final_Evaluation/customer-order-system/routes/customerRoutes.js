import express from "express";
import {
  registerCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", registerCustomer);
router.delete("/:id", deleteCustomer);

export default router;
