import React from "react";
import { useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import ContactUs from "./ContactComponent";
import Home from "./HomeComponent";
import Constants from "expo-constants";
import UserDetail from "./UserDetailComponent";
import ThreeDotMenu from "./DotMenuComponent";
import Highlight from "./HighlightComponent";
import PostModal from "./PostModalComponent";
import ReportModal from "./ReportModalComponent";
import EditModal from "./EditModalComponent";
import SignIn from "./SignInComponent";
import SignUp from "./SignUpComponent";

import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Highlight" component={Highlight} />
      <Drawer.Screen name="SignIn" component={SignIn} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
}

export default function Main(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Public Diary"
          style={{ background: "black" }}
          component={MyDrawer}
        />

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
        <Stack.Screen
          name="EditModal"
          component={EditModal}
          options={() => ({
            title: "Edit",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
