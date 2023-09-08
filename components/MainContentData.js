import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { Image } from "react-native";
// import fill from "../assets/images/swiperImage/blank.gif";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Options from "./Options";

const MainContentData = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {/* <Options/> */}

        <View style={styles.detailsBox}>
          <Text style={styles.title}>Challenges</Text>
          <Text>
            Scroll to select quizzes to challenge your language learning
            experience
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Swiper
            showsButtons={false}
            showsPagination={false}
            style={{ height: 316 }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", overflow: "hidden" }}
              // onPress={() => {
              //   navigation.navigate("FillInTheBlanks");
              // }}
            >
              <View style={styles.challenges}>
                <View style={styles.slide1}>
                  {/* <Image source={fill} style={styles.img} /> */}
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.text}>Fill In the blanks</Text>
                    <Text style={styles.subText}>
                      Learn by dragging and dropping the correct answers into
                      the blanks.
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          </Swiper>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressBox: {
    width: 185,
    height: 187,
    borderRadius: 30,
    // backgroundColor: "#000",
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
    width: 294,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    padding: 30,
    marginBottom: 20,
  },

  title: {
    color: "dodgerblue",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
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

  img: {
    width: 268,
    height: 191,
    borderRadius: 100,
  },

  challenges: {
    width: 268,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    height: 294,
  },

  subText: {
    fontSize: 16,
    fontWeight: "light",
    color: "#fff",
    marginBottom: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default MainContentData;

// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const MainContentData = () => {
//   return (
//     <View style={styles.container}>
//       <Text>MainContentData</Text>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//   },
// });

// //make this component available to the app
// export default MainContentData;
