import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/expense";

const STORAGE_KEY = "EXPENSES";

export const saveExpenses = async (expenses: Expense[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Failed to save expenses", error);
  }
};

export const loadExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load expenses", error);
    return [];
  }
};
