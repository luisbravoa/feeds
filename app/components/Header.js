import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

class Header extends Component {
  state = {};
  render() {
    return (
      <View style={{}}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/signal-21.png")}
          ></Image>
          <Text style={styles.name}>Feeds</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 20 : 0,
    flex: 0,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "gainsboro",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  logo: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Header;
