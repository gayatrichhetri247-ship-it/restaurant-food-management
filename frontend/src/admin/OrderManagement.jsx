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
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Order Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track customer purchases, fulfillment status, and order timeline
          details.
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                Customer
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Ordered Items
              </th>
              <th scope="col" className="px-6 py-4">
                Qty
              </th>
              <th scope="col" className="px-6 py-4">
                Payment Status
              </th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.orders?.map((order) => {
              return (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/70 transition-colors align-top"
                >
                  {/* User Fullname */}
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                    {order.userId?.fullname || "Guest User"}
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                    {order.userId?.email || "N/A"}
                  </td>

                  {/* Nested Food Items list */}
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

                  {/* Nested Quantities list */}
                  <td className="px-6 py-4 text-gray-600">
                    <div className="space-y-1.5">
                      {order.foods.map((item) => (
                        <div key={item.foodId?._id} className="tabular-nums">
                          {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Status Badges */}
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

                  {/* Formatted Order Date */}
                  
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
