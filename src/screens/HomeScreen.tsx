import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import ExpenseItem from "../components/ExpenseItem";
import AddExpenseScreen from "./AddExpenseScreen";
import { useExpenses } from "../Context/ExpenseContext";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import MonthlySummary from "../components/MonthlySummary";

export default function HomeScreen() {
  const { expenses } = useExpenses();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <MonthlySummary expenses={expenses} />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowAdd(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showAdd} animationType="slide">
        <AddExpenseScreen onClose={() => setShowAdd(false)} />
      </Modal>
    </View>
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
});
