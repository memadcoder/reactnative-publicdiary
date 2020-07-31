import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import POSTS from "../shared/posts";
import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";

// var uuid = require("react-native-uuid");

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      posts: POSTS,
      title: "",
      description: "",
      check_titleInputChange: false,
      check_descriptionInputChange: false,
      isValidTitle: true,
      isValidDescription: true,
      validPost: false,
    };
  }

  // colors = useTheme();
  loggedInUserDetails = {
    userId: 1,
    user: "Madhav",
    username: "memadcoder",
  };

  handleSubmit(navigation) {
    // var id = uuid.v1();
    if (this.state.isValidTitle && this.state.isValidDescription) {
      const newPost = {
        id: id,
        userId: this.loggedInUserDetails.userId,
        user: this.loggedInUserDetails.user,
        username: this.loggedInUserDetails.username,
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
    } else {
      alert("Post Failed");
    }
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }

  titleInputChange = (val) => {
    if (val.trim().length >= 4) {
      this.setState({
        ...this.state,
        title: val,
        check_titleInputChange: true,
        isValidTitle: true,
      });
    } else {
      this.setState({
        ...this.state,
        title: val,
        check_titleInputChange: false,
        isValidTitle: false,
      });
    }
  };

  descriptionInputChange = (val) => {
    if (val.trim().length >= 10) {
      this.setState({
        ...this.state,
        description: val,
        check_descriptionInputChange: true,
        isValidDescription: true,
      });
    } else {
      this.setState({
        ...this.state,
        description: val,
        check_descriptionInputChange: false,
        isValidDescription: false,
      });
    }
  };

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
          <View style={styles.container}>
            <Animatable.View
              animation="fadeInUpBig"
              style={[
                styles.footer,
                {
                  backgroundColor: "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: "black",
                  },
                ]}
              >
                Title
              </Text>
              <View style={styles.action}>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Post Title"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: "black",
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => this.titleInputChange(val)}

                  // onChangeText={(text) => this.setState({ title: text })}
                />
                {this.state.check_titleInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {this.state.isValidTitle ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Title is Required.</Text>
                  <Text style={styles.errorMsg}>
                    Title must me more than 4 character.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: "black",
                  },
                ]}
              >
                Description
              </Text>
              <View style={styles.action}>
                <TextInput
                  multiline={true}
                  numberOfLines={8}
                  placeholder="Post Description"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  style={[
                    styles.textInput,
                    {
                      color: "black",
                    },
                  ]}
                  onChangeText={(val) => this.descriptionInputChange(val)}
                  // onChangeText={(text) => this.setState({ description: text })}
                  //   value={value}
                />
                {this.state.check_descriptionInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {this.state.isValidDescription ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Description is Required.</Text>
                  <Text style={styles.errorMsg}>
                    Description must me more than 20 character.
                  </Text>
                </Animatable.View>
              )}

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => this.handleSubmit(navigation)}
                >
                  <LinearGradient
                    colors={["black", "white"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Post
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Home")}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "black",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "black",
                      },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
    flex: 1,
    padding: 0,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    margin: 0,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 20,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostModal;
