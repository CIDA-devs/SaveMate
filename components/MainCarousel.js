import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Carousel from "./Carousel";

const App = () => {
  const data = [
    { imageSource: require("../assets/give.jpg") }, // Replace with your image sources
    { imageSource: require("../assets/games.jpg") },
    { imageSource: require("../assets/laptop.jpg") },
    // Add more items as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Carousel data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
