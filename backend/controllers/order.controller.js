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
      }
    );

    console.log("Updated Order:", updatedOrder);

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.redirect(
      `http://localhost:5173/success?id=${transaction_uuid}`
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOrderById = async(req,res) =>{
  const id = req.params.id;
  const order = await orderModel.findById(id).populate("userId", "email fullname").populate("foods.foodId")
  res.status(200).json({
    message:"Order fetched",
    success:true,
    order

  })
}
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