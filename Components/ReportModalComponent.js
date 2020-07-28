import React, { useState, Component } from "react";
import { View, Button, Modal, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

import RadioForm from "react-native-simple-radio-button";

var radio_props = [
  { label: "Hate Speech", value: 1 },
  { label: "Spam or Scam", value: 2 },
  { label: "Sexually explict Content", value: 3 },
  { label: "Voilence or harmful Behavior", value: 4 },
];

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      count: "1",
    };
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.modalVisible}
        onDismiss={false}
        onRequestClose={false}
      >
        <View style={styles.modal}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => this.setState({ count: value })}
          />
          <View>
            <Button
              onPress={() => navigation.navigate("Home")}
              color="#512DA8"
              title="Submit"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              onPress={() => navigation.navigate("Home")}
              color="#512DA8"
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
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

export default ReportModal;
