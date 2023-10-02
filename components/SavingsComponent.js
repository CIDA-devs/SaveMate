import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import firebase from "../firebaseConfig";
import { FontAwesome5 } from "@expo/vector-icons";

const db = getFirestore(firebase);

const SavingsComponent = () => {
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, "transactions", "transaction");

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setAmount(doc.data().amount);
        setIsLoading(false);
      } else {
        console.log("No such document!");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.detailsBox}>
      <Text style={styles.title}>Savings Balance</Text>
      <Text style={styles.amount}>GH₵{amount}</Text>
      <View style={styles.btn_div}>
        <TouchableOpacity
          style={styles.deposit}
          onPress={() =>
            navigation.navigate("DepositScreen", { goalId: "transactions" })
          }
        >
          <FontAwesome5
            name="arrow-down"
            size={24}
            color="white"
            style={styles.icon}
          />

          <Text style={styles.deposit_text}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    padding: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF2D8",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  btn_div: {
    marginTop: 20,
    alignItems: "center",
  },
  deposit: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#000",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  deposit_text: {
    color: "white",
    fontSize: 18,
  },
});

export default SavingsComponent;
