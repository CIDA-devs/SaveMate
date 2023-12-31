// src/screens/PaystackPaymentScreen.js
import React, { useEffect, useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import "../global";

const PaystackPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalId, amount, email, isDeposit } = route.params;
  const paystackWebViewRef = useRef();

  useEffect(() => {
    paystackWebViewRef.current.startTransaction();
  }, []);

  const handleSuccess = (res) => {
    updateFirestoreWithDepositAmount(amount);
    navigation.navigate("Home");
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Paystack
        paystackKey="pk_test_0edda270529c6a7b50ef15242ef7c4d46bb17909"
        billingEmail={email}
        amount={amount}
        currency="GHS"
        onCancel={handleCancel}
        onSuccess={handleSuccess}
        ref={paystackWebViewRef}
      />
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
  },
});

export default PaystackPaymentScreen;
