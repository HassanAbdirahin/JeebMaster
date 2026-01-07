import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { generateId } from "../utils/generateId";
import { useExpenses } from "../Context/ExpenseContext";
import { ScrollView } from "react-native";
import { CATEGORIES } from "../utils/categories";
import CategoryPill from "../components/CategoryPill";

type Props = {
  onClose: () => void;
};

export default function AddExpenseScreen({ onClose }: Props) {
  const { addExpense } = useExpenses();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return;
    }

    if (!category) {
      Alert.alert("Validation Error", "Please choose a category.");
      return;
    }

    addExpense({
      amount: Number(amount),
      category,
      note,
      date: new Date().toISOString(),
    });
    console.log("Adding expense:", addExpense);

    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          // allow digits and optional decimal
          const cleaned = text.replace(/[^0-9.]/g, "");
          setAmount(cleaned);
        }}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Category</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((item) => (
          <CategoryPill
            key={item}
            label={item}
            selected={category === item}
            onPress={() => setCategory(item)}
          />
        ))}
      </ScrollView>

      <TextInput
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancel: {
    textAlign: "center",
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    color: COLORS.textSecondary,
  },
});
