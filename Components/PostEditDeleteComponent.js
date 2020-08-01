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

class EditOptions extends Component {
  render() {
    const { navigation, postId, loggedInId } = this.props;

    return (
      <MenuProvider>
        <Menu
          onSelect={(value) =>
            navigation.navigate("EditModal", {
              navigation: navigation,
              option: value,
              postId: postId,
              loggedInId: loggedInId,
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
              <Text style={{ margin: -5 }}>Edit Entry</Text>
            </MenuOption>
            <MenuOption value={1}>
              <Text style={{ margin: -5 }}>Delete Entry</Text>
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

export default EditOptions;
