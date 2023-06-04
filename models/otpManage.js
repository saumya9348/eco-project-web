import mongoose from "mongoose";

const otpManage = new mongoose.Schema(
    {
        otp: {
            type: Number,
        },
        userID: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        phone:{
            type: Number,
        },
        emailID:{
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("otps", otpManage);
