import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MyBottomTabs } from "../components/PagesNavigator";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF2D8" }}>
      <MyBottomTabs />
      <Button color="black" title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
