import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../types/expense";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { formatNumberWithCommas } from "../utils/commaFormat";

type Props = {
  expenses: Expense[];
};

export default function MonthlySummary({ expenses }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTotal = expenses
    .filter((exp) => {
      const date = new Date(exp.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>This Month</Text>
      <Text style={styles.amount}>
        ${formatNumberWithCommas(Number(monthlyTotal.toFixed(2)))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  amount: {
    marginTop: SPACING.sm,
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
});
