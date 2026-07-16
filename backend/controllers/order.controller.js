import orderModel from "../src/models/order.model.js";

// 1. Create Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const foods = req.body;

    const order = await orderModel.create({
      userId,
      foods,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. Payment Success Webhook/Redirect
export const success = async (req, res) => {
  try {
    const encoded = req.query.data;

    if (!encoded) {
      return res.status(400).json({
        success: false,
        message: "Payment data not received",
      });
    }

    // Decode the base64 data safely
    const decodedString = Buffer.from(encoded, "base64").toString("utf-8");
    const decoded = JSON.parse(decodedString);
    const { transaction_uuid, status } = decoded;

    console.log("Decoded Payment Data:", decoded);

    const updatedOrder = await orderModel.findByIdAndUpdate(
      transaction_uuid,
      {
        $set: {
          "foods.$[].paymentStatus": status,
          // If paymentStatus is at the root level, uncomment below instead:
          // paymentStatus: status 
        },
      },
      { returnDocument: "after" }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Redirect user back to the frontend success page
    return res.redirect(`${process.env.CORS_ORIGIN}/success?id=${transaction_uuid}`);
  } catch (error) {
    console.error("Payment Success Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. Get Single Order By ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel
      .findById(id)
      .populate("userId", "email fullname")
      .populate("foods.foodId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "fullname email")
      .populate("foods.foodId");

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. Update Order Fields manually
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, paymentStatus, orderStatus } = req.body;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update every food object inside the array safely
    order.foods = order.foods.map((food) => {
      const foodObj = food.toObject ? food.toObject() : food;
      return {
        ...foodObj,
        ...(paymentMethod && { paymentMethod }),
        ...(paymentStatus && { paymentStatus }),
        ...(orderStatus && { orderStatus }),
      };
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};