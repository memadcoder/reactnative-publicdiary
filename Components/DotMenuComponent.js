import React, { useState } from "react";
import { View, Text } from "react-native";

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Icon } from "react-native-elements";

function ThreeDotMenu(props) {
  console.log("loggedIN Id==>", JSON.stringify(props));
  const [loggedIn, setLogIn] = useState(false);
  if (loggedIn) {
    return (
      <MenuProvider>
        <Menu onSelect={(value) => alert(value)}>
          <MenuTrigger>
            <Icon
              name={"dots-three-vertical"}
              type={"entypo"}
              size={20}
              color="black"
              marginRight={60}
              marginTop={15}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text>Settings</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  } else {
    return (
      <MenuProvider>
        <Menu onSelect={(value) => alert(value)}>
          <MenuTrigger>
            <Icon
              name={"dots-three-vertical"}
              type={"entypo"}
              size={20}
              color="black"
              marginRight={60}
              marginTop={15}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text>Report User</Text>
            </MenuOption>
            <MenuOption value={2}>
              <Text>Block</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  }
}

export default ThreeDotMenu;
