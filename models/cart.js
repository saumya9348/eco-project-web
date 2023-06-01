import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.ObjectId,
            ref: "users",
            required: true,
        },
        productID: {
            type: mongoose.ObjectId,
            ref: "Products",
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("carts", userSchema);
