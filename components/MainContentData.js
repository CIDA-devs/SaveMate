import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import Frontdata from "./Frontdata";

import { useNavigation } from "@react-navigation/native";

import { FlatList } from "react-native-gesture-handler";
import SavingsComponent from "./SavingsComponent";

const MainContentData = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  const [autoScroll, setAutoScroll] = useState(true);
  const flatListRef = React.createRef();
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/PoppinsFont/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const data = [
    { imageSource: require("../assets/give.jpg") },
    { imageSource: require("../assets/games.jpg") },
    { imageSource: require("../assets/laptop.jpg") },
    { imageSource: require("../assets/give.jpg") },
    { imageSource: require("../assets/games.jpg") },
    { imageSource: require("../assets/laptop.jpg") },
  ];

  const handleScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / windowWidth);

    setCurrentIndex(index);
  };

  const isLoading = false;
  const error = false;

  const handleAddGoalPress = () => {
    navigation.navigate("GoalScreen");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF2D8",
      }}
    >
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
          <SavingsComponent />
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Make a dream purchase a reality
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            ></View>

            <View>
              {isLoading ? (
                <ActivityIndicator size="large" />
              ) : error ? (
                <Text>Something went wrong</Text>
              ) : (
                <FlatList
                  ref={flatListRef}
                  data={data}
                  horizontal
                  contentContainerStyle={{ columnGap: 8 }}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setAutoScroll(!autoScroll)}
                      activeOpacity={1}
                      style={styles.page}
                    >
                      <Image source={item.imageSource} style={styles.image} />
                    </TouchableOpacity>
                  )}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                />
              )}
            </View>
          </View>

          <View style={styles.headertop}>
            <Text style={styles.heading}>
              Get solid financial assistance with SaveMate
            </Text>
          </View>
          <Frontdata />

          <View style={styles.marginbottom}></View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addGoalButton}
        onPress={handleAddGoalPress}
      >
        <Text style={styles.addGoalButtonText}>Add Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 200,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  progressBox: {
    width: 185,
    height: 187,
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 7,
  },

  topic: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },

  coloredText: {
    color: "#F7F3A6",
  },

  detailsBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    padding: 30,
    marginBottom: 20,
  },

  title: {
    color: "grey",
    fontSize: 16,
  },

  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btn_div: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
  },

  deposit: {
    width: "45%",
    borderRadius: 16,
    backgroundColor: "dodgerblue",
    paddingVertical: 16,
    paddingHorizontal: 25,
    color: "white",
  },

  withdraw: {
    width: "45%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "dodgerblue",
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  deposit_text: {
    color: "white",
    textAlign: "center",
  },

  withdraw_text: {
    color: "black",
    textAlign: "center",
  },

  wrapper: {
    alignSelf: "center",
    borderTopLeftRadius: 10,
    marginBottom: -80,
  },

  text: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "dodgerblue",
    marginTop: 15,
  },

  goaltext: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "dodgerblue",
    marginTop: 15,
  },

  challenges: {
    width: "100%",
    height: 244,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  goal: {
    width: 500,
    height: 244,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  subText: {
    fontSize: 16,
    fontWeight: "light",
    color: "#fff",
    marginBottom: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },
  headertop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 30,
  },
  heading2: {
    fontSize: 15,
    fontWeight: "normal",
    marginVertical: 20,
  },

  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  goalCard: {
    width: "48%",
    backgroundColor: "#fff",

    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  goalDescription: {
    fontSize: 14,
    color: "gray",
  },

  goalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  addGoalButton: {
    position: "absolute",
    bottom: 20,
    left: "50%", // Center the button horizontally
    transform: [{ translateX: -50 }], // Center the button horizontally
    backgroundColor: "black",
    shadowRadius: 10,
    shadowColor: "black",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 25,
    elevation: 3,
  },

  addGoalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  marginbottom: {
    paddingBottom: 100,
  },
});

export default MainContentData;
