import { useState } from "react";
import { Alert } from "react-native";
Alert.alert("Login Failed", "Email or password is incorrect.", [
  { text: "Try Again", style: "default" },
  { text: "Cancel", style: "cancel" },
]);

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { COLORS } from "../theme/colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const submit = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (e: any) {
      Alert.alert("Login Failed", "Email or password is incorrect.", [
        {
          text: "Try Again",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
          style: "default",
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cool Header */}
      <View style={[styles.header, { backgroundColor: COLORS.accent }]}>
        <Text style={styles.headerText}>
          {isLogin ? "Welcome Back!" : "Create Account"}
        </Text>
        <Text style={styles.headerSubtitle}>
          {isLogin
            ? "Login to track your expenses"
            : "Sign up to start managing your money"}
        </Text>
      </View>

      {/* Form Inputs */}
      <TextInput
        value={email}
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        placeholder="Password"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Action Button */}
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      {/* Toggle Login/Sign-Up */}
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create account" : "Already have an account?"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#e0f7ea", // lighter green accent for subtitle
    fontSize: 16,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    color: COLORS.danger,
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
});
