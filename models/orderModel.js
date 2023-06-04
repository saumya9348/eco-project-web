import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {
      type: Boolean,
      default: false,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    cartValue: [],
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel", "failed"],
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
