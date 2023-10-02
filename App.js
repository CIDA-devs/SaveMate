import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./screens/SignUpScreen";
import VerificationScreen from "./screens/Verification";
import HomeScreen from "./screens/HomeScreen";
import CreateAccount from "./screens/CreateAccount";
import LoginScreen from "./screens/LogInScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import store from "./store";
import AddFunds from "./screens/AddFunds";
import PaymentScreen from "./screens/PaymentScreen";
import DepositScreen from "./screens/DepositScreen";
import GoalDetails from "./screens/GoalDetails";

import SuccessScreen from "./screens/SuccessScreen";
import AddGoal from "./screens/AddGoal";
import Withdraw from "./screens/Withdraw";
import FinancialAI from "./screens/FinancialAI";

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [reloadCheck, setReloadCheck] = useState(false); // New state to trigger a re-render
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (initializing) {
          setInitializing(false);
        }
      } else {
        setUser(null);
        if (initializing) {
          setInitializing(false);
        }
      }
    });

    return unsubscribe;
  }, [auth, initializing]);

  useEffect(() => {
    const interval = setInterval(() => {
      // This will toggle between true/false every 5 seconds and force a re-render
      setReloadCheck((prev) => !prev);
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <>
              <Stack.Screen
                name="Create"
                options={{ headerShown: false }}
                component={CreateAccount}
              />
              <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
            </>
          ) : user && !user.emailVerified ? (
            <Stack.Screen
              name="Verify"
              options={{ headerShown: false }}
              component={VerificationScreen}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeScreen}
              />

              <Stack.Screen
                name="AddFunds"
                options={{ headerShown: false }}
                component={AddFunds}
              />
              <Stack.Screen
                name="PaymentScreen"
                options={{ headerShown: false }}
                component={PaymentScreen}
              />
              <Stack.Screen
                name="DepositScreen"
                options={{ headerShown: false }}
                component={DepositScreen}
              />
              <Stack.Screen
                name="GoalDetails"
                options={{ headerShown: false }}
                component={GoalDetails}
              />
              <Stack.Screen
                name="Success"
                options={{ headerShown: false }}
                component={SuccessScreen}
              />
              <Stack.Screen
                name="GoalScreen"
                options={{ headerShown: false }}
                component={AddGoal}
              />
              <Stack.Screen
                name="Withdraw"
                options={{ headerShown: false }}
                component={Withdraw}
              />
              <Stack.Screen
                name="FinancialAI"
                options={{ headerShown: false }}
                component={FinancialAI}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
