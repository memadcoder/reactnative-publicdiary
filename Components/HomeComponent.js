import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome";

import Navigator from "./ReportPopupMenu";
import POSTS from "../shared/posts";
import FloatMenu from "./FloatingMenu";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: POSTS,
      loggedInId: 1,
      // highlighted: [{ Id: 1 }],
    };
  }
  componentDidMount() {
    //console.log("is this answer=>", this.state.posts);
    console.log(this.state.highlighted);
  }
  // updateHighlight(postId) {
  //   console.log(postId);
  //   if (this.state.highlighted.findIndex((id) => id.Id === postId) === -1) {
  //     console.log("added to favorites");

  //     const update = {
  //       Id: postId,
  //     };
  //     var newState = this.state.highlighted.concat(update);
  //     this.setState({ highlighted: newState });
  //     console.log(this.state.highlighted);
  //     postId = null;
  //   } else {
  //     console.log("removing favorites");
  //     var newState = this.state.highlighted.filter((hi) => hi.Id !== postId);
  //     this.setState({ highlighted: newState });
  //     postId = null;
  //   }
  //   // console.log("loggedInId=>", this.state.loggedInId, "postId=>", post);
  //   // const highlights = this.state.posts.highlights.some(
  //   //   (highlight) =>
  //   //     highlight.postId === post && highlight.userId === this.state.loggedInId
  //   // );
  //   // console.log("exists=>", highlights);
  // }

  render() {
    const { navigation } = this.props;

    const RenderPost = ({ item, index }) => {
      //console.log("post=>, index=>", item, index);
      // console.log("item id", item.id);
      return (
        <View
          key={index}
          style={{ backgroundColor: "white", margin: 10, padding: 10 }}
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
                subtitle={item.username}
                chevron
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
              <Navigator loggedInId={this.state.loggedInId} />
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
          <Text style={{ fontSize: 16 }}>{item.description}</Text>
          <View style={styles.lineSeparator} />
          <View style={styles.reactionContainer}>
            <View style={styles.reactions}>
              <View style={styles.icons}>
                <Icon
                  raised
                  reverse
                  name={
                    item.highlight.some(
                      (a) => a.userId === this.state.loggedInId
                    )
                      ? "heart"
                      : "heart-o"
                  }
                  type="font-awesome"
                  size={32}
                  color=""
                  // onPress={() => this.updateHighlight(item.id)}
                />
                <Text>Favorite</Text>
                <Text>{item.highlight.length}</Text>
              </View>
              <View style={styles.icons}>
                <Icon
                  raised
                  reverse
                  name={
                    item.likes.some((a) => a.userId === this.state.loggedInId)
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
                    item.unlikes.some((a) => a.userId === this.state.loggedInId)
                      ? "thumbs-down"
                      : "thumbs-o-down"
                  }
                  type="font-awesome"
                  size={32}
                  color=""
                  // onPress={() =>
                  //   this.setState({ unlike: !this.state.unlike, like: false })
                  // }
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
        </View>
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
    alignContent: "space-between",
    margin: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
  lineSeparator: {
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 20,
  },
});

export default Home;
