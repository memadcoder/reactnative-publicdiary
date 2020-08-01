import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

class ContactUs extends Component {
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["hola@gautammadhav.com.np"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <Animatable.View animation="flash" style={{ margin: 10 }}>
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
              onPress={() => this.sendMail()}
              icon={
                <Icon name="envelope-o" type="font-awesome" color="white" />
              }
            />
          </Card>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}

export default ContactUs;
