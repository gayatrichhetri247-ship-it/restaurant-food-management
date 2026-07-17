import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/features/cartSlice";
import { deleteFood, getfoods } from "../api/food.service";

const FoodManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // State for search/filter interaction
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foods", page],
    queryFn: () => getfoods(page, limit),
  });

  const foods = data?.foods || [];

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return deleteFood(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (err) => {
      console.log("failed to delete food", err);
    },
  });

  // Filter foods locally based on search input for instant interaction
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center bg-gray-50/50 px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <span className="ml-3 mt-4 text-center text-lg font-medium text-gray-600">
          Loading food database...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6 mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Food Management
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Maintain your menu catalog. Update pricing, descriptions, images, or
            quickly adjust your active inventory list.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => navigate("/admin/add-food")}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 hover:shadow-emerald-100 active:scale-95 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Item
          </button>
        </div>
      </div>

      {isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm flex items-start sm:items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 sm:mt-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">
            {error?.response?.data?.message ||
              "Failed to fetch kitchen records."}
          </span>
        </div>
      )}

      {/* Interactive Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search dish by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Showing {filteredFoods.length} of {foods.length} items
        </div>
      </div>

      {/* Main Content Layout */}
      {filteredFoods.length > 0 ? (
        <>
          {/* Mobile/Tablet Card Grid View: Hidden on Large Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {filteredFoods.map((food) => {
              const isDeletingThis =
                deleteMutation.isPending &&
                deleteMutation.variables === food._id;

              return (
                <div
                  key={food._id}
                  className={`flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                    isDeletingThis
                      ? "opacity-40 bg-red-50/10 pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Visual Thumb */}
                    <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={food.photo}
                        alt={food.name}
                        onClick={() =>
                          navigate(`/menu/${food._id}`, { state: food })
                        }
                        className="h-full w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-semibold text-gray-900 truncate hover:text-emerald-700 cursor-pointer"
                        onClick={() =>
                          navigate(`/menu/${food._id}`, { state: food })
                        }
                      >
                        {food.name}
                      </h3>
                      <p className="line-clamp-2 mt-1 text-xs text-gray-500 leading-relaxed">
                        {food.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="font-bold text-emerald-600">
                      Rs {food.price}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          navigate("/admin/edit-food", { state: food })
                        }
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to remove ${food.name}?`,
                            )
                          ) {
                            deleteMutation.mutate(food._id);
                          }
                        }}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        {isDeletingThis ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Tabular View: Hidden on Mobile and Tablet */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-emerald-50/50 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <tr>
                    <th scope="col" className="px-6 py-4">Image</th>
                    <th scope="col" className="px-6 py-4">Item Name</th>
                    <th scope="col" className="px-6 py-4">Description</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFoods.map((food) => {
                    const isDeletingThis =
                      deleteMutation.isPending &&
                      deleteMutation.variables === food._id;

                    return (
                      <tr
                        key={food._id}
                        className={`group hover:bg-emerald-50/20 transition-colors duration-150 ${
                          isDeletingThis
                            ? "opacity-40 bg-red-50/10 pointer-events-none"
                            : ""
                        }`}
                      >
                        {/* Image */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative h-14 w-20 overflow-hidden rounded-xl border border-gray-200 shadow-sm group-hover:border-emerald-300 transition-colors duration-200">
                            <img
                              src={food.photo}
                              alt={food.name}
                              onClick={() =>
                                navigate(`/menu/${food._id}`, { state: food })
                              }
                              className="h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </td>

                        {/* Item Name */}
                        <td className="px-6 py-4 font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {food.name}
                        </td>

                        {/* Description */}
                        <td className="px-6 py-4 max-w-xs md:max-w-sm">
                          <p className="line-clamp-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {food.description}
                          </p>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-600 bg-emerald-50/10 group-hover:bg-emerald-50/30 transition-colors">
                          Rs {food.price}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() =>
                              navigate("/admin/edit-food", { state: food })
                            }
                            className="inline-flex items-center rounded-lg px-3 py-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 transition-colors duration-150"
                          >
                            Edit
                          </button>

                          <button
                            disabled={deleteMutation.isPending}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to remove ${food.name}?`,
                                )
                              ) {
                                deleteMutation.mutate(food._id);
                              }
                            }}
                            className="inline-flex items-center rounded-lg px-3 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 active:bg-red-200 disabled:opacity-50 transition-colors duration-150"
                          >
                            {isDeletingThis ? "Removing..." : "Remove"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls - Moved here to show on both viewports */}
          <div className="flex items-center justify-center gap-4 mt-8 text-sm">
            <button
              disabled={!data?.hasPreviousPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400 shadow-sm active:scale-95 transition-all"
            >
              Previous
            </button>

            <span className="text-gray-600 font-medium">
              Page {data?.currentPage || 1} of {data?.totalPages || 1}
            </span>

            <button
              disabled={!data?.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400 shadow-sm active:scale-95 transition-all"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-gray-200 bg-white py-16 px-4 text-center shadow-sm">
          <div className="mx-auto flex max-w-md flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {searchTerm ? "No match found" : "Your menu is completely empty"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm
                ? `We couldn't find anything matching "${searchTerm}". Try checking your spelling or clear the filter.`
                : "Get started by adding items to your menu registry so customers can start ordering."}
            </p>
            <button
              onClick={() => {
                if (searchTerm) {
                  setSearchTerm("");
                } else {
                  navigate("/admin/add-food");
                }
              }}
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition-all"
            >
              {searchTerm ? "Clear Search Filter" : "Add Your First Menu Item"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodManagement;