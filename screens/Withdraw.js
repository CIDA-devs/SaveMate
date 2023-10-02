import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Paystack } from "react-native-paystack-webview";
import firebase from "../firebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase);

const WithdrawScreen = ({ route }) => {
  const { targetAmount, goalId } = route.params;
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigation = useNavigation();
  const paystackWebViewRef = useRef();

  const handleSuccess = async (res) => {
    setIsUpdating(true);
    try {
      const docRef = doc(db, "SaveMate", goalId);
      await updateDoc(docRef, {
        targetAmount: parseFloat(0),
      });
      setIsUpdating(false);
      navigation.navigate("All Goals");
    } catch (error) {
      console.error("Error updating Firestore: ", error);
      setIsUpdating(false);
    }
  };

  const handleWithdraw = () => {
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
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#fff"
      />
      <Paystack
        paystackKey="pk_test_0edda270529c6a7b50ef15242ef7c4d46bb17909"
        billingEmail={email}
        amount={targetAmount}
        currency="GHS"
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        onSuccess={handleSuccess}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity
        style={styles.fundButton}
        onPress={handleWithdraw}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Withdraw</Text>
        )}
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

export default WithdrawScreen;
