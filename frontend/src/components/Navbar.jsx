import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { getUser, logoutUser } from "../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { AuthSuccess, LogoutSuccess } from "../redux/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Dynamic active link styling with hover transitions and subtle highlights
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative ${
      isActive
        ? "text-blue-400 bg-blue-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
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

  // Extract initials if user name exists (e.g., "John Doe" -> "JD")
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800/60 px-6 py-3.5 flex items-center justify-between shadow-xl shadow-black/10">
      {/* Brand Logo with a glowing effect gradient */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
          M
        </div>
        <span className="text-white font-extrabold text-xl tracking-tight bg-clip-text group-hover:text-transparent bg-gradient-to-r from-white via-white to-gray-400 transition-all duration-300">
          MyApp
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
        <div className="h-5 w-[1px] bg-gray-800 my-auto mx-1" />

        {user && isAuthenticated ? (
          <div className="flex items-center gap-4">
            {/* Cart Icon Button */}
            <NavLink
              to="/cart"
              className={({ isActive }) => 
                `p-2.5 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? "bg-blue-500/10 text-blue-400" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`
              }
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 group-hover:scale-105 transition-transform duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {/* Optional: Item Count Badge (Static '3' for preview, swap with items.length if available) */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-gray-950 animate-pulse">
                3
              </span>
            </NavLink>

            {/* User Profile Info & Action */}
            <div className="flex items-center gap-3 pl-1 border-l border-gray-800/60">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-gray-400 font-medium leading-none mb-0.5">Welcome back,</span>
                <span className="text-sm text-gray-200 font-semibold leading-none">{user.name || "User"}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-blue-400 shadow-inner">
                {getUserInitials()}
              </div>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-gray-800 hover:bg-red-950/40 text-gray-300 hover:text-red-400 text-xs font-semibold rounded-lg border border-gray-700/60 hover:border-red-900/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/20"
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md shadow-blue-600/10 hover:shadow-blue-500/20"
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