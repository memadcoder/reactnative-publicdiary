import React, { useState, Component } from "react";
import { View, Button, Modal, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

import RadioForm from "react-native-simple-radio-button";

import { connect } from "react-redux";
import { reportPost, reportUser } from "../Redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  reportPost: (postIdToReport, reportedCase, token) =>
    dispatch(reportPost(postIdToReport, reportedCase, token)),
});

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
      count: 1,
    };
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }

  handlePostReport(navigation, postId) {
    var token = this.props.loggedInUser.user.token;
    var reported = radio_props.filter((obj) => {
      return obj.value === this.state.count;
    });
    var reportedCase = reported.label;
    this.props.reportPost(postId, reportedCase, token);
    navigation.navigate("Home");
  }

  render() {
    const { navigation } = this.props;
    var { postId } = this.props.route.params;

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
              onPress={() => this.handlePostReport(navigation, postId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal);
