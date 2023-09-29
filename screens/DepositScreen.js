import React, { useState, useRef } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Paystack } from "react-native-paystack-webview";
import firebase from "../firebaseConfig"; // Adjust this import to your file structure
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { increment } from "firebase/firestore"; // Import increment from firebase/firestore

const db = getFirestore(firebase); // Initialize Firestore with your Firebase configuration

const DepositScreen = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const paystackWebViewRef = useRef();

  const handleSuccess = async (res) => {
    // On successful payment, update the Firestore database
    try {
      const docRef = doc(db, "transactions", "transaction"); // Adjust to your collection and document ID
      await setDoc(
        docRef,
        {
          amount: increment(parseFloat(amount)), // Use increment directly
        },
        { merge: true }
      ); // Use the { merge: true } option to create the document if it doesn't exist
      navigation.navigate("Home"); // Navigate back to SavingsComponent
    } catch (error) {
      console.error("Error updating Firestore: ", error);
    }
  };

  const handleDeposit = () => {
    paystackWebViewRef.current.startTransaction();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount to deposit"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Paystack
        paystackKey="pk_test_0edda270529c6a7b50ef15242ef7c4d46bb17909"
        billingEmail={email}
        amount={amount}
        currency="GHS"
        onSuccess={handleSuccess} // Set the onSuccess callback to update Firestore
        ref={paystackWebViewRef}
      />
      <Button title="Pay Now" onPress={handleDeposit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default DepositScreen;
