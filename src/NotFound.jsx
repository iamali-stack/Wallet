import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
      </div>
    </div>
  )
}