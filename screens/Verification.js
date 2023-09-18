import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAuth, reload } from "firebase/auth";

const VerificationScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const interval = setInterval(() => {
      // Reload user to get updated emailVerified status
      reload(user).then(() => {
        if (user.emailVerified) {
          clearInterval(interval); // Clear interval once email is verified
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/verify.png")} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.input}>
        Please verify your email address. Check your inbox
      </Text>
      <Text style={styles.input}>You will be redirected automatically </Text>
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
  input: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
});

export default VerificationScreen;
