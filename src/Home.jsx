import React from 'react';
import { TrendingUp, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
    const [greeting, setGreeting] = useState('');

      const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-start mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Welcome Back!</h1>
              <p>{greeting}</p>
            </div>
          </div>
        </div>

        {/* Ready to Start Saving Card */}
        <div className="bg-purple-100 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">Ready to Start Saving?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Take control of your finances and start tracking your income and expenses
          </p>
        </div>

        {/* Get Started Steps */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Get Started in 2 Steps</h3>
          
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 max-w-3xl">
            {/* Step 1 */}
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm lg:text-base">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg lg:text-xl">Add your first transaction</h4>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Tap the + button to get started</p>
              </div>
            </div>
          
            {/* Step 2 */}
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm lg:text-base">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg lg:text-xl">Track your progress</h4>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">View insights and analytics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8 lg:mb-12 max-w-3xl">
          <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-purple-900 mb-1 sm:mb-2">Pro Tip</h3>
              <p className="text-sm sm:text-base lg:text-lg text-purple-800 leading-relaxed">
                Use the floating <span className="text-purple-600 font-medium">+ button</span> to quickly add transactions throughout your day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}