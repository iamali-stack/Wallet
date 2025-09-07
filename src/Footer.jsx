import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      {/* Bottom Navigation (mobile) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `flex-1 py-4 flex flex-col items-center ${isActive ? '' : ''}`}
          >
            {({ isActive }) => (
              <>
                <svg className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className={`text-xs font-medium ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) => `flex-1 py-4 flex flex-col items-center ${isActive ? '' : ''}`}
          >
            {({ isActive }) => (
              <>
                <svg className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className={`text-xs font-medium ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>Transactions</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => `flex-1 py-4 flex flex-col items-center ${isActive ? '' : ''}`}
          >
            {({ isActive }) => (
              <>
                <svg className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className={`text-xs font-medium ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>Analytics</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </>
  )
}