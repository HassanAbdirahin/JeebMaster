import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { Expense } from "../types/expense";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { useExpenses } from "../Context/ExpenseContext";
import { formatNumberWithCommas } from "../utils/commaFormat";

type Props = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
  const { deleteExpense } = useExpenses();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteExpense(expense.id),
        },
      ]
    );
  };

  return (
    <Pressable onLongPress={confirmDelete}>
      <View style={styles.container}>
        <View>
          <Text style={styles.category}>{expense.category}</Text>
          {expense.note && <Text style={styles.note}>{expense.note}</Text>}
        </View>

        <Text style={styles.amount}>
          -${formatNumberWithCommas(Number(expense.amount.toFixed(2)))}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  note: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.danger,
  },
});
