import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import ExpenseItem from "../components/ExpenseItem";
import AddExpenseScreen from "./AddExpenseScreen";
import { useExpenses } from "../Context/ExpenseContext";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import MonthlySummary from "../components/MonthlySummary";

import { ActivityIndicator } from "react-native";
import { useAuth } from "../Context/AuthContext";
import LoginScreen from "./LoginScreen";
import ExpenseList from "../components/ExpenseItem";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Button } from "react-native";
import { ExpenseProvider } from "../Context/ExpenseContext";
import { AuthProvider } from "../Context/AuthContext";

export default function HomeScreen() {
  const { expenses } = useExpenses();
  const [showAdd, setShowAdd] = useState(false);

  const { user, loading } = useAuth();

  if (loading) return <ActivityIndicator />;

  if (!user) return <LoginScreen />;
  console.log("Expenses:", JSON.stringify(expenses, null, 2));

  return (
    <AuthProvider>
      <ExpenseProvider>
        <View style={styles.container}>
          <Header />
          <TouchableOpacity style={styles.button} onPress={() => signOut(auth)}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <MonthlySummary expenses={expenses} />
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseItem expense={item} />}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.textSecondary,
                  alignItems: "center",
                  marginTop: SPACING.xl,
                }}
              >
                No expenses yet
              </Text>
            }
          />

          <TouchableOpacity style={styles.fab} onPress={() => setShowAdd(true)}>
            <Text style={styles.fabText}>＋</Text>
          </TouchableOpacity>

          <Modal visible={showAdd} animationType="slide">
            <AddExpenseScreen onClose={() => setShowAdd(false)} />
          </Modal>
        </View>
      </ExpenseProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.lg,
  },
  emptyText: {
    textAlign: "center",
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
  fab: {
    position: "absolute",
    right: SPACING.lg,
    bottom: SPACING.lg,
    backgroundColor: COLORS.accent,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  button: {
    backgroundColor: COLORS.accent,
    alignItems: "center",
    padding: SPACING.sm,
    borderRadius: 8,
    margin: SPACING.md,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
