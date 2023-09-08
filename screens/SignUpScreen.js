import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      sendEmailVerification(userCredential.user);

      navigation.navigate("Verify");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("Email already exists. Log in instead.");
          break;
        default:
          Alert.alert("Error", error.message);
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SaveMate</Text>
      <Image
        source={require("../assets/sign.png")} // Replace with your image path
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
      <TouchableOpacity style={styles.customButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>
          <Text style={styles.logintext}>Already have an account? </Text>
          <Text style={styles.linkButtonText}>Log In</Text>
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
    color: "#fff",
  },
  title: {
    marginTop: -40,
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 30,
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

export default SignUpScreen;
