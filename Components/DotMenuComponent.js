import React, { useState } from "react";
import { View, Text } from "react-native";

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import { blockUser, reportUser } from "../Redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  blockUser: (userIdToReport, token) =>
    dispatch(blockUser(userIdToReport, token)),
  reportUser: (userIdToReport, token) =>
    dispatch(reportUser(userIdToReport, token)),
});

function ThreeDotMenu(props) {
  var { navigation } = props;
  var loggedIn = props.loggedIn;
  var userId = props.userId;
  var loggedInState = props.loggedInState;
  console.log(
    "loggedIN===>",
    loggedIn,
    "userId===>",
    userId,
    "loggedInState==>",
    loggedInState
  );

  const handleReportOrBlock = (selectedOption) => {
    var token = this.props.loggedInUser.user.token;
    if (selectedOption === 1) {
      console.log("report user");
      console.log(
        "userId to report",
        userId,
        "\n reported by userId",
        loggedIn
      );
      this.props.reportUser(userId, token);
    } else if (selectedOption === 2) {
      console.log("block user");
      console.log("userId to block", userId, "\n block by userId", loggedIn);
      this.props.blockUser(userId, token);
    } else {
      console.log("wrong choice");
    }
  };

  if (loggedInState === true) {
    if (loggedIn === userId) {
      return (
        <MenuProvider>
          <Menu
            onSelect={(value) =>
              navigation.navigate("Setting", { value: value })
            }
          >
            <MenuTrigger>
              <Icon
                name={"dots-three-vertical"}
                type={"entypo"}
                size={20}
                color="black"
                marginRight={60}
                marginTop={15}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1}>
                <Text>Settings</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      );
    } else {
      return (
        <MenuProvider>
          <Menu onSelect={(value) => handleReportOrBlock(value)}>
            <MenuTrigger>
              <Icon
                name={"dots-three-vertical"}
                type={"entypo"}
                size={20}
                color="black"
                marginRight={60}
                marginTop={15}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1}>
                <Text>Report User</Text>
              </MenuOption>
              <MenuOption value={2}>
                <Text>Block</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      );
    }
  } else {
    return <View></View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreeDotMenu);
