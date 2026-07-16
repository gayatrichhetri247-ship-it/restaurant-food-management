import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        paymentStatus: {
          type: String,
          enum: [
            "PENDING",
            "COMPLETE",
            "FULL_REFUND",
            "PARTIAL_REFUND",
            "AMBIGUOUS",
            "NOT_FOUND",
            "CANCELED",
            "Service is currently unavailable",
          ],
          default: "PENDING",
        },

        orderStatus: {
          type: String,
          enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
          default: "PLACED",
        },
      },
    ],
  },

  { timestamps: true },
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
