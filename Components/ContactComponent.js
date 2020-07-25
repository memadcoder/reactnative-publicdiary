import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

import { SafeAreaView } from "react-native-safe-area-context";

class ContactUs extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <View style={{ margin: 10 }}>
          <Card title="Contact Information" backgroundColor="black">
            <Text style={{ margin: 10 }}>121, Clear Water Bay Road</Text>
            <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
            <Text style={{ margin: 10 }}>HONG KONG</Text>
            <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
            <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
            <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
            <Button
              title="Send Email"
              buttonStyle={{ backgroundColor: "black" }}
              icon={
                <Icon name="envelope-o" type="font-awesome" color="white" />
              }
            />
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

export default ContactUs;
