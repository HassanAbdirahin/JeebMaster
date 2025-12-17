import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryPill({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    height: 32,
  },
  selected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});
