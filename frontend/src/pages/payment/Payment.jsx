import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation, Navigate, useNavigate } from "react-router";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const total_amount = state?.total_amount;
  const transaction_uuid = state?.orderId;

  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [loading, setLoading] = useState(false);

  if (!total_amount || !transaction_uuid) {
    return <Navigate to="/" replace />;
  }

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},food_code=EPAYTEST`;

  const signature = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
      message,
      import.meta.env.VITE_ESEWA_SECRET_KEY
    )
  );

  const handleCashOnDelivery = async () => {
    try {
      setLoading(true);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${transaction_uuid}`,
        {
          paymentMethod: "Cash On Delivery",
          paymentStatus: "PENDING",
          orderStatus: "PLACED",
        },
        {
          withCredentials: true,
        }
      );

      alert("Order placed successfully.");

      // CORRECTED: Passing data via URL parameters so Success component reads it correctly
      navigate(`/success?id=${transaction_uuid}`);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-600">
          Payment
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Choose your preferred payment method
        </p>

        {/* Order Summary */}
        <div className="mt-8 border rounded-lg p-5 bg-green-50">

          <div className="flex justify-between mb-3">
            <span className="font-semibold">
              Order ID
            </span>

            <span className="text-sm">
              {transaction_uuid}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Total Amount
            </span>

            <span className="font-bold text-green-600">
              Rs. {total_amount}
            </span>
          </div>

        </div>

        {/* Payment Methods */}

        <div className="mt-8">

          <h2 className="font-semibold text-lg mb-4">
            Select Payment Method
          </h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-green-500 transition">

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  value="esewa"
                  checked={paymentMethod === "esewa"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>

                  <p className="font-semibold">
                    eSewa
                  </p>

                  <p className="text-sm text-gray-500">
                    Secure online payment
                  </p>

                </div>

              </div>

            </label>

            <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-green-500 transition">

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>

                  <p className="font-semibold">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>

                </div>

              </div>

            </label>

          </div>

        </div>

        {/* eSewa Payment */}

        {paymentMethod === "esewa" && (

          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            className="mt-8"
          >

            <input
              type="hidden"
              name="amount"
              value={total_amount}
            />

            <input
              type="hidden"
              name="tax_amount"
              value="0"
            />

            <input
              type="hidden"
              name="total_amount"
              value={total_amount}
            />

            <input
              type="hidden"
              name="transaction_uuid"
              value={transaction_uuid}
            />

            <input
              type="hidden"
              name="food_code"
              value="EPAYTEST"
            />

            <input
              type="hidden"
              name="food_service_charge"
              value="0"
            />

            <input
              type="hidden"
              name="food_delivery_charge"
              value="0"
            />

            <input
              type="hidden"
              name="success_url"
              value="https://fashion-ecommerce-react.onrender.com/api/orders/success"
            />

            <input
              type="hidden"
              name="failure_url"
              value="https://developer.esewa.com.np/failure"
            />

            <input
              type="hidden"
              name="signed_field_names"
              value="total_amount,transaction_uuid,food_code"
            />

            <input
              type="hidden"
              name="signature"
              value={signature}
            />

            <button
              type="submit"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Pay with eSewa
            </button>

          </form>

        )}

        {/* Cash on Delivery */}

        {paymentMethod === "cod" && (

          <button
            onClick={handleCashOnDelivery}
            disabled={loading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        )}

      </div>
    </div>
  );
};

export default Payment;