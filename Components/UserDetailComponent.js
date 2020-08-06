import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Share, Alert } from "react-native";

import { ListItem, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import Icons from "react-native-vector-icons/FontAwesome";

import POSTS from "../shared/posts";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: POSTS,
      loggedInId: 1,
    };
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

  render() {
    console.log("props in userdetails==>", this.props);
    const { navigation } = this.props;
    const { postId, loggedInId, loggedInState } = this.props.route.params;
    const ans = this.props.route.params;
    const id = ans.userId;
    console.log("userId=>", id);
    const RenderDish = ({ item, index }) => {
      return (
        <Animatable.View
          key={index}
          animation="slideInDown"
          style={styles.postContainer}
        >
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
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 18,
                alignContent: "flex-start",
              }}
            ></View>
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
                <Text>UnLikes</Text>
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
                <Text>Shares</Text>
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
          data={this.state.posts.posts.filter(
            (userPosts) => userPosts.userId == id
          )}
          renderItem={RenderDish}
          keyExtractor={(item) => item.id.toString()}
        />
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

export default UserDetail;
