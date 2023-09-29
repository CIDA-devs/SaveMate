import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import firebase from "../firebaseConfig"; // Adjust the import to your Firebase config file

const db = getFirestore(firebase);

const SavingsComponent = () => {
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation(); // This is used to navigate to the DepositScreen

  useEffect(() => {
    // Get a reference to the document
    const docRef = doc(db, "transactions", "transaction");

    // Set up a listener to the document with onSnapshot
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setAmount(doc.data().amount);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array means this useEffect runs once, similar to componentDidMount

  return (
    <View style={styles.detailsBox}>
      <Text style={styles.title}>Savings Balance</Text>
      <Text style={styles.amount}>GH₵ {amount}.00</Text>
      <View style={styles.btn_div}>
        <TouchableOpacity
          style={styles.deposit}
          onPress={() =>
            navigation.navigate("DepositScreen", { goalId: "transactions" })
          }
        >
          <Text style={styles.deposit_text}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.withdraw}
          // onPress for withdrawal can be updated once you have a screen or logic for it
        >
          <Text style={styles.withdraw_text}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... rest of your code including styles and export statement

const styles = StyleSheet.create({
  detailsBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    padding: 30,
    marginBottom: 20,
  },
  title: {
    color: "grey",
    fontSize: 16,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btn_div: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row", // Use flexDirection to horizontally align the buttons
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50, // Specify a height for the container
  },
  deposit: {
    width: "45%", // Adjust the width as needed
    borderRadius: 16,
    backgroundColor: "dodgerblue",
    paddingVertical: 16,
    paddingHorizontal: 25,
    color: "white",
  },
  withdraw: {
    width: "45%", // Adjust the width as needed
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "dodgerblue",
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  deposit_text: {
    color: "white",
    textAlign: "center",
  },
  withdraw_text: {
    color: "black",
    textAlign: "center",
  },
  // ... Rest of your styles
});

export default SavingsComponent;
