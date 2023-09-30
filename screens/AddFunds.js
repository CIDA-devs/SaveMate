import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { app } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const DepositScreen = ({ route }) => {
  const { goal } = route.params;

  const [remainingAmount, setRemainingAmount] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [weeklySavings, setWeeklySavings] = useState(0);
  const [dailySavings, setDailySavings] = useState(0);

  useEffect(() => {
    const fetchAndCalculateSavings = async () => {
      const remainingAmountDocRef = doc(db, "remainingAmounts", goal.id);

      const docSnap = await getDoc(remainingAmountDocRef);
      let remaining;
      if (!docSnap.exists()) {
        // If remaining amount is not stored, calculate and store it
        remaining =
          parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount);
        await setDoc(remainingAmountDocRef, { remaining });
      } else {
        // If remaining amount is stored, retrieve it
        remaining = docSnap.data().remaining;
      }

      setRemainingAmount(remaining);

      const today = new Date();
      const goalDate = new Date(goal.date);

      const totalDays = (goalDate - today) / (1000 * 60 * 60 * 24);
      const totalWeeks = totalDays / 7;
      const totalMonths = totalDays / 30;

      setDailySavings((remaining / totalDays).toFixed(2));
      setWeeklySavings((remaining / totalWeeks).toFixed(2));
      setMonthlySavings((remaining / totalMonths).toFixed(2));
    };

    fetchAndCalculateSavings();
  }, [goal.date, goal.currentAmount, goal.id, goal.targetAmount]);
  const remainingAmounts = (
    parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount)
  ).toFixed(2);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Deposit Details</Text>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.leftColumn]}>
            <Icon name="money" size={24} color="#333" />
            <Text style={styles.label}>Current Amount:</Text>
            <Text style={styles.amountValue}>${goal.currentAmount}</Text>
          </View>
          <View style={[styles.detailContainer, styles.rightColumn]}>
            <Icon name="money" size={24} color="#333" />
            <Text style={styles.label}>Target Amount:</Text>
            <Text style={styles.amountValue}>${goal.targetAmount}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.fullColumn]}>
            <Icon name="exclamation-triangle" size={24} color="#333" />
            <Text style={styles.label}>Remaining Amount:</Text>
            <Text style={styles.amountValue}>${remainingAmounts}</Text>
          </View>
        </View>

        <Text style={styles.toAchieveText}>To Achieve Your Goal</Text>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.leftColumn]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Monthly Savings:</Text>
            <Text style={styles.amountValue2}>${monthlySavings}</Text>
          </View>
          <View style={[styles.detailContainer, styles.rightColumn]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Weekly Savings:</Text>
            <Text style={styles.amountValue2}>${weeklySavings}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={[styles.detailContainer, styles.fullColumn2]}>
            <Icon name="calendar" size={24} color="#333" />
            <Text style={styles.label}>Daily Savings:</Text>
            <Text style={styles.amountValue2}>${dailySavings}</Text>
          </View>
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
    marginTop: 60,
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
  detailContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
    alignItems: "center", // Centering the icons and text
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
