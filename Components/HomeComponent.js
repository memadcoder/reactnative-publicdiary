import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Share,
  StatusBar,
} from "react-native";

import { ListItem, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import Icons from "react-native-vector-icons/FontAwesome";

import POSTS from "../shared/posts.js";
import FloatMenu from "./FloatingMenu";

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { connect } from "react-redux";
import {
  fetchPosts,
  createPost,
  createHighlight,
} from "../Redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    postss: state.posts,
    by: state.loggedInUser,
    loggedInState: state.loggedInState,
    loggedInUser: state.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (token) => dispatch(fetchPosts(token)),
  createPost: (postDetails) => dispatch(createPost(postDetails)),
  createHighlight: (pid, postDetails) =>
    dispatch(createHighlight(pid, postDetails)),
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: POSTS,
    };
  }
  componentDidMount() {
    console.log("state curretn", this.props.loggedInUser);
    if (this.props.loggedInUser.user == null) {
      var token = "";
    } else {
      var token = this.props.loggedInUser.user.token;
    }
    console.log("token from home component", token);
    this.props.fetchPosts(token);
  }

  async handleHighligted(pid, content, heading, username, name) {
    var postDetails = {
      highlightedEntry: { content: content, heading: heading },

      highlightedBy: {
        name: this.props.by.name,
        username: this.props.by.username,
      },
    };
    this.props.createHighlight(pid, postDetails);
  }

  async handleLiked(pid) {
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id === pid);

    post[0].likes.indexOf(this.state.loggedInId) === -1
      ? post[0].likes.push(this.state.loggedInId)
      : post[0].likes.pop(this.state.loggedInId);

    const toPost = post[0];
    await this.setState({ ...this.state.posts.posts, toPost });
  }

  async handleUnliked(pid) {
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id === pid);

    post[0].unlikes.indexOf(this.state.loggedInId) === -1
      ? post[0].unlikes.push(this.state.loggedInId)
      : post[0].unlikes.pop(this.state.loggedInId);

    const toPost = post[0];
    await this.setState({ ...this.state.posts.posts, toPost });
  }

  async handleShare(title, description, pid) {
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id === pid);
    try {
      const result = await Share.share(
        {
          title: title,
          message: title + ":\n " + description + " ",
          url: "www.google.com",
        },
        {
          dialogTitle: "Share " + title,
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          post[0].shares.push(this.state.loggedInId);

          const toPost = post[0];
          await this.setState({ ...this.state.posts.posts, toPost });
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        post[0].shares.pop(this.state.loggedInId);

        const toPost = post[0];
        await this.setState({ ...this.state.posts.posts, toPost });
      }
    } catch (error) {
      alert(error.message);
    }
  }

  handleDelete(pid) {
    // console.log(pid);
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id !== pid);
    // console.log("after pluck of", post);

    const postUpdate = {
      posts: post,
    };

    this.setState({
      posts: postUpdate,
    });

    console.log("final state", this.state.posts.posts);
  }

  render() {
    const { navigation } = this.props;

    const RenderPost = ({ item, index }) => {
      return (
        <Animatable.View
          animation="slideInDown"
          key={index}
          style={styles.postContainer}
        >
          <StatusBar backgroundColor="black" barStyle="light-content" />

          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 3, alignContent: "flex-start" }}>
              <ListItem
                leftAvatar={{
                  source: { uri: "./assets/favicon.png" },
                  showEditButton: true,
                }}
                title={item.by.name}
                subtitle={`@` + item.by.username}
                onPress={() =>
                  navigation.navigate("UserDetail", {
                    name: item.by.username,
                    userId: item.by._id,
                    postId: item._id,
                    loggedIn: this.props.loggedInUser.user.userId,
                    loggedInState: this.props.loggedInState.loggedInState,
                  })
                }
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 18,
                alignContent: "flex-start",
              }}
            >
              {this.props.loggedInState.loggedInState ? (
                item.by._id === this.props.loggedInUser.user.userId ? (
                  <MenuProvider>
                    <Menu
                      onSelect={(value) => {
                        if (value === 1) {
                          navigation.navigate("EditModal", {
                            navigation: navigation,
                            selected: value,
                            pId: item.id,
                            userId: this.props.by._id,
                            titleValue: item.heading,
                            descriptionValue: item.content,
                          });
                        } else if (value === 2) {
                          Alert.alert(
                            "Delete Post",
                            "Are you sure you want to delete?",
                            [
                              {
                                text: "Yes",
                                onPress: () =>
                                  this.handleDelete(this.props.by._id),
                              },
                              {
                                text: "No",
                                onPress: () => console.log("No Pressed"),
                                style: "cancel",
                              },
                            ],
                            { cancelable: false }
                          );
                        } else {
                          alert("no allowed");
                        }
                      }}
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
                        <MenuOption value={2}>
                          <Text style={{ margin: -5 }}>Delete Entry</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </MenuProvider>
                ) : (
                  <MenuProvider>
                    <Menu
                      onSelect={(value) =>
                        navigation.navigate("ReportModal", {
                          postId: item.id,
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
                        <MenuOption value={3}>
                          <Text style={{ margin: -5 }}>Report Entry</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </MenuProvider>
                )
              ) : (
                <View></View>
              )}
            </View>
          </View>
          <View style={styles.postContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.heading}
            </Text>
            <Text style={{ fontSize: 14, fontStyle: "italic" }}>
              {item.updatedAt}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={{ fontSize: 16 }}>{item.content}</Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.reactionContainer}>
            <View style={styles.reactions}>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name="heart-o"
                  // name={
                  //   item.highlight.some((a) => a === this.state.loggedInId)
                  //     ? "heart"
                  //     : "heart-o"
                  // }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() =>
                    this.handleHighligted(
                      item._id,
                      item.content,
                      item.heading,
                      item.by.username,
                      item.by.name
                    )
                  }
                />
                <Text>Favorite</Text>
                <Text>22</Text>
                {/* <Text>{item.highlight.length}</Text> */}
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name="thumbs-o-up"
                  // name={
                  //   item.likes.some((a) => a === this.state.loggedInId)
                  //     ? "thumbs-up"
                  //     : "thumbs-o-up"
                  // }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleLiked(this.props.by._id)}
                />
                <Text>Likes</Text>
                <Text>23</Text>
                {/* <Text>{item.likes.length}</Text> */}
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name="thumbs-o-down"
                  // name={
                  //   item.unlikes.some((a) => a === this.state.loggedInId)
                  //     ? "thumbs-down"
                  //     : "thumbs-o-down"
                  // }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleUnliked(this.props.by._id)}
                />
                <Text>Unlikes</Text>
                <Text>32</Text>
                {/* <Text>{item.unlikes.length}</Text> */}
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name="share"
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() =>
                    this.handleShare(
                      item.heading,
                      item.content,
                      this.props.by.user.userId
                    )
                  }
                />
                <Text>Share</Text>
                <Text>25</Text>
                {/* <Text>{item.shares.length}</Text> */}
              </View>
            </View>
          </View>
        </Animatable.View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.postss.posts}
          renderItem={RenderPost}
          // keyExtractor={(item) => item.id.toString()}
        />
        {this.props.loggedInState.loggedInState ? (
          <FloatMenu
            navigation={navigation}
            name={this.props.by.name}
            username={this.props.by.username}
          />
        ) : (
          <View></View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollView: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  title: {
    fontSize: 32,
  },
  reactionContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginTop: 10,
  },
  reactions: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  icons: {
    flex: 1,
    alignContent: "space-around",
    alignItems: "center",
    marginTop: 5,
    padding: 10,
  },
  lineSeparator: {
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 20,
  },
  postContainer: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
  },
  description: { marginLeft: 10 },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
