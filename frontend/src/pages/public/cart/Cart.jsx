import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  remove,
} from "../../../redux/features/cartSlice";
import { useNavigate } from "react-router";
import { createOrder } from "../../../api/order.service";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price dynamically
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total_amount = subtotal + deliveryFee;

  const handlePayment = async () => {
    try {
      const foods = cart.map((item) => ({
        foodId: item._id,
        quantity: item.quantity,
      }));

      const res = await createOrder(foods);
      navigate("/payment", { state: { total_amount, orderId: res.order._id } });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/30 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8 font-serif">
          Your Food Cart
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start lg:gap-8">
            {/* Cart Items List */}
            <div className="space-y-4 md:col-span-7 lg:col-span-8">
              {cart.map((food) => (
                <div
                  key={food._id}
                  className="relative flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-green-300 sm:gap-6 sm:p-4"
                >
                  {/* Food Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 xs:h-24 xs:w-24 sm:h-28 sm:w-28">
                    <img
                      src={food.photo}
                      alt={food.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Food Details Container */}
                  <div className="flex flex-1 flex-col justify-between self-stretch py-0.5 min-w-0">
                    <div>
                      {/* Title & Price Row */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pr-6 sm:pr-0">
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl line-clamp-1 min-w-0">
                          {food.name}
                        </h2>
                        <p className="text-left sm:text-right text-base font-black text-green-700 whitespace-nowrap">
                          Rs. {(food.price * food.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Description */}
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2 sm:line-clamp-1 hidden xs:block">
                        {food.description}
                      </p>
                    </div>

                    {/* Quantity & Actions Row */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      {/* Interactive Quantity Selector */}
                      <div className="flex items-center bg-green-50/50 border border-green-200/60 p-0.5 sm:p-1 rounded-xl shadow-inner">
                        <button
                          onClick={() => dispatch(decrement(food._id))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg font-bold text-gray-500 hover:bg-white hover:text-green-600 active:scale-95 transition-all"
                        >
                          —
                        </button>
                        <span className="w-6 sm:w-8 text-center font-bold text-gray-800 text-xs sm:text-sm">
                          {food.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increment(food._id))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg font-bold text-gray-500 hover:bg-white hover:text-green-600 active:scale-95 transition-all"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button (Desktop Viewport) */}
                      <button
                        onClick={() => dispatch(remove(food._id))}
                        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-rose-600 transition-colors group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Absolute Positioned Remove Button for Mobile Viewports */}
                  <button
                    onClick={() => dispatch(remove(food._id))}
                    className="absolute top-3 right-3 sm:hidden text-gray-400 hover:text-rose-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="rounded-3xl border border-green-100 bg-white p-5 sm:p-6 shadow-sm md:col-span-5 lg:col-span-4 md:sticky md:top-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 sm:pb-4">
                Order Summary
              </h3>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
                    Rs. {total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="mt-5 sm:mt-6 w-full rounded-xl bg-gradient-to-r from-green-500 via-green-600 to-emerald-700 py-3 px-4 text-center text-sm font-bold text-white shadow-md shadow-green-600/10 hover:opacity-95 transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-white py-12 px-4 text-center sm:py-16">
            <div className="text-4xl sm:text-5xl animate-pulse">🛒</div>
            <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-800">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs sm:max-w-sm text-xs sm:text-sm text-gray-400">
              Looks like you haven't added anything to your cart yet. Go ahead
              and explore our delicious menu items!
            </p>
            <button 
              onClick={() => navigate('/menu')} 
              className="mt-6 rounded-xl cursor-pointer bg-green-700 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-green-800 transition-all focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;