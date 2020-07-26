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

const myIcon = <Icon name="rocket" size={30} color="#900" />;

import RadioForm from "react-native-simple-radio-button";

var radio_props = [
  { label: "Hate Speech", value: 1 },
  { label: "Spam or Scam", value: 2 },
  { label: "Sexually explict Content", value: 3 },
  { label: "Voilence or harmful Behavior", value: 4 },
];

function ReportModal(props) {
  const [option, setCount] = useState(1);

  toggleModal = props.toggleModal;
  modalVisible = props.modalVisible;
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={modalVisible}
      onDismiss={() => toggleModal()}
      onRequestClose={() => toggleModal()}
    >
      <View style={styles.modal}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {
            setCount(value);
          }}
        />
        <View>
          <Button
            onPress={() => {
              alert(option);
              setCount(1);
              toggleModal();
            }}
            color="#512DA8"
            title="Submit"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            onPress={() => {
              toggleModal();
            }}
            color="#512DA8"
            title="Cancel"
          />
        </View>
      </View>
    </Modal>
  );
}

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  render() {
    console.log("received props=>", this.props);
    return (
      <View>
        <MenuProvider>
          <Menu onSelect={() => this.toggleModal()}>
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
        <View style={styles.modal} height={this.state.modalVisible ? 50 : 0}>
          <ReportModal
            modalVisible={this.state.modalVisible}
            toggleModal={() => this.toggleModal()}
          />
        </View>
      </View>
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

export default Navigator;
