import React, { createContext, useContext, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { loadExpenses, saveExpenses } from "../storage/expenseStorage";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses().then(setExpenses);
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };
  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpenses must be used inside ExpenseProvider");
  return context;
};
