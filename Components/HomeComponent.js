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
import posts from "../shared/posts.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: POSTS,
      loggedInId: 1,
    };
  }
  componentDidMount() {
    console.log("initial", this.state.posts);
  }

  async handleHighligted(pid) {
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id === pid);

    post[0].highlight.indexOf(this.state.loggedInId) === -1
      ? post[0].highlight.push(this.state.loggedInId)
      : post[0].highlight.pop(this.state.loggedInId);

    // post[0].highlight.push(this.state.loggedInId);

    const toPost = post[0];
    // console.log("object to push======>", toPost);
    await this.setState({ ...this.state.posts.posts, toPost });
    // console.log("current state", this.state.posts);
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

  async handleShare(title, description) {
    console.log(title, description);
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
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  handleDelete(pid) {
    console.log(pid);
    const postState = this.state.posts.posts;
    const post = postState.filter((post) => post.id !== pid);
    console.log("after pluck of", post);

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
                title={item.user}
                subtitle={`@` + item.username}
                onPress={() =>
                  navigation.navigate("UserDetail", {
                    name: item.username,
                    userId: item.userId,
                    postId: item.id,
                    loggedIn: this.state.loggedInId,
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
              {item.userId === this.state.loggedInId ? (
                <MenuProvider>
                  <Menu
                    onSelect={(value) => {
                      if (value === 1) {
                        navigation.navigate("EditModal", {
                          navigation: navigation,
                          selected: value,
                          pId: item.id,
                          userId: this.state.loggedInId,
                          titleValue: item.title,
                          descriptionValue: item.description,
                        });
                      } else if (value === 2) {
                        Alert.alert(
                          "Delete Post",
                          "Are you sure you want to delete?",
                          [
                            {
                              text: "Yes",
                              onPress: () => this.handleDelete(item.id),
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
                  <Menu onSelect={(value) => alert("report ")}>
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
              )}
            </View>
          </View>
          <View style={styles.postContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontStyle: "italic" }}>
              {item.date}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={{ fontSize: 16 }}>{item.description}</Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.reactionContainer}>
            <View style={styles.reactions}>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name={
                    item.highlight.some((a) => a === this.state.loggedInId)
                      ? "heart"
                      : "heart-o"
                  }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleHighligted(item.id)}
                />
                <Text>Favorite</Text>
                <Text>{item.highlight.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name={
                    item.likes.some((a) => a === this.state.loggedInId)
                      ? "thumbs-up"
                      : "thumbs-o-up"
                  }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleLiked(item.id)}
                />
                <Text>Likes</Text>
                <Text>{item.likes.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name={
                    item.unlikes.some((a) => a === this.state.loggedInId)
                      ? "thumbs-down"
                      : "thumbs-o-down"
                  }
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleUnliked(item.id)}
                />
                <Text>Unlikes</Text>
                <Text>{item.unlikes.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icons
                  raised
                  reverse
                  name="share"
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.handleShare(item.title, item.description)}
                />
                <Text>Share</Text>
                <Text>{item.shares.length}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.posts.posts}
          renderItem={RenderPost}
          keyExtractor={(item) => item.id.toString()}
        />
        <FloatMenu navigation={navigation} />
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

export default Home;
