import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Shared styling for active vs inactive sidebar links
  const linkStyles = ({ isActive }) =>
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-emerald-50 text-emerald-700 font-semibold'
        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
    }`

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans antialiased text-zinc-800">
      
      {/* Mobile Sidebar Overlay (Backdrop) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 flex flex-col justify-between 
        transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Logo & Close Button for Mobile */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-zinc-900 tracking-wide flex items-center gap-2">
                <span className="w-2 h-5 bg-emerald-500 rounded-sm inline-block"></span>
                Admin Panel
              </h1>
              <p className="text-xs text-zinc-400 mt-1 pl-4">Management Hub</p>
            </div>
            
            {/* Close sidebar button on mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 md:hidden"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="space-y-1">
            <NavLink 
              to="/admin/food-management" 
              className={linkStyles}
              onClick={() => setIsSidebarOpen(false)} // Auto-close on link click (mobile)
            >
              Food Management
            </NavLink>
            <NavLink 
              to="/admin/user-management" 
              className={linkStyles}
              onClick={() => setIsSidebarOpen(false)}
            >
              User Management
            </NavLink>
            <NavLink 
              to="/admin/order-management" 
              className={linkStyles}
              onClick={() => setIsSidebarOpen(false)}
            >
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
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 prevents flex children from overflowing */}
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 md:hidden"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-zinc-700 truncate">Dashboard</h2>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-zinc-600 font-medium hidden sm:inline">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-emerald-100 shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-zinc-200 p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}

export default Dashboard