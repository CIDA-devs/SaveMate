import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./screens/SignUpScreen";
import VerificationScreen from "./screens/Verification";
import HomeScreen from "./screens/HomeScreen";
import CreateAccount from "./screens/CreateAccount";
import LoginScreen from "./screens/LogInScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
