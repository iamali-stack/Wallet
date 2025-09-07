import React from "react"
import { NavLink } from "react-router-dom"
import { Home, CreditCard, BarChart3 } from "lucide-react"

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 flex-col justify-between bg-white border-r border-gray-100 fixed left-0 top-0 z-30">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
            <div className="size-10 rounded-lg bg-purple-600 flex items-center justify-center">
              <CreditCard className="size-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Smart Wallet</p>
              <p className="text-sm text-gray-500">Financial Tracker</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 px-4">
            <ul className="space-y-1.5">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Home
                        className={`size-5 ${
                          isActive ? "text-purple-600" : "text-gray-500"
                        }`}
                      />
                      <span>Home</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <CreditCard
                        className={`size-5 ${
                          isActive ? "text-purple-600" : "text-gray-500"
                        }`}
                      />
                      <span>Transactions</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <BarChart3
                        className={`size-5 ${
                          isActive ? "text-purple-600" : "text-gray-500"
                        }`}
                      />
                      <span>Analytics</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">© 2025 Smart Wallet</p>
        </div>
      </div>

      

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-20">
        <div className="flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-700"}`
            }
          >
            <Home className="size-5" />
            <span className="text-xs font-medium">Home</span>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-700"}`
            }
          >
            <CreditCard className="size-5" />
            <span className="text-xs font-medium">Transactions</span>
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-700"}`
            }
          >
            <BarChart3 className="size-5" />
            <span className="text-xs font-medium">Analytics</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}