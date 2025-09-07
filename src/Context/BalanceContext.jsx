import React, { createContext, useContext, useEffect, useState } from "react";

export const BalanceContext = createContext();

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return { balance: context.balance, setCustomBalance: context.setCustomBalance };
};

export const useTransactionType = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useTransactionType must be used within a BalanceProvider');
    }
    return { type: context.type, setType: context.setType };
};

// إضافة hook جديد للـ transactions
export const useTransactions = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useTransactions must be used within a BalanceProvider');
    }
    return { transactions: context.transactions, addTransaction: context.addTransaction, removeTransaction: context.removeTransaction };
};

export default function BalanceProvider(props) {
    // حفظ الـ balance في localStorage
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem("balance");
        return saved != null && !isNaN(saved) ? Number(saved) : 0;
    });

    // حفظ الـ type في localStorage
    const [type, setType] = useState(() => {
        const saved = localStorage.getItem("transactionType");
        return saved ? saved : "income";
    });

    // حفظ الـ transactions في localStorage
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    // حفظ الـ balance في localStorage عند تغييره
    useEffect(() => {
        localStorage.setItem("balance", balance);
    }, [balance]);

    // حفظ الـ type في localStorage عند تغييره
    useEffect(() => {
        localStorage.setItem("transactionType", type);
    }, [type]);

    // حفظ الـ transactions في localStorage عند تغييرها
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const setCustomBalance = (amount) => setBalance(Number(amount) || 0);

    // إضافة transaction جديدة
    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: Date.now(), // ID بسيط باستخدام timestamp
            date: transaction.date || new Date().toLocaleDateString('en-CA')
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    // حذف transaction
    const removeTransaction = (id) => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };

    return (
        <BalanceContext.Provider value={{
            balance,
            setCustomBalance,
            type,
            setType,
            transactions,
            addTransaction,
            removeTransaction
        }}>
            {props.children}
        </BalanceContext.Provider>
    );
}