import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { getUser, logoutUser } from "../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { AuthSuccess, LogoutSuccess } from "../redux/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // FIXED: Adjusted to state.cart.cartItems to accurately sync with the Menu state
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  
  // Calculates the absolute total number of elements inside the array
  const cartCount = cartItems.length;

  const linkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
      isActive
        ? "text-emerald-800 bg-white/40 shadow-sm"
        : "text-emerald-900/80 hover:text-emerald-950 hover:bg-white/20"
    }`;

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(LogoutSuccess());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        dispatch(AuthSuccess(res.user));
      } catch (error) {
        console.error("Failed to fetch session user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  const getUserInitials = () => {
    if (!user?.fullname) return "U";
    return user.fullname
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-green-300/90 border-b border-green-400/30 px-6 py-3.5 flex items-center justify-between shadow-lg shadow-green-900/5">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
          F
        </div>
        <span className="text-emerald-950 font-black text-xl tracking-tight transition-all duration-300">
          The Food Spot
        </span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-2 md:gap-4">
        <NavLink to="/" className={linkStyles}>
          Home
        </NavLink>
        <NavLink to="/menu" className={linkStyles}>
          Menu
        </NavLink>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-emerald-400/60 my-auto mx-1" />

        {user && isAuthenticated ? (
          <div className="flex items-center gap-4">
            {/* Cart Icon Button */}
            <NavLink
              to="/cart"
              className={({ isActive }) => 
                `p-2.5 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? "bg-white/40 text-emerald-900" 
                    : "text-emerald-900/80 hover:text-emerald-950 hover:bg-white/20"
                }`
              }
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {/* Dynamic Badge counter based on genuine cart slice values */}
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-green-300 animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* User Profile Info & Action */}
            <div className="flex items-center gap-3 pl-1 border-l border-emerald-400/40">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] text-emerald-900/60 font-bold leading-none mb-0.5">Welcome,</span>
                <span className="text-sm text-emerald-950 font-bold leading-none">{user.fullname || "User"}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-600 border border-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                {getUserInitials()}
              </div>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-emerald-800/10 hover:bg-red-600 hover:text-white text-emerald-900 text-xs font-bold rounded-lg border border-emerald-700/20 hover:border-red-600 transition-all duration-300 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <NavLink to="/login" className={linkStyles}>
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-emerald-600/10"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;