import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = (props) => {
  const paperTheme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {props.loggedInState ? (
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri:
                      "https://api.adorable.io/avatars/50/abott@adorable.png",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{props.value.name}</Title>
                  <Caption style={styles.caption}>
                    @{props.value.username}
                  </Caption>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {props.value.totalPosts}
                  </Paragraph>
                  <Caption style={styles.caption}>Posts</Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {props.value.totalLikes}
                  </Paragraph>
                  <Caption style={styles.caption}>Likes</Caption>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri:
                      "https://api.adorable.io/avatars/50/abott@adorable.png",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>PUBLIC DIARY</Title>
                  <Caption style={styles.caption}>What's On Your Mind?</Caption>
                </View>
              </View>
            </View>
          )}

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            {props.loggedInState ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="bookmark" color={color} size={size} />
                )}
                label="Highlights"
                onPress={() => {
                  props.navigation.navigate("Highlight");
                }}
              />
            ) : (
              <View></View>
            )}

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="contacts" color={color} size={size} />
              )}
              label="Contact Us"
              onPress={() => {
                props.navigation.navigate("ContactUs");
              }}
            />
            {!props.loggedInState ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="login" color={color} size={size} />
                )}
                label="Sign In"
                onPress={() => {
                  props.navigation.navigate("SignIn");
                }}
              />
            ) : (
              <View></View>
            )}

            {!props.loggedInState ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-plus-outline" color={color} size={size} />
                )}
                label="Sign Up"
                onPress={() => {
                  props.navigation.navigate("SignUp");
                }}
              />
            ) : (
              <View></View>
            )}

            {props.loggedInState ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  props.navigation.navigate("Setting");
                }}
              />
            ) : (
              <View></View>
            )}
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      {props.loggedInState ? (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="logout" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              alert("Sign Out");
            }}
          />
        </Drawer.Section>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
