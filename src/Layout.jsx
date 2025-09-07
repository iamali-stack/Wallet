import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { Plus, X } from "lucide-react"
import Sidebar from "./Sidebar.jsx"
import Transactions from "./Transactions.jsx"

export default function Layout() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <div className={`min-h-screen`}>
      {/* Web layout */}
      <div className="hidden md:grid md:grid-cols-[260px_1fr] md:gap-0">
        <aside className="md:sticky md:top-0 md:h-screen">
          <Sidebar />
        </aside>
        <main className={`bg-gray-50`}>
          <div className="pt-0"> 
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile layout */}
      <div className={`md:hidden flex min-h-screen flex-col bg-white`}>
        <Sidebar />
        <main className="flex-1 pt-0 pb-16"> 
          <Outlet />
        </main>
      </div>

      {/* Floating Add Button (FAB) - visible on all pages */}
      {!isSheetOpen && (
        <button
          type="button"
          aria-label="Add transaction"
          onClick={() => setIsSheetOpen(true)}
          className="fixed right-4 bottom-24 md:right-8 md:bottom-8 z-40 h-14 w-14 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <Plus className="h-6 w-6 m-auto" />
        </button>
      )}

      {/* Slide-down Sheet with backdrop */}
      <div className={`fixed inset-0 z-50 ${isSheetOpen ? '' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          onClick={() => setIsSheetOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isSheetOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Panel (slides down from top) */}
        <div
          className={`absolute inset-x-0 bottom-0 h-[90vh] md:h-[85vh] bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ${isSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {/* Sheet header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Add Transaction</h3>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsSheetOpen(false)}
              className="p-2 rounded-md hover:bg-gray-50 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Sheet content */}
          <div className="h-[calc(100%-56px)] overflow-y-auto">
            <Transactions onCancel={() => setIsSheetOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  )
}


