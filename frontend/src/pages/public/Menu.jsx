import { useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import { getfoods } from '../../api/food.service';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/features/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isPending, isError, error } = useQuery({
  queryKey: ["foods", page],
  queryFn: () => getfoods(page, limit),
});

  const navigate = useNavigate();

  // Loading State (Fully responsive loader)
  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <span className="text-center text-base sm:text-lg font-medium text-gray-600">
          Gathering fresh ingredients...
        </span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-4 my-8 md:mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
        <div className="mb-2 text-2xl">⚠️</div>
        <p className="font-bold">Something went wrong!</p>
        <p className="text-sm text-red-500/90 mt-1">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8 pb-4 text-center sm:text-left">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Our Delicious <span className="text-emerald-600">Menu</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md sm:max-w-none mx-auto sm:mx-0">
          Discover our fresh, hand-crafted dishes made just for you.
        </p>
        <div className="mt-4 h-1 w-16 bg-emerald-500 rounded-full mx-auto sm:mx-0" />
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8">
        {data?.foods?.map((food) => (
          <div 
            key={food._id || food.id || food.name} 
            className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-100 max-w-md mx-auto w-full xs:max-w-none"
          >
            {/* Image Wrapper (Adjusts aspect ratio beautifully across screen sizes) */}
            <div 
              className="relative aspect-[4/3] xs:aspect-square w-full overflow-hidden bg-gray-50 cursor-pointer" 
              onClick={() => navigate(`/menu/${food._id}`, { state: food })}
            >
              <img 
                src={food.photo} 
                alt={food.name} 
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
              />
              {/* Fresh Tag Overlay */}
              <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 shadow-sm uppercase tracking-wider">
                Fresh
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <div className="flex-1">
                <h2 
                  onClick={() => navigate(`/menu/${food._id}`, { state: food })}
                  className="text-base sm:text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                >
                  {food.name}
                </h2>
                <p className="mt-1 sm:mt-2 text-xs line-clamp-2 text-gray-500 leading-relaxed">
                  {food.description}
                </p>
              </div>

              {/* Price & Action (Protects layout on ultra-small screens) */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-gray-50 pt-3 sm:pt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-600 whitespace-nowrap">
                    RS. {food.price}
                  </span>
                </div>
                
                <button 
                  className="rounded-2xl cursor-pointer bg-emerald-500 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 active:scale-95 transition-all duration-200"
                  onClick={() => {
                    dispatch(add(food));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;