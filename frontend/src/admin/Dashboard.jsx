import React from 'react'
import { Link, Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900 tracking-wide">Admin Panel</h1>
            <p className="text-xs text-gray-500 mt-1">Management Hub</p>
          </div>
          
          <nav className="space-y-1">
            <Link 
              to="/admin/food-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Food Management
            </Link>
            <Link 
              to="/admin/user-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              User Management
            </Link>
            <Link 
              to="/admin/order-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Order Management
            </Link>
          </nav>
        </div>

        {/* Optional Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          © 2026 Dashboard Inc.
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header (Great for profile dropdowns, notifications, etc.) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}

export default Dashboard