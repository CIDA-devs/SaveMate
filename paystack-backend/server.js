// // src/screens/PaymentScreen.js
// import React from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import { WebView } from "react-native-webview";
// import { useNavigation } from "@react-navigation/native";

// const PaymentScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { authorization_url } = route.params;

//   const handleWebViewNavigationStateChange = (newNavState) => {
//     const { url } = newNavState;
//     if (!url) return;

//     // handle certain doctypes
//     if (url.includes(".pdf")) {
//       navigation.goBack();
//       return;
//     }

//     // one way to handle a successful form submit
//     if (url.includes("/success")) {
//       navigation.navigate("SuccessScreen");
//     }

//     // one way to handle a failed form submit
//     if (url.includes("/failure")) {
//       navigation.goBack();
//       Alert.alert("Payment failed", "Please try again or contact support.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: authorization_url }}
//         onNavigationStateChange={handleWebViewNavigationStateChange}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default PaymentScreen;
