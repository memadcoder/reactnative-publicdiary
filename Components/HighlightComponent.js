import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome";

import ReportOptions from "./ReportOptionsComponent";
import POSTS from "../shared/posts";

class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: POSTS,
      loggedInId: 1,
    };
  }

  render() {
    // const { route } = props;
    // const { item } = route.params;

    const ans = this.state.posts.posts.filter(
      (result) => result.highlight == this.state.loggedInId
    );
    console.log("ans=>", ans);

    const RenderHighlight = ({ item, index }) => {
      return (
        <View key={index} style={styles.postContainer}>
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
            >
              <ReportOptions />
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
                  onPress={() => this.setState({ heart: !this.state.heart })}
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
                  onPress={() =>
                    this.setState({ like: !this.state.like, unlike: false })
                  }
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
                <Text>UnLikes</Text>
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
                <Text>Shares</Text>
                <Text>{item.shares.length}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    };

    if (ans.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={styles.text}>You have no highlighted Post...</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={ans}
            renderItem={RenderHighlight}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      );
    }
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

export default Highlight;
