import {
  collection,
  addDoc,
  getDocs,
  DocumentReference,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Expense } from "../types/expense";

// Add an expense for a specific user and return the doc reference
export const addExpense = async (
  userId: string,
  expense: Omit<Expense, "id">
): Promise<DocumentReference> => {
  const docRef = await addDoc(
    collection(db, "users", userId, "expenses"),
    expense
  );
  return docRef;
};

// Get all expenses for a specific user
export const getExpenses = async (userId: string): Promise<Expense[]> => {
  const snapshot = await getDocs(collection(db, "users", userId, "expenses"));

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Expense, "id">;
    return {
      id: doc.id,
      amount: data.amount,
      category: data.category,
      note: data.note,
    } as Expense;
  });
};

//delete expense from Firestore
export const deleteExpenseFromDB = async (
  userId: string,
  expenseId: string
) => {
  const docRef = doc(db, "users", userId, "expenses", expenseId);
  await deleteDoc(docRef);
};

export const subscribeToExpenses = (
  userId: string,
  callback: (expenses: Expense[]) => void
) => {
  const q = query(collection(db, "users", userId, "expenses"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const expenses = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Expense, "id">;
      return {
        id: doc.id,
        ...data,
      } as Expense;
    });
    callback(expenses);
  });

  return unsubscribe; // call this to stop listening
};
