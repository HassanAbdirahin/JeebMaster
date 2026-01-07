import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../types/expense";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { formatNumberWithCommas } from "../utils/commaFormat";

type Props = {
  expenses: Expense[];
};

export default function MonthlySummary({ expenses }: Props) {
  // sum all amounts
  const monthlyTotal = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>This Month</Text>
      <Text style={styles.amount}>
        -${formatNumberWithCommas(Math.abs(Number(monthlyTotal.toFixed(2))))}
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
