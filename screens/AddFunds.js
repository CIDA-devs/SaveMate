import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { app } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { fundGoal } from "../slices/goalsSlice";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const db = getFirestore(app);

const DepositScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { goal } = route.params;

  const [inputAmount, setInputAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [weeklySavings, setWeeklySavings] = useState(0);
  const [dailySavings, setDailySavings] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [initialRemainingAmount, setInitialRemainingAmount] = useState(0);
  const [actualRemainingAmount, setActualRemainingAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAndCalculateSavings = async () => {
    setIsLoading(true);
    try {
      const remainingAmountRef = doc(db, "remainingAmounts", goal.id);
      const remainingAmountDoc = await getDoc(remainingAmountRef);
      let initialRemaining;
      if (
        remainingAmountDoc.exists() &&
        remainingAmountDoc.data().initialRemainingAmount
      ) {
        initialRemaining = parseFloat(
          remainingAmountDoc.data().initialRemainingAmount
        );
      } else {
        console.log("Calculating initial remaining amount!");
        initialRemaining =
          parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount);
        await setDoc(remainingAmountRef, {
          initialRemainingAmount: initialRemaining,
        });
      }
      setInitialRemainingAmount(initialRemaining);

      const actualRemaining =
        parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount);
      setActualRemainingAmount(actualRemaining);

      const today = new Date();
      const goalDate = new Date(goal.date);

      const totalDays = (goalDate - today) / (1000 * 60 * 60 * 24);
      const totalWeeks = totalDays / 7;
      const totalMonths = totalDays / 30;

      setDailySavings((initialRemaining / totalDays).toFixed(2));
      setWeeklySavings((initialRemaining / totalWeeks).toFixed(2));
      setMonthlySavings((initialRemaining / totalMonths).toFixed(2));
    } catch (error) {
      console.error("Error fetching and calculating savings: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndCalculateSavings();
  }, [goal.date, goal.currentAmount, goal.id, goal.targetAmount]);

  const handleFundGoal = async () => {
    const parsedInputAmount = parseFloat(inputAmount);
    if (isNaN(parsedInputAmount) || parsedInputAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (parsedInputAmount > actualRemainingAmount) {
      setErrorMessage("Amount exceeds the goal remaining amount.");
      return;
    }
    setIsSubmitting(true);

    try {
      const transactionRef = doc(db, "transactions", "transaction");
      const transactionDoc = await getDoc(transactionRef);
      if (transactionDoc.exists()) {
        const firebaseAmount = parseFloat(transactionDoc.data().amount);
        if (parsedInputAmount > firebaseAmount) {
          setErrorMessage("Insufficient funds, add funds.");
          return;
        }

        await updateDoc(transactionRef, {
          amount: increment(-parsedInputAmount),
        });

        const goalRef = doc(db, "SaveMate", goal.id);
        const currentAmount =
          parseFloat(goal.currentAmount) + parsedInputAmount;
        await updateDoc(goalRef, {
          currentAmount: currentAmount,
        });

        const remainingAmountRef = doc(db, "remainingAmounts", goal.id);
        await updateDoc(remainingAmountRef, {
          remaining: increment(-parsedInputAmount),
        });

        setSuccessMessage("Money added successfully");

        navigation.navigate("Success");
      } else {
        console.log("No such document in transactions!");
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container1}>
      <View style={styles.container}>
        <Text style={styles.header}>Goal Details</Text>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.leftColumn]}>
            <Icon name="money" size={24} color="#333" />
            <Text style={styles.label}>Current Amount:</Text>
            <Text style={styles.amountValue}>₵{goal.currentAmount}</Text>
          </View>
          <View style={[styles.detailContainer, styles.rightColumn]}>
            <Icon name="money" size={24} color="#333" />
            <Text style={styles.label}>Target Amount:</Text>
            <Text style={styles.amountValue}>₵{goal.targetAmount}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.fullColumn]}>
            <Icon name="exclamation-triangle" size={24} color="#333" />
            <Text style={styles.label}>Initial Remaining Amount:</Text>
            <Text style={styles.amountValue}>
              ₵{initialRemainingAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.fullColumn]}>
            <Icon name="exclamation-triangle" size={24} color="#333" />
            <Text style={styles.label}>Actual Remaining Amount:</Text>
            <Text style={styles.amountValue}>
              ₵{actualRemainingAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.toAchieveText}>To Achieve This Goal</Text>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.leftColumn]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Monthly Savings:</Text>
            <Text style={styles.amountValue2}>₵{monthlySavings}</Text>
          </View>
          <View style={[styles.detailContainer, styles.rightColumn]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Weekly Savings:</Text>
            <Text style={styles.amountValue2}>₵{weeklySavings}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.fullColumn2]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Daily Savings:</Text>
            <Text style={styles.amountValue2}>₵{dailySavings}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Amount to fund"
            value={inputAmount}
            onChangeText={setInputAmount}
            keyboardType="numeric"
          />
        </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        {successMessage && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.fundButton}
            onPress={handleFundGoal}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Fund Goal</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  container1: {
    flex: 1,

    backgroundColor: "#f0f0f0",
    marginTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  fundButton: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inputContainer: {
    marginVertical: 10,
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
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
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  leftColumn: {
    backgroundColor: "#a8dadc",
    marginRight: 5,
  },
  rightColumn: {
    backgroundColor: "#a8dadc",
    marginLeft: 5,
  },
  fullColumn: {
    backgroundColor: "#f4a261",
  },
  fullColumn2: {
    backgroundColor: "#a8dadc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  amountValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  amountValue2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  toAchieveText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
});

export default DepositScreen;
