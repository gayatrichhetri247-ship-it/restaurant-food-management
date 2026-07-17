import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/order.service";

const OrderManagement = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">
          Loading incoming orders...
        </span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        <p className="font-semibold">Failed to load orders</p>
        <p className="text-sm text-red-500 mt-1">
          Please refresh or check your server connection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Order Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track customer purchases, fulfillment status, and order timeline details.
        </p>
      </div>

      {/* 1. Mobile View: Stacked Cards (Hidden on md screens and up) */}
      <div className="space-y-4 md:hidden">
        {data?.orders?.map((order) => {
          const isComplete = order.foods[0]?.paymentStatus === "COMPLETE";
          return (
            <div 
              key={order._id} 
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {order.userId?.fullname || "Guest User"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.userId?.email || "No Email"}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isComplete
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {order.foods[0]?.paymentStatus || "Pending"}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Items Ordered
                </p>
                {order.foods.map((item) => (
                  <div key={item.foodId?._id} className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium truncate max-w-[200px]">
                      {item.foodId?.name || "Deleted Item"}
                    </span>
                    <span className="text-gray-500 font-mono">
                      qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Desktop/Tablet View: Traditional Table (Hidden on small screens) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Customer</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Ordered Items</th>
              <th scope="col" className="px-6 py-4">Qty</th>
              <th scope="col" className="px-6 py-4">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.orders?.map((order) => {
              return (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/70 transition-colors align-top"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                    {order.userId?.fullname || "Guest User"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                    {order.userId?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="space-y-1.5">
                      {order.foods.map((item) => (
                        <div
                          key={item.foodId?._id}
                          className="font-medium truncate max-w-xs"
                        >
                          {item.foodId?.name || "Deleted Item"}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="space-y-1.5">
                      {order.foods.map((item) => (
                        <div key={item.foodId?._id} className="tabular-nums">
                          {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        order.foods[0]?.paymentStatus === "COMPLETE"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {order.foods[0]?.paymentStatus || "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;