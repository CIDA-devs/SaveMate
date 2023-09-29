import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native-gesture-handler";

import { app } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { addGoal } from "../slices/goalsSlice";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const GoalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const isEdit = route.params?.mode === "edit";
  const existingGoal = route.params?.goal || {};

  const defaultGoal = {
    goalName: "",
    description: "",
    date: new Date(),
    dateOfCompletion: "",
    targetAmount: "",
    currentAmount: "",
    selectedImages: [],
    // any other fields that your goal objects have...
  };

  const [goalName, setGoalName] = useState(isEdit ? existingGoal.goalName : "");
  const [description, setDescription] = useState(
    isEdit ? existingGoal.description : ""
  );
  const [date, setDate] = useState(
    isEdit ? new Date(existingGoal.date) : new Date()
  );
  const [dateOfCompletion, setDateOfCompletion] = useState(
    isEdit ? existingGoal.date : ""
  );
  const [targetAmount, setTargetAmount] = useState(
    isEdit ? existingGoal.targetAmount : ""
  );
  const [currentAmount, setCurrentAmount] = useState(
    isEdit ? existingGoal.currentAmount : ""
  );
  const [selectedImages, setSelectedImages] = useState(
    isEdit ? existingGoal.images : []
  );
  const [showPicker, setShowPicker] = useState(false);
  const [goalId, setGoalId] = useState(isEdit ? existingGoal.id : "");
  const [firebaseAmount, setFirebaseAmount] = useState(0);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const pickImages = async () => {
    try {
      const results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        base64: true,
      });
      if (parseFloat(currentAmount) > firebaseAmount) {
        alert("Insufficient funds");
        return;
      }

      if (parseFloat(currentAmount) > parseFloat(targetAmount)) {
        alert("Current amount cannot be higher than the targeted amount.");
        return;
      }

      if (!results.canceled) {
        const images = results.assets.map((image) => ({
          uri: `data:${image.mediaType};base64,${image.base64}`,
        }));

        setSelectedImages([...selectedImages, ...images]);
      }
    } catch (error) {
      console.error("Error picking images: ", error);
    }
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfCompletion(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfCompletion(date.toDateString());
    toggleDatePicker();
  };

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

  const saveGoalToFirestore = async () => {
    try {
      // Perform your validation checks
      if (parseFloat(currentAmount) > parseFloat(targetAmount)) {
        alert("Current amount cannot be higher than the targeted amount.");
        return;
      }

      const saveMateCollection = collection(db, "SaveMate");

      const goalData = {
        goalName,
        description,
        date: dateOfCompletion,
        targetAmount,
        currentAmount,
        amountDeposited: 0,
        amountRequired: targetAmount,
        images: selectedImages,
      };

      let docRef;
      if (isEdit) {
        // Update the existing document if in edit mode
        docRef = doc(db, "SaveMate", goalId);
        await updateDoc(docRef, goalData);
        console.log("Goal updated with ID: ", goalId);
      } else {
        // Create a new document if not in edit mode
        docRef = await addDoc(saveMateCollection, goalData);
        setGoalId(docRef.id);
        console.log("Goal saved with ID: ", docRef.id);
      }

      // Update the redux store
      dispatch(addGoal({ id: isEdit ? goalId : docRef.id, ...goalData }));

      // Reset the form fields
      setGoalName("");
      setDescription("");
      setDate(new Date());
      setDateOfCompletion("");
      setTargetAmount("");
      setCurrentAmount("");
      setSelectedImages([]);

      // Navigate back to the "Recents" screen
      navigation.navigate("Recents");

      console.log("Input fields reset.");
    } catch (error) {
      console.error("Error saving goal: ", error);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>
            {isEdit ? "Edit Goal" : "Add New Goal"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name of your new Goal"
            value={goalName}
            onChangeText={(text) => setGoalName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={styles.label}>Date to accomplish this Goal:</Text>
          {showPicker && (
            <DateTimePicker
              display="spinner"
              value={date}
              mode="date"
              onChange={onChange}
              style={styles.datePicker}
            />
          )}
          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                value={dateOfCompletion}
                onChangeText={setDateOfCompletion}
                editable={false}
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )}
          {!showPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: "gray" },
                ]}
                onPress={toggleDatePicker}
              >
                <Text style={[styles.buttonText, { color: "#075985" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.pickerButton]}
                onPress={confirmIOSDate}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Targeted amount"
            value={targetAmount}
            onChangeText={(text) => setTargetAmount(text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Add photos:</Text>
          <FlatList
            data={selectedImages}
            horizontal
            contentContainerStyle={{ columnGap: 4 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.selectedImage} />
            )}
          />
          <TouchableOpacity style={styles.addMoreButton} onPress={pickImages}>
            <View style={styles.imagebox}>
              <Text style={styles.addMoreButtonText}>Add Photos</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>How much can you save now?</Text>
          <TextInput
            style={styles.input}
            placeholder="GH₵20"
            value={currentAmount}
            onChangeText={(text) => setCurrentAmount(text)}
            keyboardType="numeric"
          />
          {parseFloat(currentAmount) > firebaseAmount && ( // Compare currentAmount with firebaseAmount
            <TouchableOpacity>
              <Text style={styles.addFundsText}>
                Insufficient Funds. Add Funds
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveGoalToFirestore}
          >
            <Text style={styles.saveButtonText}>
              {isEdit ? "Save Changes" : "Save"}
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
    marginHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
    marginBottom: 50,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "dodgerblue",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
    margin: 10,
    resizeMode: "contain",
  },
  addMoreButton: {
    width: 150,
    height: 50,
    margin: 10,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  addMoreButtonText: {
    fontSize: 16,
    color: "dodgerblue",
  },
  addFundsText: {
    color: "black",
    marginTop: -10,
    marginBottom: 20,
    fontSize: 13,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GoalScreen;
