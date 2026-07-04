import React from 'react'
import { NavLink, Outlet } from 'react-router'

const Dashboard = () => {
  // Shared styling for active vs inactive sidebar links
  const linkStyles = ({ isActive }) =>
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-emerald-50 text-emerald-700 font-semibold'
        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
    }`

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans antialiased text-zinc-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-zinc-900 tracking-wide flex items-center gap-2">
              <span className="w-2 h-5 bg-emerald-500 rounded-sm inline-block"></span>
              Admin Panel
            </h1>
            <p className="text-xs text-zinc-400 mt-1 pl-4">Management Hub</p>
          </div>
          
          <nav className="space-y-1">
            <NavLink to="/admin/food-management" className={linkStyles}>
              Food Management
            </NavLink>
            <NavLink to="/admin/user-management" className={linkStyles}>
              User Management
            </NavLink>
            <NavLink to="/admin/order-management" className={linkStyles}>
              Order Management
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-100 text-xs text-zinc-400 text-center">
          © 2026 Dashboard Inc.
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-zinc-700">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 font-medium">Welcome, Admin</span>
            {/* Theme Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-emerald-100">
              A
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}

export default Dashboard