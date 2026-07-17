import orderModel from "../src/models/order.model.js";

export const createOrder = async (req, res) => {
  const userId = req.user._id;
  const foods = req.body;

  const order = await orderModel.create({
    userId,
    foods,
  });

  res.status(201).json({
    message: "order created",
    order,
  });
};

export const success = async (req, res) => {
  try {
    const encoded = req.query.data;

    if (!encoded) {
      return res.status(400).json({
        message: "Payment data not received",
      });
    }

    const decoded = JSON.parse(atob(encoded));
    const { transaction_uuid, status } = decoded;

    console.log("Decoded:", decoded);

    const updatedOrder = await orderModel.findByIdAndUpdate(
      transaction_uuid, // ✅ Use the ID only
      {
        $set: {
          "foods.$[].paymentStatus": status,
        },
      },
      {
        returnDocument: "after",
      },
    );

    console.log("Updated Order:", updatedOrder);

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

   return res.redirect(
  `${process.env.CORS_ORIGIN}/success?id=${transaction_uuid}`
);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await orderModel
    .findById(id)
    .populate("userId", "email fullname")
    .populate("foods.foodId");
  res.status(200).json({
    message: "Order fetched",
    success: true,
    order,
  });
};
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "fullname email")
      .populate("foods.foodId");

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
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

    // Update every food in the order
    order.foods = order.foods.map((food) => ({
      ...food.toObject(),
      paymentMethod,
      paymentStatus,
      orderStatus,
    }));

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