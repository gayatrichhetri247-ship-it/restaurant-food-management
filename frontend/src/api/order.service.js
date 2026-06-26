import api from "./apiInstance";

export const createOrder = async (data) => {
  try {
    const res = await api.post("/orders/create", data);
    console.log("Create Order Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to create order:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrder = async (id) => {
  try {
    const res = await api.get(`/orders/${id}`);
    console.log("Get Order Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Get Order Error:", error.response?.data || error.message);
    throw error;
  }
};
export const getOrders = async () => {
  const response = await api.get("http://localhost:9000/api/orders");
  return response.data;
};