import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { useNavigation } from "@react-navigation/native";

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{goal.goalName}</Text>
        <Icon name="bullseye" size={24} color="#075985" />
      </View>
      <View style={styles.section}>
        <Icon name="align-left" size={20} color="#075985" style={styles.icon} />
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{goal.description}</Text>
      </View>
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
        <Text style={styles.label}>Current Amount:</Text>
        <Text style={styles.text}>${goal.currentAmount}</Text>
      </View>
      <Text style={styles.label}>Images:</Text>
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
              resizeMode="contain" // This ensures the image fits within the modal
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GoalScreen", {
              mode: "edit",
              goal: existingGoal,
            })
          }
        >
          <Text style={styles.label}>EDIT THIS GOAL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Light background color
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
    color: "#075985", // Dark blue color
  },
  section: {
    backgroundColor: "#fff", // White background color for each section
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
    color: "#075985",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333", // Dark gray color
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center", // Center the contents vertically
    alignItems: "center", // Center the contents horizontally
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
    width: "90%", // Set width to a percentage of the screen width
    height: "80%", // Set height to a percentage of the screen height
    borderRadius: 10, // Optional: for rounded corners
  },
});

export default GoalDetailScreen;
