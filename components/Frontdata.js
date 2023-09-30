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
import React from "react";

const goalsData = [
  {
    id: "1",
    title: "Dream Vacation",
    description: "A trip to Hawaii",
    targetAmount: 5000,
    currentAmount: 2000,
  },
  {
    id: "2",
    title: "Gaming Console",
    description: "Latest gaming console",
    targetAmount: 600,
    currentAmount: 450,
  },
  {
    id: "3",
    title: "New Laptop",
    description: "High-performance laptop",
    targetAmount: 1500,
    currentAmount: 850,
  },
  {
    id: "4",
    title: "Charity Donation",
    description: "Support a charitable cause",
    targetAmount: 100,
    currentAmount: 25,
  },
];

const Frontdata = () => {
  return (
    <View style={styles.goalsContainer}>
      {goalsData.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={styles.goalCard}
          onPress={() => handleCardPress(goal.id)}
        >
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalDescription}>{goal.description}</Text>
          <Text style={styles.goalAmount}>
            ${goal.currentAmount} / ${goal.targetAmount}
          </Text>
        </TouchableOpacity>
      ))}
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
    flexDirection: "row", // Use flexDirection to horizontally align the buttons
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50, // Specify a height for the container
  },

  deposit: {
    width: "45%", // Adjust the width as needed
    borderRadius: 16,
    backgroundColor: "dodgerblue",
    paddingVertical: 16,
    paddingHorizontal: 25,
    color: "white",
  },

  withdraw: {
    width: "45%", // Adjust the width as needed
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
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
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
    marginBottom: 100,
  },
});
export default Frontdata;
