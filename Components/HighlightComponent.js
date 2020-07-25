import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome";

import Navigator from "./ReportPopupMenu";

class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [
        {
          id: 0,
          name: "Uthappizza",
          image: "images/uthappizza.png",
          category: "mains",
          label: "Hot",
          price: "4.99",
          featured: true,
          description:
            "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
        },
      ],
      heart: false,
      like: false,
      unlike: false,
      share: false,
    };
  }

  render() {
    // const { route } = props;
    // const { item } = route.params;

    const RenderHighlight = ({ item, index }) => {
      return (
        <View style={{ backgroundColor: "white", margin: 10, padding: 10 }}>
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
                title="Madhav Gautam"
                subtitle="@memadcoder"
                chevron
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 18,
                alignContent: "flex-start",
              }}
            >
              <Navigator />
            </View>
          </View>
          <View style={styles.postContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 14, fontStyle: "italic" }}>
              {item.category}
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
                  name={this.state.heart ? "heart" : "heart-o"}
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() => this.setState({ heart: !this.state.heart })}
                />
                <Text>Favorite</Text>
                <Text>9</Text>
              </View>
              <View style={styles.icons}>
                <Icon
                  raised
                  reverse
                  name={this.state.like ? "thumbs-up" : "thumbs-o-up"}
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() =>
                    this.setState({ like: !this.state.like, unlike: false })
                  }
                />
                <Text>Likes</Text>
                <Text>346</Text>
              </View>
              <View style={styles.icons}>
                <Icon
                  raised
                  reverse
                  name={this.state.unlike ? "thumbs-down" : "thumbs-o-down"}
                  type="font-awesome"
                  size={32}
                  color=""
                  onPress={() =>
                    this.setState({ unlike: !this.state.unlike, like: false })
                  }
                />
                <Text>UnLikes</Text>
                <Text>566</Text>
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
                <Text>100</Text>
              </View>
            </View>
          </View>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.dishes}
          renderItem={RenderHighlight}
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

export default Highlight;
