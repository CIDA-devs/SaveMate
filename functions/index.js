/* eslint-disable indent */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();

// Create transporter using your email service info
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // Update with your email
    pass: "", // Update with your password
  },
});

exports.sendVerificationCode = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const email = snap.data().email;
    const code = snap.data().verificationCode;

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", data);
      }
    });
  });
