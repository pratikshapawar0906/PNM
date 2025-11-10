import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name :{type:String,  required: true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionStart: { type: Date, required: true },
  subscriptionEnd: { type: Date, required: true },
  duration: { type: String, enum: ["monthly", "yearly"], default: "monthly" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
