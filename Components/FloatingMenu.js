import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import PostModal from "./PostModalComponent";

class FloatMenu extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <ActionButton buttonColor="black">
        <ActionButton.Item
          buttonColor="black"
          title="Create Post"
          onPress={() => console.log("notes tapped!")}
        >
          <Icon
            name="md-create"
            style={styles.actionButtonIcon}
            onPress={() =>
              navigation.navigate("PostModal", {
                navigation: navigation,
              })
            }
          />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default FloatMenu;
