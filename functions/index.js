/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// eslint-disable-next-line max-len
exports.verifyPaystackTransaction = functions.https.onRequest(
  async (req, res) => {
    // eslint-disable-next-line object-curly-spacing
    const { reference } = req.body;
    const paystackSecretKey = "your-paystack-secret-key-here";
    try {
      // Verify transaction with Paystack
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`,
          },
          // eslint-disable-next-line comma-dangle
        }
      );
      const { data } = response.data;

      if (data.status === "success") {
        const userId = data.metadata.user_id;
        const amount = data.amount / 100;

        const userRef = admin.firestore().collection("users").doc(userId);
        await userRef.update({
          balance: admin.firestore.FieldValue.increment(amount),
        });

        // Record transaction in Firestore
        await admin.firestore().collection("transactions").add({
          userId,
          amount,
          type: "deposit",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).send("Transaction verified successfully");
      } else {
        res.status(400).send("Transaction verification failed");
      }
    } catch (error) {
      console.error("Error verifying transaction:", error);
      res.status(500).send("Server error");
    }
  }
);

// functions/index.js (continuation)

exports.processWithdrawal = functions.https.onRequest(async (req, res) => {
  // eslint-disable-next-line object-curly-spacing
  const { userId, amount } = req.body;

  try {
    const userRef = admin.firestore().collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userBalance = userDoc.data().balance;

      if (amount <= userBalance) {
        // Deduct amount from user's balance
        await userRef.update({
          balance: admin.firestore.FieldValue.increment(-amount),
        });

        // Record transaction in Firestore
        await admin.firestore().collection("transactions").add({
          userId,
          amount,
          type: "withdrawal",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).send("Withdrawal processed successfully");
      } else {
        res.status(400).send("Insufficient balance");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    res.status(500).send("Server error");
  }
});
