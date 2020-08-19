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
import Setting from "./SettingComponent";

import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// import { ConfigureStore } from "../Redux/configureStore";
// const store = ConfigureStore();

// import { connect } from "react-redux";

// const mapStateToProps = (state) => {
//   return {
//     loggedInState: state.loggedInState,
//   };
// };

function MyDrawer(props) {
  // const dimensions = useWindowDimensions();
  // console.log("loggedIn state", )

  // console.log("state from main", store.getState().loggedInState);
  // const loggedInState = store.getState().loggedInState.loggedInState;
  // const loggedInUserDetail = {
  //   name: "Madhav",
  //   username: "memadcoder",
  //   totalPosts: 100,
  //   totalLikes: 80,
  // };
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Highlight" component={Highlight} />
      <Drawer.Screen name="SignIn" component={SignIn} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}

const Main = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Public Diary" component={MyDrawer} />

        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={(props) => ({
            title: props.route.params.name,
            headerRight: () => (
              <ThreeDotMenu
                loggedIn={props.route.params.loggedIn}
                userId={props.route.params.userId}
                loggedInState={props.route.params.loggedInState}
                navigation={props.navigation}
              />
            ),
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
};

// export default connect(mapStateToProps)(Main);
export default Main;
