import { useState } from "react";
import { Alert } from "react-native";
import { useRef, useEffect } from "react";
import { Animated } from "react-native";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
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

  //   smooth animation for the login screen
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLogin]);

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
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* add image of logo */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
      </Animated.View>

      {/* Cool Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
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
      </Animated.View>

      {/* Form Inputs */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
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
      </Animated.View>
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
