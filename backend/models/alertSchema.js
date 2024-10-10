import mongoose  from "mongoose";

const alertSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  coinId: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  email: { type: String, required: true },
  thresholdHit: { type: Boolean, default: false },
  alertSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;