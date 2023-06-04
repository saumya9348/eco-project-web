import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/payment.js"
import cors from "cors";
import path from "path"
import {fileURLToPath} from "url"
import { requireSignIn } from "./middlewares/authMiddleware.js";
import {
  verifyPayment
} from "./controllers/payment.js";
import { otpRequest } from "./controllers/authController.js";
//configure env
dotenv.config();

//databse config
connectDB();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment",requireSignIn,paymentRoutes)
app.post("/razorpay/webhook/payment",verifyPayment)
app.post("/mail",otpRequest)

//rest api

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

//PORT
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
