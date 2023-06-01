import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema(
  {
    systemOrderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required:true,
    },
    razorPayOrderID:{
      type:String,
      required:true,
    },
    userID:{
      type:String,
      required:true,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "captured", "failed"],
    },
    razPaymentID:{
      type:String,
    },
    amount:{
      type:Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("payments", paymentsSchema);
