import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ExpenseProvider } from "./src/Context/ExpenseContext";
import HomeScreen from "./src/screens/HomeScreen";
import { AuthProvider } from "./src/Context/AuthContext";

import { useAuth } from "./src/Context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <SafeAreaView style={styles.container}>
          <HomeScreen />
        </SafeAreaView>
      </ExpenseProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
