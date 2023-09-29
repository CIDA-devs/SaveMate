import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { PagesNavigator, MyBottomTabs } from "../components/PagesNavigator";
import Home from "../components/MainContentData";
import Notifications from "../components/Notifications";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Successfully logged out
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <PagesNavigator/> */}
      <MyBottomTabs />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
