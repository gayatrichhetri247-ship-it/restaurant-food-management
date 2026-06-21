import { NavLink } from "react-router"
import { logoutUser } from "../api/auth.service";

const Navbar = () => {
  // Tailwind classes for normal vs active links
  const linkStyles = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`

    const handleLogout = async()=>{
      await logoutUser();
    
    };
  return (
    <nav className="bg-gray-950 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="text-white font-bold text-xl tracking-wider">
          MyApp
        </div>

        {/* Navigation Links & Actions */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/login" className={linkStyles}>
            Login
          </NavLink>
          <NavLink to="/sign-up" className={linkStyles}>
            Signup
          </NavLink>
          
          {/* Divider */}
          <span className="h-5 w-px bg-gray-700" aria-hidden="true" />

          {/* Logout Button */}
          <button onClick={handleLogout} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar