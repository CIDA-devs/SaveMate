import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AIChatButton = () => {
  const navigation = useNavigation();

  const navigateToFinancialAssistant = () => {
    navigation.navigate("FinancialAI");
  };

  return (
    <TouchableOpacity
      onPress={navigateToFinancialAssistant}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Icon name="calculator" size={40} color="#075985" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Expenses Calculator</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 10,
    borderRadius: 10,
    margin: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#075985",
    fontWeight: "bold",
  },
});

export default AIChatButton;
