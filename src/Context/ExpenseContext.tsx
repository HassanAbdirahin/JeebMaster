import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getExpenses,
  addExpense as addExpenseToDB,
  deleteExpenseFromDB,
} from "../storage/expenseStorage";
import { useAuth } from "./AuthContext";
import { Expense } from "../types/expense";
import { subscribeToExpenses } from "../storage/expenseStorage";

interface ExpenseContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  loading: boolean;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // subscribe to live updates
    const unsubscribe = subscribeToExpenses(user.uid, (data) => {
      setExpenses(data); // automatically updates state
      setLoading(false);
    });

    // cleanup subscription when component unmounts or user changes
    return () => unsubscribe();
  }, [user]);

  // Add expense
  const addExpense = async (expense: Omit<Expense, "id">) => {
    if (!user) return;
    try {
      const docRef = await addExpenseToDB(user.uid, expense); // store in Firestore
      setExpenses((prev) => [...prev, { id: docRef.id, ...expense }]);
      // update local state
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };
  //delete expense
  const deleteExpense = async (id: string) => {
    if (!user) return;
    try {
      await deleteExpenseFromDB(user.uid, id); // remove from Firestore
      setExpenses((prev) => prev.filter((exp) => exp.id !== id)); // remove from local state
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, setExpenses, loading, addExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpenses must be used within an ExpenseProvider");
  return context;
};
