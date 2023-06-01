import express, { Router } from "express";
import {
  createPayment,
  capturePayment,
} from "../controllers/payment.js";

const route = express.Router();
route.post("/create-payment",createPayment)
route.post("/capture-payment/:paymentID",capturePayment)

export default route