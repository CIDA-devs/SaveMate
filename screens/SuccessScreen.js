import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("All Goals");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require("../assets/anime.gif")} style={styles.animation} />
      <Text style={styles.text}>
        Money successfully added to your goal. Keep saving!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ecc71",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    margin: 20,
    color: "#ffffff",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default SuccessScreen;
