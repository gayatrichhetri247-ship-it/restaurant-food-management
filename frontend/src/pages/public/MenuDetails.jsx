import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { add } from '../../redux/features/cartSlice'

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const food = location?.state;
  const [quantity, setQuantity] = useState(1);

  if (!food) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-50/40 px-4 text-center">
        <div className="rounded-full bg-emerald-100 p-4 text-emerald-600 animate-bounce text-2xl sm:text-3xl">
          🍳
        </div>
        <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-800">Menu item not found</h3>
        <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xs">It looks like you refreshed or came here directly.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 w-full max-w-xs sm:w-auto rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-900 transition-all"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToBasket = () => {
    const cartItem = {
      ...food,
      quantity: quantity
    };
    dispatch(add(cartItem));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/60 py-4 sm:py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Premium Image Section */}
        <div className="relative h-64 sm:h-80 md:h-[550px] w-full overflow-hidden group">
          <img 
            src={food.photo} 
            alt={food.name} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5" />
          
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Chef's Special
            </span>
          </div>
        </div>

        {/* Right: Elegant Content & Interactive Section */}
        <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Breadcrumb / Category */}
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Fresh & Delicious
            </span>

            {/* Title */}
            <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 font-serif break-words">
              {food.name}
            </h1>

            {/* Divider Line */}
            <div className="my-4 sm:my-5 h-0.5 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 font-normal">
              {food.description || "Savor the rich, authentic flavors prepared with handpicked ingredients and crafted to perfection by our master chefs."}
            </p>
          </div>

          {/* Interactive Actions & Pricing */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
            <div className="flex flex-row items-center justify-between gap-4">
              
              {/* Luxury Styled Price Display */}
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">Total Price</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 mt-0.5 truncate">
                  RS. {(food.price * quantity).toLocaleString()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-50 border border-gray-200/80 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-inner shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl font-bold text-gray-600 hover:bg-white active:scale-95 transition-all text-xs sm:text-sm"
                >
                  —
                </button>
                <span className="w-8 sm:w-10 text-center font-bold text-gray-800 text-sm sm:text-lg">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl font-bold text-gray-600 hover:bg-white active:scale-95 transition-all text-xs sm:text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-row gap-3">
              <button 
                onClick={handleAddToBasket}
                className="flex-1 group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 sm:px-6 py-3 sm:py-4 text-center text-sm sm:text-base font-bold text-white shadow-md shadow-emerald-600/20 hover:opacity-95 transition-all active:scale-[0.98]"
              >
                <span>Add to Basket</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Favorite Button */}
              <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl sm:rounded-2xl border-2 border-gray-100 bg-white text-gray-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default MenuDetails