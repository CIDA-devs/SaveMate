import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CreateAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SaveMate</Text>
      <Image source={require("../assets/create.png")} style={styles.image} />
      <Text style={styles.subtitle}>Save today, Save your future</Text>
      <Text style={styles.description}>
        Save money with us and purchase that dream item.{"\n"}
        Empowering your financial future, one smart save at a time.
      </Text>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>
          {" "}
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
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
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
    textDecorationLine: "none",
    fontSize: 13,
    fontWeight: "300",
  },
});

export default CreateAccount;
