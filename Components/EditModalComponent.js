import React, { useState, Component } from "react";
import { View, Button, Modal, StyleSheet, Text } from "react-native";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      count: "1",
    };
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }

  render() {
    const { navigation, option, pId, userId } = this.props;

    return (
      <View>
        <Text>{navigation}</Text>
        <Text>{option}</Text>
        <Text>{pId}</Text>
        <Text>{userId}</Text>
      </View>
      //   <Modal
      //     animationType={"slide"}
      //     transparent={false}
      //     visible={this.modalVisible}
      //     onDismiss={false}
      //     onRequestClose={false}
      //   >
      //     <Animatable.View
      //       animation="fadeInUpBig"
      //       style={[
      //         styles.footer,
      //         {
      //           backgroundColor: "white",
      //         },
      //       ]}
      //     >
      //       <Text
      //         style={[
      //           styles.text_footer,
      //           {
      //             color: "black",
      //           },
      //         ]}
      //       >
      //         Username
      //       </Text>
      //       <View style={styles.action}>
      //         <FontAwesome name="user-o" color={colors.text} size={20} />
      //         <TextInput
      //           placeholder="Your Username"
      //           placeholderTextColor="#666666"
      //           style={[
      //             styles.textInput,
      //             {
      //               color: "black",
      //             },
      //           ]}
      //           autoCapitalize="none"
      //           onChangeText={(val) => textInputChange(val)}
      //           onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
      //         />
      //         {data.check_textInputChange ? (
      //           <Animatable.View animation="bounceIn">
      //             <Feather name="check-circle" color="green" size={20} />
      //           </Animatable.View>
      //         ) : null}
      //       </View>
      //       {data.isValidUser ? null : (
      //         <Animatable.View animation="fadeInLeft" duration={500}>
      //           <Text style={styles.errorMsg}>
      //             Username must be 4 characters long.
      //           </Text>
      //         </Animatable.View>
      //       )}

      //       <Text
      //         style={[
      //           styles.text_footer,
      //           {
      //             color: "black",
      //             marginTop: 35,
      //           },
      //         ]}
      //       >
      //         Password
      //       </Text>
      //       <View style={styles.action}>
      //         <Feather name="lock" color={colors.text} size={20} />
      //         <TextInput
      //           placeholder="Your Password"
      //           placeholderTextColor="#666666"
      //           secureTextEntry={data.secureTextEntry ? true : false}
      //           style={[
      //             styles.textInput,
      //             {
      //               color: "black",
      //             },
      //           ]}
      //           autoCapitalize="none"
      //           onChangeText={(val) => handlePasswordChange(val)}
      //         />
      //         <TouchableOpacity onPress={updateSecureTextEntry}>
      //           {data.secureTextEntry ? (
      //             <Feather name="eye-off" color="grey" size={20} />
      //           ) : (
      //             <Feather name="eye" color="grey" size={20} />
      //           )}
      //         </TouchableOpacity>
      //       </View>
      //       {data.isValidPassword ? null : (
      //         <Animatable.View animation="fadeInLeft" duration={500}>
      //           <Text style={styles.errorMsg}>
      //             Password must be 8 characters long.
      //           </Text>
      //         </Animatable.View>
      //       )}

      //       <TouchableOpacity>
      //         <Text style={{ color: "black", marginTop: 15 }}>
      //           Forgot password?
      //         </Text>
      //       </TouchableOpacity>
      //       <View style={styles.button}>
      //         <TouchableOpacity
      //           style={styles.signIn}
      //           // onPress={() => {
      //           //   loginHandle(data.username, data.password);
      //           // }}
      //         >
      //           <LinearGradient colors={["black", "white"]} style={styles.signIn}>
      //             <Text
      //               style={[
      //                 styles.textSign,
      //                 {
      //                   color: "#fff",
      //                 },
      //               ]}
      //             >
      //               Sign In
      //             </Text>
      //           </LinearGradient>
      //         </TouchableOpacity>

      //         <TouchableOpacity
      //           // onPress={() => navigation.navigate("SignUpScreen")}
      //           style={[
      //             styles.signIn,
      //             {
      //               borderColor: "black",
      //               borderWidth: 1,
      //               marginTop: 15,
      //             },
      //           ]}
      //         >
      //           <Text
      //             style={[
      //               styles.textSign,
      //               {
      //                 color: "black",
      //               },
      //             ]}
      //           >
      //             Sign Up
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     </Animatable.View>
      //   </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
    flex: 1,
    padding: 0,
    borderRadius: 8,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditModal;
