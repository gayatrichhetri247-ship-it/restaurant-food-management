import React from "react";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router";

const Payment = () => {
  const location = useLocation();

  const total_amount = location?.state?.total_amount;
  const transaction_uuid = location?.state?.orderId;

  const hash = CryptoJS.HmacSHA256(
    `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`,
    import.meta.env.VITE_ESEWA_SECRET_KEY
  );

  const signature = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600">eSewa Payment</h1>
          <p className="text-gray-500 mt-2">
            Complete your payment securely
          </p>
        </div>

        <div className="my-8 border rounded-lg p-4 bg-green-50">
          <div className="flex justify-between text-lg">
            <span className="font-medium">Total Amount</span>
            <span className="font-bold text-green-700">
              Rs. {total_amount}
            </span>
          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <span>Order ID</span>
            <span>{transaction_uuid}</span>
          </div>
        </div>

        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          {/* Hidden Fields */}
          <input
            type="hidden"
            name="amount"
            defaultValue={total_amount}
          />

          <input
            type="hidden"
            name="tax_amount"
            defaultValue="0"
          />

          <input
            type="hidden"
            name="total_amount"
            defaultValue={total_amount}
          />

          <input
            type="hidden"
            name="transaction_uuid"
            defaultValue={transaction_uuid}
          />

          <input
            type="hidden"
            name="product_code"
            defaultValue="EPAYTEST"
          />

          <input
            type="hidden"
            name="product_service_charge"
            defaultValue="0"
          />

          <input
            type="hidden"
            name="product_delivery_charge"
            defaultValue="0"
          />

          <input
            type="hidden"
            name="success_url"
            defaultValue="http://localhost:9000/api/orders/success"
          />

          <input
            type="hidden"
            name="failure_url"
            defaultValue="https://developer.esewa.com.np/failure"
          />

          <input
            type="hidden"
            name="signed_field_names"
            defaultValue="total_amount,transaction_uuid,product_code"
          />

          <input
            type="hidden"
            name="signature"
            defaultValue={signature}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;