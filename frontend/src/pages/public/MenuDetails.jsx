import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { add } from '../../redux/features/cartSlice';
// Assuming your action is located here; adjust the import path if necessary

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const food = location?.state;
  const [quantity, setQuantity] = useState(1);

  if (!food) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-emerald-50/40 px-4 text-center">
        <div className="rounded-full bg-emerald-100 p-4 text-emerald-600 animate-bounce">
          🍳
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800">Menu item not found</h3>
        <p className="mt-2 text-sm text-gray-500">It looks like you refreshed or came here directly.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-900 transition-all"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToBasket = () => {
    // Construct the item payload, blending the food info with the selected quantity
    const cartItem = {
      ...food,
      quantity: quantity
    };
    
    // Dispatch the action to Redux to increase your Navbar's badge count
    dispatch(add(cartItem));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/60 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 grid md:grid-cols-2">
        
        {/* Left: Premium Image Section */}
        <div className="relative h-72 md:h-[550px] w-full overflow-hidden group">
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
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Breadcrumb / Category */}
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Fresh & Delicious
            </span>

            {/* Title */}
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 font-serif">
              {food.name}
            </h1>

            {/* Divider Line */}
            <div className="my-5 h-0.5 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />

            {/* Description */}
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              {food.description || "Savor the rich, authentic flavors prepared with handpicked ingredients and crafted to perfection by our master chefs."}
            </p>
          </div>

          {/* Interactive Actions & Pricing */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Luxury Styled Price Display */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Price</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 mt-1">
                  RS. {(food.price * quantity).toLocaleString()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-50 border border-gray-200/80 p-1.5 rounded-2xl shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-gray-600 hover:bg-white active:scale-95 transition-all"
                >
                  —
                </button>
                <span className="w-10 text-center font-bold text-gray-800 text-lg">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-gray-600 hover:bg-white active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-5 gap-3">
              <button 
                onClick={handleAddToBasket}
                className="col-span-4 group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-center text-base font-bold text-white shadow-md shadow-emerald-600/20 hover:opacity-95 transition-all active:scale-[0.98]"
              >
                <span>Add to Basket</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Favorite Button */}
              <button className="col-span-1 flex items-center justify-center rounded-2xl border-2 border-gray-100 bg-white text-gray-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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