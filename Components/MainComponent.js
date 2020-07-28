import React from "react";
import { useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import ContactUs from "./ContactComponent";
import Home from "./HomeComponent";
import Constants from "expo-constants";
import UserDetail from "./UserDetailComponent";
import ThreeDotMenu from "./DotMenuComponent";
import Highlight from "./HighlightComponent";
import PostModal from "./PostModalComponent";
import ReportModal from "./ReportModalComponent";
import SignIn from "./SignInComponent";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType="permanent"
      drawerType="permanent"
      drawerType={dimensions.width >= 768 ? "permanent" : "front"}
      drawerStyle={{
        width: 240,
        marginTop: Constants.statusBarHeight,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactUs}
        options={{
          title: "Contact",
          drawerIcon: (config) => (
            <Icon
              size={23}
              name={Platform.OS === "android" ? "md-contacts" : "ios-contacts"}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Highlights"
        component={Highlight}
        options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignIn}
        options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
            ></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={({ route }) => ({
            title: route.params.name,
            headerRight: () => <ThreeDotMenu />,
          })}
        />
        <Stack.Screen
          name="PostModal"
          component={PostModal}
          options={() => ({
            title: "New Post",
          })}
        />
        <Stack.Screen
          name="ReportModal"
          component={ReportModal}
          options={() => ({
            title: "Report",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
