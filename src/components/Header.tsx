import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JeebMaster</Text>
      <Text style={styles.subtitle}>Track your expenses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
