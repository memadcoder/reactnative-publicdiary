import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import Icon from "react-native-vector-icons/FontAwesome";

import ReportOptions from "./ReportOptionsComponent";
import POSTS from "../shared/posts.js";
import FloatMenu from "./FloatingMenu";

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

  handleLiked() {}

  handleUnliked() {}

  render() {
    const { navigation } = this.props;

    const RenderPost = ({ item, index }) => {
      return (
        <Animatable.View
          animation="slideInDown"
          key={index}
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
              <ReportOptions
                loggedInId={this.state.loggedInId}
                navigation={navigation}
              />
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
                <Icon
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
                <Icon
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
                  // onPress={() =>
                  //   this.setState({ like: !this.state.like, unlike: false })
                  // }
                />
                <Text>Likes</Text>
                <Text>{item.likes.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icon
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
                  onPress={() =>
                    this.setState({ unlike: !this.state.unlike, like: false })
                  }
                />
                <Text>Unlikes</Text>
                <Text>{item.unlikes.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icon
                  raised
                  reverse
                  name="share"
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => alert("share")}
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
