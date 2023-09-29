import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from 'expo-font';
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import itemtwo from "../assets/itemtwo.jpg";
import itemone from "../assets/wallpaper1.jpg";

const MainContentData = () => {


  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/PoppinsFont/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const amount = 300;
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        {/* <Options/> */}

        <View style={styles.detailsBox}>
          <Text style={styles.title}>Savings Balance</Text>
          <Text style={styles.amount}> GH₵ {amount}.00</Text>
          <View style={styles.btn_div}>
            <TouchableOpacity style={styles.deposit}>
              <Text style={styles.deposit_text}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdraw}>
              <Text style={styles.withdraw_text}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
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

          {/* <Image source={itemtwo} style={styles.img}/> */}

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
              loop={true}
              autoplay={true}
              // slidesPerView={2}
            >
              <TouchableOpacity
                style={{ alignItems: "center", overflow: "hidden" }}
                // onPress={() => {
                //   navigation.navigate("FillInTheBlanks");
                // }}
              >
                <View style={styles.challenges}>
                  <Image
                    source={itemtwo}
                    style={styles.img}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", overflow: "hidden" }}
                // onPress={() => {
                //   navigation.navigate("FillInTheBlanks");
                // }}
              >
                <View style={styles.challenges}>
                  <Image
                    source={itemone}
                    style={styles.img}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
              
            </Swiper>
          </View>
          {/* Scrollable Carousel */}
          <View>
            <Swiper
              showsButtons={false}
              showsPagination={false}
              style={{ height: 316 }}
              loop={true}
              autoplay={true}
              slidesPerView={2}
            >
              <TouchableOpacity
                style={{ alignItems: "center", overflow: "hidden" }}
                // onPress={() => {
                //   navigation.navigate("FillInTheBlanks");
                // }}
              >
                <View style={styles.goal}>
                  <View style={styles.slide1}>
                    {/* <Image source={fill} style={styles.img} /> */}
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.goaltext}>1</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center", overflow: "hidden" }}
                // onPress={() => {
                //   navigation.navigate("FillInTheBlanks");
                // }}
              >
                <View style={styles.goal}>
                  <View style={styles.slide1}>
                    {/* <Image source={fill} style={styles.img} /> */}
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.goaltext}>2</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Swiper>
          </View>
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
    textAlign: "center", // Center the text within the button
  },

  withdraw_text: {
    color: "black",
    textAlign: "center", // Center the text within the button
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
});

export default MainContentData;
