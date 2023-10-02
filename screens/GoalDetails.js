import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ConfettiCannon from "react-native-confetti-cannon";

import { useNavigation } from "@react-navigation/native";
import { app } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(app);

const GoalDetailScreen = ({ route }) => {
  console.log("Received Params:", route.params);
  const navigation = useNavigation();
  const { goal: existingGoal } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const openImageModal = (image) => {
    setActiveImage(image);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setActiveImage(null);
  };

  if (!route.params || !route.params.goal) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No goal data received</Text>
      </View>
    );
  }

  const { goal } = route.params;
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [firebaseAmount, setFirebaseAmount] = useState(0);
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [celebrationTriggered, setCelebrationTriggered] = useState(false);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);

  useEffect(() => {
    setIsGoalAchieved(parseFloat(currentAmount) === parseFloat(targetAmount));
  }, [currentAmount, targetAmount]);
  const getContainerStyle = () => ({
    flex: 1,
    padding: 20,
    marginTop: 70,
    marginBottom: 50,
    backgroundColor:
      isGoalAchieved || targetAmount === 0 ? "#FFF2D8" : "#f9f9f9",
  });
  const getContainerStyle2 = () => ({
    flex: 1,
    marginTop: isGoalAchieved || targetAmount === 0 ? 0 : -70,

    backgroundColor:
      isGoalAchieved || targetAmount === 0 ? "#FFF2D8" : "#f9f9f9",
  });

  const getHeaderStyle = () => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: isGoalAchieved || targetAmount === 0 ? "#113946" : "#fff",
    padding: 15,
    borderRadius: 10,
  });

  const getHeadingStyle = () => ({
    fontSize: 24,
    fontWeight: "bold",
    color: isGoalAchieved || targetAmount === 0 ? "#fff" : "#075985",
  });

  const getSectionStyle = () => ({
    backgroundColor: isGoalAchieved || targetAmount === 0 ? "#113946" : "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  });

  const getIconColor = () =>
    isGoalAchieved || targetAmount === 0 ? "#fff" : "#075985";

  const getLabelStyle = () => ({
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: isGoalAchieved || targetAmount === 0 ? "#fff" : "#075985",
    marginBottom: 5,
  });

  const getTextStyle = () => ({
    fontSize: 16,
    color: isGoalAchieved || targetAmount === 0 ? "#fff" : "#333",
  });
  const getDepositButtonStyle = () => ({
    backgroundColor:
      isGoalAchieved || targetAmount === 0 ? "gray" : "dodgerblue",
    padding: 10,
    borderRadius: 5,
  });

  const getEditGoalTextStyle = () => ({
    fontSize: 16,
    fontWeight: "bold",
    color: isGoalAchieved || targetAmount === 0 ? "gray" : "#075985",
    marginBottom: 5,
  });
  const getEditGoalTextStyle2 = () => ({
    fontSize: 26,
    fontWeight: "bold",
    color: "#113946",
  });
  const fetchFirebaseAmount = async () => {
    try {
      const docRef = doc(db, "transactions", "transaction");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFirebaseAmount(parseFloat(docSnap.data().amount));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching amount: ", error);
    }
  };
  useEffect(() => {
    fetchFirebaseAmount();
  }, []);

  const handleDeposit = () => {
    navigation.navigate("AddFunds", { goal });
    // Logic for depositing money
    setShowInsufficientFunds(false);
  };

  const handleWithdraw = () => {
    // Logic for withdrawing money
    if (parseFloat(currentAmount) < parseFloat(targetAmount)) {
      alert("Savings goal not met");
      return;
    }
    navigation.navigate("Withdraw", {
      targetAmount: targetAmount,
      goalId: goal.id,
    });
  };
  useEffect(() => {
    if (
      parseFloat(currentAmount) === parseFloat(targetAmount) &&
      !celebrationTriggered
    ) {
      setIsCelebrating(true);
      setCelebrationTriggered(true);
      setTimeout(() => setIsCelebrating(false), 5000);
    }
  }, [currentAmount, targetAmount, celebrationTriggered]);

  return (
    <View style={getContainerStyle2()}>
      {isCelebrating && (
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <ConfettiCannon count={50} origin={{ x: 0, y: 0 }} />
        </View>
      )}
      <ScrollView style={getContainerStyle()}>
        <View style={styles.section}>
          <Text style={getEditGoalTextStyle2()}>
            {isGoalAchieved || targetAmount === 0 ? "GOAL ACHIEVED 🎉🎉" : ""}
          </Text>
        </View>
        <View style={getHeaderStyle()}>
          <Text style={getHeadingStyle()}>{goal.goalName}</Text>
          <Icon name="bullseye" size={24} color={getIconColor()} />
        </View>
        <View style={getSectionStyle()}>
          <Icon name="align-left" size={20} color={getIconColor()} />
          <Text style={getLabelStyle()}>Description:</Text>
          <Text style={getTextStyle()}>{goal.description}</Text>
        </View>
        <Text style={styles.label}>My Goal Images:</Text>
        <View style={styles.imagesContainer}>
          {goal.images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => openImageModal(image)}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={closeImageModal}
        >
          <View style={styles.modalContainer}>
            {activeImage && (
              <Image
                source={{ uri: activeImage.uri }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={closeImageModal}
            >
              <Text style={styles.modalBackButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.section}>
          <Icon name="calendar" size={20} color="#075985" style={styles.icon} />
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.text}>{goal.date}</Text>
        </View>
        <View style={styles.section}>
          <Icon name="dollar" size={20} color="#075985" style={styles.icon} />
          <Text style={styles.label}>Target Amount:</Text>
          <Text style={styles.text}>${goal.targetAmount}</Text>
        </View>
        <View style={styles.section}>
          <Icon name="money" size={20} color="#075985" style={styles.icon} />
          <Text style={styles.label}>Amount Saved:</Text>
          <Text style={styles.text}>${goal.currentAmount}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={getDepositButtonStyle()}
            onPress={handleDeposit}
            disabled={isGoalAchieved || targetAmount === 0}
          >
            <Text style={styles.buttonText}>Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.withdrawButton,
              parseFloat(targetAmount) === 0 ? styles.disabledButton : {},
            ]}
            onPress={handleWithdraw}
            disabled={parseFloat(targetAmount) === 0}
          >
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        {parseFloat(targetAmount) === 0 && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Funds removed</Text>
          </View>
        )}
        {showInsufficientFunds && (
          <View style={styles.insufficientFundsContainer}>
            <Text style={styles.insufficientFundsText}>
              Insufficient funds.
            </Text>
            <TouchableOpacity>
              <Text style={styles.addFundsText}>Add Funds</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GoalScreen", {
                mode: "edit",
                goal: goal,
              })
            }
            disabled={isGoalAchieved || targetAmount === 0}
          >
            <Text style={getEditGoalTextStyle()}>
              {isGoalAchieved || targetAmount === 0
                ? "GOAL ACHIEVED 🎉🎉"
                : "EDIT THIS GOAL"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 70,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  depositButton: {
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 5,
  },
  withdrawButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",

    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF2D8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  modalBackButtonText: {
    fontSize: 16,
    color: "black",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
});

export default GoalDetailScreen;
