import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { connect } from "react-redux";
import { registerNewUser } from "../Redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    newEntry: state.registerUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  registerNewUser: (userDetails, navigation) =>
    dispatch(registerNewUser(userDetails, navigation)),
});

const SignUpScreen = ({ navigation, registerNewUser, newEntry }) => {
  const [data, setData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    check_textUserNameChange: false,
    check_emailChange: false,
    check_textNameChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPassword: true,
    isConfirmValidPassword: true,
    isValidName: true,
    isPasswordMatched: true,
  });

  const { colors } = useTheme();

  // const { signIn } = React.useContext(AuthContext);

  const textUserNameChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textUserNameChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textUserNameChange: false,
        isValidUser: false,
      });
    }
  };

  const textNameChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        name: val,
        check_textNameChange: true,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textNameChange: false,
        isValidName: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirmPassword: val,
        isConfirmValidPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isConfirmValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidName = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        isValidName: false,
      });
    }
  };

  const textEmailChange = (val) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.match(mailformat)) {
      setData({
        ...data,
        email: val,
        check_emailChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailChange: false,
        isValidEmail: false,
      });
    }
  };

  const handleValidEmail = (val) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.match(mailformat)) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordMatch = () => {
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        isPasswordMatched: true,
      });
    } else {
      setData({
        ...data,
        isPasswordMatched: false,
      });
    }
  };

  const handleSubmit = async () => {
    // var date = moment().utcOffset("+05:30").format(" Y-MMM-DD hh:mm a");
    console.log("navigation", navigation);
    if (
      data.isValidUser &&
      data.isValidEmail &&
      data.isValidPassword &&
      data.isConfirmValidPassword &&
      data.isPasswordMatched
    ) {
      const userDetails = {
        name: data.name,
        userName: data.username,
        email: data.email,
        password: data.password,
      };
      registerNewUser(userDetails, navigation);
    } else {
      Alert.alert(
        "Registration",
        "Enter the valid entry",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("SignUp"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "white",
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: "black",
            },
          ]}
        >
          Name
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Name"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textNameChange(val)}
            onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
          />
          {data.check_textNameChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidName ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Name must be 4 characters long.</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "black",
              marginTop: 12,
            },
          ]}
        >
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textUserNameChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textUserNameChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "black",
              marginTop: 12,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email Address"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textEmailChange(val)}
            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
          />
          {data.check_emailChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email Should be Valid</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "black",
              marginTop: 12,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "black",
              marginTop: 12,
            },
          ]}
        >
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            onEndEditing={(e) => handlePasswordMatch(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirmSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isConfirmValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        {data.isPasswordMatched ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password didnot matched.</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "black", marginTop: 12 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              handleSubmit();
            }}
          >
            <LinearGradient colors={["black", "white"]} style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={[
              styles.signIn,
              {
                borderColor: "black",
                borderWidth: 1,
                marginTop: 12,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "black",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 15,
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
    marginTop: 5,
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
    marginTop: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
