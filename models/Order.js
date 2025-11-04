import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);