import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ExpenseProvider } from "./src/Context/ExpenseContext";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <ExpenseProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
