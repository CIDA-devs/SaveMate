import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Paystack } from "react-native-paystack-webview";
import firebase from "../firebaseConfig";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";

const db = getFirestore(firebase);

const DepositScreen = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const paystackWebViewRef = useRef();

  const handleSuccess = async (res) => {
    try {
      const docRef = doc(db, "transactions", "transaction");
      await setDoc(
        docRef,
        {
          amount: increment(parseFloat(amount)),
        },
        { merge: true }
      );
      navigation.navigate("Home");
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
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount to deposit"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor="#fff"
      />
      <Paystack
        paystackKey="pk_test_0edda270529c6a7b50ef15242ef7c4d46bb17909"
        billingEmail={email}
        amount={amount}
        currency="GHS"
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        onSuccess={handleSuccess}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity style={styles.fundButton} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Add Funds</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4a261",
  },
  input: {
    height: 50,
    borderColor: "#2a9d8f",
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 20,
    borderRadius: 10,
    color: "#2a9d8f",
    fontSize: 18,
  },
  fundButton: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DepositScreen;
