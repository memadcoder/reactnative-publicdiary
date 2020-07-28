import React, { Component, useState } from "react";
import { Text, View, Button, Modal, StyleSheet } from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Icon } from "react-native-elements";

class ReportOptions extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <MenuProvider>
        <Menu
          onSelect={() =>
            navigation.navigate("ReportModal", {
              navigation: navigation,
            })
          }
        >
          <MenuTrigger>
            <Icon
              name={"dots-three-vertical"}
              type={"entypo"}
              size={20}
              color="black"
            />
          </MenuTrigger>
          <MenuOptions>
            {/* <MenuOption value={1} text="report" /> */}
            <MenuOption value={1}>
              <Text style={{ margin: -5 }}>Report Entry</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
    flex: 1,
    padding: 0,
    borderRadius: 8,
    height: 100,
  },
});

export default ReportOptions;
