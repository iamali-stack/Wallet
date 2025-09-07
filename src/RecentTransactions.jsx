import { useState } from "react"
import React from "react"
import { Calendar, TrendingUp, TrendingDown, Trash2, Eye, EyeOff } from "lucide-react"
import { useBalance, useTransactions } from "./Context/BalanceContext";

export default function RecentTransactions() {
  const [showBalance, setShowBalance] = useState(true)
  const { balance, setCustomBalance } = useBalance()
  const { transactions, removeTransaction } = useTransactions()

  // دالة لحذف المعاملة (بدون تأثير على الرصيد)
  const handleDeleteTransaction = (transaction) => {
    // حذف المعاملة بس بدون تعديل الرصيد
    removeTransaction(transaction.id);
  };
  
  // أو لو عايز تأكيد قبل الحذف:
  const handleDeleteTransactionWithConfirm = (transaction) => {
    const shouldDelete = window.confirm('هل تريد حذف هذه المعاملة؟ سيتم تعديل الرصيد تلقائياً.');
    if (shouldDelete) {
      // إعادة المبلغ للرصيد حسب نوع المعاملة
      if (transaction.type === 'income') {
        setCustomBalance(balance - transaction.amount);
      } else {
        setCustomBalance(balance + transaction.amount);
      }
      
      // حذف المعاملة
      removeTransaction(transaction.id);
    }
  };

 
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-600">My Wallet</h1>
          <p className="text-gray-600 text-sm">Recent Transactions</p>
        </div>
      </div>

      <div className="w-[90%] mb-6 md:w-2/3 flex justify-center md:justify-end mx-auto md:mx-0 md:me-20 pt-2">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm">
          <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden aspect-[1.586/1]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-300/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

            {/* Logo */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <div className="flex items-center space-x-[-6px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full"></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-[10px] sm:text-xs font-bold mt-1 text-center tracking-wide opacity-90">
                mastercard
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-0 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/80">Current Balance</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight flex items-center justify-between">
                  <span>{showBalance ? `EGP ${balance.toLocaleString()}` : "••••••••"}</span>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white/70 pt-10 pe-5"
                  >
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Card Number & Expiry */}
              <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
                <div className="text-sm sm:text-lg md:text-xl font-mono tracking-[0.08em] sm:tracking-[0.15em] text-white/95 font-medium break-all sm:break-normal pt-2">
                  5282 **** **** ****
                </div>
                <div className="flex justify-between items-center">
                  <div className="min-w-0 flex-shrink-0">
                    <div className="text-xs text-white/70 mb-1 uppercase tracking-wider">Valid Thru</div>
                    <div className="text-sm sm:text-base font-mono tracking-wider text-white/95 font-medium">
                      09/28
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-10 pb-[env(safe-area-inset-bottom)] border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center text-gray-900">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-gray-900" />
            Recent Transactions
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4 h-[60vh] md:h-96 overflow-y-auto pb-24 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-6xl mb-4">💳</div>
              <p className="text-lg">No transactions yet</p>
              <p className="text-sm">Add your first transaction to get started!</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 sm:p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-lg sm:text-xl flex items-center">
                      {transaction.category}
                    </div>
                    <div className="text-md sm:text-lg text-gray-500 truncate capitalize">
                      {transaction.type}
                    </div>
                    {transaction.note && (
                      <div className="text-sm text-gray-400 truncate mt-1">
                        {transaction.note}
                      </div>
                    )}
                    <div className="text-sm text-gray-400 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-md sm:text-lg flex-shrink-0 ${
                    transaction.type === 'income' ? 'text-green-700' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}EGP {transaction.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeleteTransaction(transaction)}
                    className="w-5 h-5 ms-2 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}