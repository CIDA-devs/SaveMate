import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { updateGoals } from "../slices/goalsSlice";
import ProgressBar from "./ProgressBar";
import firebase from "../firebaseConfig";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase);

const SavedGoalsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goals = useSelector((state) => state.goals.goals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const goalsCollection = collection(db, "SaveMate");
    const unsubscribe = onSnapshot(goalsCollection, (snapshot) => {
      const newGoals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(updateGoals(newGoals));
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const navigateToDetail = (goal) => {
    navigation.navigate("GoalDetails", { goal });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            delayPressIn={150}
            onPress={() => navigateToDetail(item)}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="bullseye" size={24} color="#fff" />
                <Text style={styles.title}>{item.goalName}</Text>
              </View>

              <View style={styles.cardRow}>
                <Icon
                  name="dollar"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />

                <ProgressBar
                  progress={item.currentAmount / item.targetAmount}
                  width={300}
                  height={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#FFF2D8",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF2D8",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2E4374",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
  },
  description: {
    marginBottom: 10,
    color: "white",
  },
  amount: {
    fontWeight: "bold",
    color: "white",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  icon: {
    marginRight: 10,
  },
});

export default SavedGoalsScreen;
