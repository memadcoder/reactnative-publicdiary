import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import POSTS from "../shared/posts";
import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";

import moment from "moment";

class EditModal extends Component {
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

  componentDidMount() {
    console.log("title", this.props.route.params.titleValue);
    this.setState({
      ...this.state,
      title: this.props.route.params.titleValue,
      description: this.props.route.params.descriptionValue,
    });
  }

  async handleSubmit(pId, navigation) {
    if (this.state.isValidTitle && this.state.isValidDescription) {
      var date = moment().utcOffset("+05:30").format(" Y-MMM-DD hh:mm a");
      var title = this.state.title;
      var description = this.state.description;

      const postState = this.state.posts.posts;
      const post = postState.filter((post) => post.id === pId);

      post[0].title = title;
      post[0].description = description;
      post[0].date = date;

      const toPost = post[0];
      await this.setState({ ...this.state.posts.posts, toPost });

      Alert.alert(
        "Update Message",
        "Update Successful !",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Update Message",
        "Update Failed",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    }
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
    const {
      pId,
      selected,
      userId,
      titleValue,
      descriptionValue,
    } = this.props.route.params;

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
                  value={this.state.title}

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
                  value={this.state.description}
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
                  onPress={() => this.handleSubmit(pId, navigation)}
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
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
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

export default EditModal;
