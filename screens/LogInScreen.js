import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogin = () => {
    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          navigation.replace("Home");
        } else {
          setEmailError("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            setPasswordError("The password is incorrect. Please try again.");
            break;
          case "auth/user-not-found":
            setEmailError(
              "There's no account associated with this email. Please sign up."
            );
            break;
          default:
            setEmailError(error.message);
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SaveMate</Text>
      <Image
        source={require("../assets/log.png")} // Replace with your image path
        style={styles.image}
      />

      <Text style={styles.inputext}>Enter Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.inputext}>Enter Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>
          <Text style={styles.logintext}>Don't have an account? </Text>
          <Text style={styles.linkButtonText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#8A8AF9",
  },
  title: {
    marginTop: -40,
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 5,
    marginBottom: 20,
  },
  inputext: {
    marginBottom: 10,
    width: "100%",
    color: "#fff",
    fontWeight: "300",
  },
  customButton: {
    backgroundColor: "#0173FA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  logintext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "300",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
