import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import Recents from "./Recents";

import MainContentData from "./MainContentData";

const Tab = createBottomTabNavigator();

export function MyBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFF2D8",
        },
      }}
    >
      <Tab.Screen
        name="MainContentData"
        component={MainContentData}
        options={{
          headerStyle: {
            backgroundColor: "#FFF2D8",
          },
          title: "",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity>
              <Feather
                name="menu"
                size={24}
                color="black"
                style={styles.lefticon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name="notifications"
                size={24}
                color="black"
                style={styles.righticon}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <Ionicons name="ios-home-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="All Goals"
        component={Recents}
        options={{
          headerStyle: {
            backgroundColor: "#FFF2D8",
          },
          tabBarIcon: () => (
            <Feather name="book-open" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2D8",
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lefticon: {
    marginLeft: 20,
  },
  righticon: {
    marginRight: 20,
    color: "#353535",
  },
  headerBefore: {
    width: 255,
    height: 225,
    borderTopWidth: 120,
    borderLeftWidth: 10,
    borderRadius: 1,
    borderColor: "dodgerblue",
    position: "absolute",
    top: -24,
    left: 0,
  },
});
