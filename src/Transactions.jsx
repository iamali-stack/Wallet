import React, { useState, useEffect } from "react"
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { useBalance, useTransactionType, useTransactions } from "./Context/BalanceContext";

export default function Transactions({ onCancel }) {
  const [inputValue, setInputValue] = useState("")
  const { type, setType } = useTransactionType()
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [note, setNote] = useState('')
  const { balance, setCustomBalance } = useBalance()
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()

  // Detect mobile to avoid opening keyboard on category select
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  const expenseCategories = [
    { label: "🍕 Food", value: "Food" },
    { label: "🏠 Rent", value: "Rent" },
    { label: "🚗 Transport", value: "Transport" },
    { label: "📚 Education", value: "Education" },
    { label: "🏥 Healthcare", value: "Healthcare" },
    { label: "🎬 Entertainment", value: "Entertainment" },
    { label: "🛍️ Shopping", value: "Shopping" },
    { label: "💡 Bills", value: "Bills" },
    { label: "➕ Other", value: "Other" }
  ];

  const incomeCategories = [
    { label: "💰 Salary", value: "Salary" },
    { label: "💼 Freelance", value: "Freelance" },
    { label: "📈 Investments", value: "Investments" },
    { label: "🎁 Gifts", value: "Gifts" },
    { label: "💸 Other Income", value: "Other Income" }
  ];

  // Custom styles for react-select (light only)
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: `1px solid #d1d5db`,
      borderRadius: '1rem',
      padding: '0.5rem 0.75rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#8b5cf6',
      },
      fontSize: '1rem',
      backgroundColor: '#fff',
      minHeight: '3rem',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      backgroundColor: '#fff',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 100 }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3e8ff' : '#fff',
      color: state.isSelected ? '#fff' : '#111827',
      padding: '0.75rem 1.5rem',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#111827',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  const handleAddTransaction = () => {
    // التحقق من صحة البيانات
    if (!inputValue || !category || isNaN(inputValue) || Number(inputValue) <= 0) {
      alert('يرجى ملء جميع البيانات المطلوبة بشكل صحيح');
      return;
    }

    const amount = Number(inputValue);

    // إضافة المعاملة إلى قائمة المعاملات
    addTransaction({
      type: type,
      amount: amount,
      category: category,
      date: date,
      note: note || ''
    });

    // تحديث الرصيد
    if (type === 'income') {
      setCustomBalance(balance + amount);
    } else {
      setCustomBalance(balance - amount);
    }

    // إعادة تعيين النموذج
    setInputValue('');
    setCategory('');
    setNote('');
    
    // إغلاق النموذج
    if (onCancel) onCancel();
    navigate('/transactions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-gray-50`}>
      <div className={`w-full h-full px-4 sm:px-6 lg:px-8 pt-3 pb-[180px] lg:pb-8`}>
        {/* Header */}
        <div className="border-gray-100 mb-4 flex items-center justify-between">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold text-purple-600 transition-colors duration-200`}>My Wallet</h1>
            <p className={`text-sm sm:text-base text-gray-600`}>Take control of your finances</p>
          </div>
        </div>

        {/* Full Width/Height Card */}
        <div className={`rounded-xl border p-6 sm:p-8 shadow-sm w-full  min-h-[calc(100vh-180px)] bg-white border-gray-100`}>
          {/* Dynamic Form Title */}
          <h2 className={`text-lg font-semibold mb-6 text-gray-900`}>
            Add {type === 'income' ? 'Income' : 'Expense'}
          </h2>

          {/* Income/Expense Toggle */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setType('income')}
                aria-pressed={type === 'income'}
                className={`flex items-center justify-center h-12 rounded-lg border text-sm font-medium transition-all ${type === 'income' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Income
              </button>
              <button
                onClick={() => setType('expense')}
                aria-pressed={type === 'expense'}
                className={`flex items-center justify-center h-12 rounded-lg border text-sm font-medium transition-all ${type === 'expense' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Expense
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className={`block text-sm font-semibold mb-2 text-gray-900`}>Amount</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="$0.00"
                className={`w-full px-4 py-3 border rounded-lg text-lg font-medium transition-all focus:ring-2 focus:ring-purple-600/20 focus:outline-none focus-visible:outline-none bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-600`}
              />
            </div>

            {/* Category */}
            <div className="w-full">
              <label className={`block text-sm font-semibold mb-2 text-gray-900`}>Category</label>
              <Select
                name="category"
                options={type === 'income' ? incomeCategories : expenseCategories}
                value={
                  ((type === 'income' ? incomeCategories : expenseCategories).find(
                    (option) => option.value === category
                  )) || null
                }
                onChange={(option) => {
                  setCategory(option ? option.value : '');
                }}
                classNamePrefix="react-select"
                className="text-lg"
                isSearchable={!isMobile}
                placeholder="Select category"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">Date</label>
              <div className="relative">
                <input
                  id="date-input"
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border pl-6 pr-4 py-4 rounded-2xl text-lg appearance-none 
        transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent 
        outline-none bg-white border-gray-300 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className={`block text-sm font-semibold mb-2 text-gray-900`}>Note (Optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                className={`w-full px-4 py-3 border rounded-lg h-24 resize-none text-sm transition-all focus:ring-2 focus:ring-purple-600/20 focus:outline-none focus-visible:outline-none bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-600`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              if (typeof onCancel === 'function') onCancel()
            }}
            className="h-12 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddTransaction} 
            
            className={`h-12 rounded-lg font-semibold text-white ${
              type === 'income'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Add {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </div>
      </div>
    </div>
  )
}