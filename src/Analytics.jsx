import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, TrendingDown, ArrowUpRight, BarChart3, Download } from 'lucide-react';
import { useBalance, useTransactions } from './Context/BalanceContext';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  const { balance } = useBalance();
  const { transactions } = useTransactions();

  // حساب البيانات المالية بناءً على الفترة المختارة
  const financialData = useMemo(() => {
    let filteredTransactions = transactions;

    // تصفية المعاملات حسب الفترة المختارة
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (selectedPeriod === 'This Month') {
      filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });
    } else if (selectedPeriod === 'Last Month') {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === lastMonth && 
               transactionDate.getFullYear() === lastMonthYear;
      });
    } else if (selectedPeriod === 'Custom' && customStartDate && customEndDate) {
      filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= new Date(customStartDate) && 
               transactionDate <= new Date(customEndDate);
      });
    }

    // حساب إجمالي الدخل والمصروفات
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savings = totalIncome - totalExpenses;

    // حساب النسب المئوية للتغيير (مقارنة بالشهر السابق)
    let previousPeriodTransactions = [];
    if (selectedPeriod === 'This Month') {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      previousPeriodTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === lastMonth && 
               transactionDate.getFullYear() === lastMonthYear;
      });
    }

    const previousIncome = previousPeriodTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const previousExpenses = previousPeriodTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const previousSavings = previousIncome - previousExpenses;

    const incomeChange = previousIncome > 0 ? 
      ((totalIncome - previousIncome) / previousIncome * 100) : 0;
    const expenseChange = previousExpenses > 0 ? 
      ((totalExpenses - previousExpenses) / previousExpenses * 100) : 0;
    const savingsChange = previousSavings > 0 ? 
      ((savings - previousSavings) / previousSavings * 100) : 0;

    return {
      totalIncome,
      totalExpenses,
      savings: balance, // استخدام الرصيد الحالي
      incomeChange: Math.round(incomeChange * 10) / 10,
      expenseChange: Math.round(expenseChange * 10) / 10,
      savingsChange: Math.round(savingsChange * 10) / 10,
      filteredTransactions
    };
  }, [transactions, selectedPeriod, customStartDate, customEndDate, balance]);

  // بيانات الرسم البياني من أول الشهر الحالي لـ 6 أشهر قدام
  const chartData = useMemo(() => {
    const months = [];
    const now = new Date();
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === date.getMonth() && 
               transactionDate.getFullYear() === date.getFullYear();
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: monthName,
        income,
        expense
      });
    }
    
    return months;
  }, [transactions]);

  // تحليل المصروفات حسب الفئة
  const categorySpending = useMemo(() => {
    const categories = {};
    
    financialData.filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (categories[t.category]) {
          categories[t.category] += t.amount;
        } else {
          categories[t.category] = t.amount;
        }
      });

    return Object.entries(categories)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // أعلى 5 فئات إنفاق
  }, [financialData.filteredTransactions]);

  // دالة تحميل ملخص PDF مع Recent Transactions
  const downloadPDFSummary = () => {
    // إنشاء HTML للفاتورة
    const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Financial Summary Report</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f8fafc;
                color: #1f2937;
                line-height: 1.6;
            }
            .invoice-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #8b5cf6;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #8b5cf6;
                font-size: 2.5em;
                margin: 0;
                font-weight: bold;
            }
            .header p {
                color: #6b7280;
                margin: 5px 0 0 0;
                font-size: 1.1em;
            }
            .summary-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin: 30px 0;
            }
            .summary-card {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                border-left: 4px solid;
            }
            .income-card { border-left-color: #10b981; }
            .expense-card { border-left-color: #ef4444; }
            .balance-card { border-left-color: #3b82f6; }
            .summary-card h3 {
                margin: 0 0 10px 0;
                font-size: 0.9em;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #6b7280;
            }
            .summary-card .amount {
                font-size: 1.8em;
                font-weight: bold;
                margin: 0;
            }
            .income-card .amount { color: #10b981; }
            .expense-card .amount { color: #ef4444; }
            .balance-card .amount { color: #3b82f6; }
            .info-section {
                margin: 30px 0;
                padding: 20px;
                background: #f9fafb;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }
            .info-section h3 {
                margin-top: 0;
                color: #374151;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 10px;
            }
            .transactions-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            .transactions-table th {
                background: #8b5cf6;
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: 600;
            }
            .transactions-table td {
                padding: 12px 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            .transactions-table tr:last-child td {
                border-bottom: none;
            }
            .transactions-table tr:nth-child(even) {
                background: #f8fafc;
            }
            .income-amount { color: #10b981; font-weight: 600; }
            .expense-amount { color: #ef4444; font-weight: 600; }
            .category-list {
                list-style: none;
                padding: 0;
            }
            .category-list li {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .category-list li:last-child {
                border-bottom: none;
            }
            .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
            }
            .date-generated {
                font-size: 0.9em;
                color: #9ca3af;
            }
            @media print {
                body { background-color: white; }
                .invoice-container { box-shadow: none; }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="header">
                <h1>💳 My Wallet</h1>
                <p>Financial Summary Report</p>
                <p class="date-generated">Generated on: ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                })}</p>
            </div>

            <div class="info-section">
                <h3>📊 Period: ${selectedPeriod}</h3>
                <p><strong>Total Transactions:</strong> ${financialData.filteredTransactions.length}</p>
                ${customStartDate && customEndDate ? 
                  `<p><strong>Date Range:</strong> ${customStartDate} to ${customEndDate}</p>` : ''}
            </div>

            <div class="summary-grid">
                <div class="summary-card income-card">
                    <h3>Total Income</h3>
                    <p class="amount">EGP ${financialData.totalIncome.toLocaleString()}</p>
                </div>
                <div class="summary-card expense-card">
                    <h3>Total Expenses</h3>
                    <p class="amount">EGP ${financialData.totalExpenses.toLocaleString()}</p>
                </div>
                <div class="summary-card balance-card">
                    <h3>Current Balance</h3>
                    <p class="amount">EGP ${balance.toLocaleString()}</p>
                </div>
            </div>

            ${categorySpending.length > 0 ? `
            <div class="info-section">
                <h3>🏷️ Top Spending Categories</h3>
                <ul class="category-list">
                    ${categorySpending.map(cat => `
                        <li>
                            <span><strong>${cat.name}</strong></span>
                            <span>EGP ${cat.amount.toLocaleString()}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            ${financialData.filteredTransactions.length > 0 ? `
            <div class="info-section">
                <h3>📝 Recent Transactions</h3>
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${financialData.filteredTransactions
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map(transaction => `
                            <tr>
                                <td>${new Date(transaction.date).toLocaleDateString()}</td>
                                <td>${transaction.category}</td>
                                <td style="text-transform: capitalize;">${transaction.type}</td>
                                <td class="${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}">
                                    ${transaction.type === 'income' ? '+' : '-'}EGP ${transaction.amount.toLocaleString()}
                                </td>
                                <td>${transaction.note || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : `
            <div class="info-section">
                <h3>📝 Recent Transactions</h3>
                <p style="text-align: center; color: #6b7280; padding: 20px;">
                    No transactions found for this period.
                </p>
            </div>
            `}

            <div class="footer">
                <p>This report was generated automatically by My Wallet application.</p>
                <p><strong>Net Change:</strong> 
                    <span style="color: ${(financialData.totalIncome - financialData.totalExpenses) >= 0 ? '#10b981' : '#ef4444'};">
                        EGP ${(financialData.totalIncome - financialData.totalExpenses).toLocaleString()}
                    </span>
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    // إنشاء وتحميل الملف HTML
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-summary-${selectedPeriod.toLowerCase().replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // الحد الأقصى للرسم البياني
  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expense))) || 1000;

  return (
    <div className={`min-h-screen bg-gray-50 p-3 sm:p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-3xl font-bold text-purple-600">My Wallet</h1>
          <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
        </div>
      </div>

      {/* Monthly Financial Overview */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl text-gray-600 mb-4 sm:mb-6">Financial Overview</h2>
        
        {/* Date Selector */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <select 
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 min-w-32 text-base sm:text-lg"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom</option>
          </select>
          {selectedPeriod === 'Custom' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="border-none outline-none bg-transparent text-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="border-none outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>
          )}
        </div>

        {/* Financial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Income */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-sm sm:text-base text-gray-600">Total Income</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
              EGP {financialData.totalIncome.toLocaleString()}
            </div>
            <div className={`text-sm ${financialData.incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {financialData.incomeChange >= 0 ? '+' : ''}{financialData.incomeChange}% from last month
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-sm sm:text-base text-gray-600">Total Expenses</span>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
              EGP {financialData.totalExpenses.toLocaleString()}
            </div>
            <div className={`text-sm ${financialData.expenseChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {financialData.expenseChange >= 0 ? '+' : ''}{financialData.expenseChange}% from last month
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-sm sm:text-base text-gray-600">Current Balance</span>
              <ArrowUpRight className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
              EGP {financialData.savings.toLocaleString()}
            </div>
            <div className={`text-sm ${financialData.savingsChange >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {financialData.savingsChange >= 0 ? '+' : ''}{financialData.savingsChange}% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Income vs. Expenses Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <h3 className="text-md sm:text-2xl font-semibold text-gray-900">Income vs. Expenses (Next 6 Months)</h3>
        </div>
        
        {/* Chart */}
        <div className="mb-4 sm:mb-6">
          {chartData.length > 0 ? (
            <div className="flex items-end justify-between h-52 sm:h-64 gap-2 sm:gap-4 px-2 relative">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 min-w-0 relative">
                  <div className="flex items-end gap-1">
                    <div 
                      className="bg-green-500 rounded-t w-4 sm:w-6 relative group cursor-pointer transition-all duration-200 hover:bg-green-600"
                      style={{ height: `${Math.max((data.income / maxValue) * 180, 4)}px` }}
                    >
                      {/* Tooltip for Income */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Income: EGP {data.income.toLocaleString()}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-red-500 rounded-t w-4 sm:w-6 relative group cursor-pointer transition-all duration-200 hover:bg-red-600"
                      style={{ height: `${Math.max((data.expense / maxValue) * 180, 4)}px` }}
                    >
                      {/* Tooltip for Expenses */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Expenses: EGP {data.expense.toLocaleString()}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{data.month}</span>
                  
                  {/* Additional info tooltip for the whole month */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    <div className="bg-purple-600 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="font-semibold">{data.month}</div>
                      <div>Income: EGP {data.income.toLocaleString()}</div>
                      <div>Expenses: EGP {data.expense.toLocaleString()}</div>
                      <div className="border-t border-purple-400 pt-1 mt-1">
                        Net: EGP {(data.income - data.expense).toLocaleString()}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-600"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No data available yet</p>
                <p className="text-sm">Start adding transactions to see your analytics</p>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-base text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-base text-gray-600">Expenses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white mb-22 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 sm:mb-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Calendar className="w-4 h-4 text-purple-600" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {selectedPeriod} Summary
          </h3>
        </div>
        
        <div className="mb-4">
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            You have made <strong>{financialData.filteredTransactions.length}</strong> transactions in this period.
          </p>
          
          {financialData.totalIncome > financialData.totalExpenses ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-green-800 font-medium">
                Great job! You saved EGP {(financialData.totalIncome - financialData.totalExpenses).toLocaleString()} this period.
              </p>
            </div>
          ) : financialData.totalExpenses > financialData.totalIncome ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-800 font-medium">
                You spent EGP {(financialData.totalExpenses - financialData.totalIncome).toLocaleString()} more than you earned this period.
              </p>
            </div>
          ) : null}
        </div>
        
        {categorySpending.length > 0 ? (
          <>
            <h4 className="font-semibold text-gray-900 mb-3">Top Spending Categories:</h4>
            <ul className="space-y-2 mb-4 sm:mb-6">
              {categorySpending.map((category, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-base sm:text-lg text-gray-700 font-medium">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg text-gray-900 font-semibold">
                    EGP {category.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-gray-500 mb-4 sm:mb-6 text-base sm:text-lg text-center py-8">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No spending data available for this period</p>
            <p className="text-sm">Add some transactions to see detailed analytics</p>
          </div>
        )}
        
        <button 
          onClick={downloadPDFSummary}
          className="w-full py-2 sm:py-3 border border-purple-600 bg-purple-600 text-white rounded-lg text-base sm:text-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Summary Report
        </button>
      </div>
    </div>
  );
}