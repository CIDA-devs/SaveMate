import React,{useState} from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Transact from "./Transact";
import AddGoal from "./AddGoal";
import Recents from "./Recents";
import Home from "./MainContentData";
import Notifications from "./Notifications";
import {
  Entypo,
  AntDesign,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  FontAwesome5
} from "@expo/vector-icons";
import MainContentData from './MainContentData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function MyBottomTabs() {

    const [open,setOpen] = useState(false)
    const navigation = useNavigation();

  //   const [fontsloaded] = useFonts({
  //     Poppins_Black: require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  //     Poppins_Medium: require("./assets/fonts/Poppins/Poppins-Medium.ttf")
  //   })

  //   if(!fontsloaded) {
  //     return null
  //   }
  const toggleDrawer = () => {
    navigation.toggleDrawer(); // This will toggle the drawer open/close
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainContentData"
        component={MainContentData}
        options={{
          title: "",
          // headerShown: false,
          headerTitleAlign: "center",
          headerLeft: () => {
            return (
                <TouchableOpacity onPress={toggleDrawer}>
                <Feather
                name="menu"
                size={24}
                color="black"
                style={styles.lefticon}
              />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons
                name="notifications"
                size={24}
                color="black"
                style={styles.righticon}
              />
              </TouchableOpacity>
            );
          },
          tabBarIcon: () => {
            return (
              <Ionicons name="ios-home-outline" size={24} color="dodgerblue" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Transact"
        component={Transact}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={toggleDrawer}>
                <Feather
                name="menu"
                size={24}
                color="black"
                style={styles.lefticon}
              />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
              <Ionicons
              name="notifications"
              size={24}
              color="black"
              style={styles.righticon}
            />
            </TouchableOpacity>
            );
          },
          tabBarIcon: () => {
            return (
              <Feather name="credit-card" size={24} color="dodgerblue" />
            );
          },
        }}
      />
      <Tab.Screen
        name="AddGoal"
        component={AddGoal}
        options={{
          title: "",
          headerTitleAlign: "left",
          headerStyle: {
            height: 80,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={toggleDrawer}>
              <Feather
              name="menu"
              size={24}
              color="black"
              style={styles.lefticon}
            />
            </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <View style={styles.iconView}>
               
               <TouchableOpacity>
                <Ionicons
                name="notifications"
                size={24}
                color="black"
                style={styles.righticon}
              />
              </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: () => {
            return <AntDesign name="pluscircleo" size={24} color="dodgerblue" />;
          },
        }}
      />
      <Tab.Screen
        name="Recents"
        component={Recents}
        options={{
          tabBarIcon: () => {
            return (
              <Feather name="book-open" size={24} color="dodgerblue" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

function PagesNavigator() {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name="Home" component={Home} />
    //   <Stack.Screen name="Notifications" component={Notifications} />
    //   {/* <Stack.Screen name="Profile" component={Profile} />
    //   <Stack.Screen name="Settings" component={Settings} /> */}
    //   <Stack.Screen name="MyBottomTabs" component={MyBottomTabs} /> {/* Wrap MyBottomTabs inside a screen */}
    // </Stack.Navigator>

    // <NavigationContainer>
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Home"
        component={Home}
        // ... Other options
      /> */}
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        // ... Other options
      />
      <Tab.Screen
        name="MyBottomTabs"
        component={MyBottomTabs}
        // ... Other options
      />
    </Tab.Navigator>
    //   </NavigationContainer>
  );
}

// export default PagesNavigator;



export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#FAD04B',
        drawerActiveTintColor:'#000',
        drawerInactiveTintColor:'#fff',
        drawerStyle: {
          backgroundColor: "#000",
          width: 240,
          borderTopRightRadius:86,
          borderBottomRightRadius:86
        },
       
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Navigate} options={{
        drawerIcon:(({color})=> {
         return <MaterialCommunityIcons name="home-outline" size={24} color={color} style={{marginRight:-25}}/>
        })
      }}/>
      <Drawer.Screen name="Badges" component={MyBagde} options={{
        drawerIcon:(({color})=> {
          return <MaterialCommunityIcons name="police-badge-outline" size={20} color={color} style={{marginRight:-25}} />
         })
      }}/>
      <Drawer.Screen name="Achievement" component={Achievement} options={{
        drawerIcon:(({color})=> {
          return <AntDesign name="Trophy" size={20} color={color} style={{marginRight:-25}} />
         })
      }}/>
      <Drawer.Screen name="Contest" component={Contest} options={{
        drawerIcon:(({color})=> {
          return <FontAwesome5 name="award" size={20} color={color} style={{marginRight:-25}} />
         })
      }}/>
    </Drawer.Navigator>
  );
};