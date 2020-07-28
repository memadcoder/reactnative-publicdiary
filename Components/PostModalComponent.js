import React, { useState, Component } from "react";
import { Button, StyleSheet, View, Modal, TextInput } from "react-native";
import POSTS from "../shared/posts";

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      posts: POSTS,
      title: "",
      description: "",
    };
  }

  handleSubmit(navigation) {
    const newPost = {
      id: 5,
      userId: 1,
      user: "Madhav",
      username: "memadcoder",
      date: "Dec 5 2019",
      likes: [],
      unlikes: [],
      highlight: [],
      shares: [],
      title: this.state.title,
      description: this.state.description,
    };

    console.log("new post==>", newPost);

    this.setState({ posts: this.state.posts.posts.push(newPost) });

    alert("Post SuccessFul");
    navigation.navigate("Home");
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ backgroundColor: "white", margin: 10, padding: 10 }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.modalVisible}
          onDismiss={false}
          onRequestClose={false}
        >
          <View style={styles.modal}>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={(text) => this.setState({ title: text })}
              //   value={value}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={(text) => this.setState({ description: text })}
              //   value={value}
            />

            <View>
              <Button
                onPress={() => this.handleSubmit(navigation)}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
    flex: 1,
    padding: 0,
    borderRadius: 8,
  },
});

export default PostModal;
