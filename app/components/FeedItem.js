import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

class FeedItem extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  getInitials(name) {
    if (this.props.initials) {
      return this.props.initials;
    }

    return name.length < 5 ? name : name.split(" ").map((word) => word[0]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.icon, this.props.selected ? styles.selected : {}]}>
          <Text
            style={[
              styles.iconText,
              this.props.selected ? styles.selected : {},
            ]}
          >
            {this.getInitials(this.props.name)}
          </Text>
        </View>
        <Text style={styles.nameText} numberOfLines={1}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    textAlign: "center",
    marginRight: 10,
  },
  icon: {
    flex: 0,
    justifyContent: "center",
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100 / 2,
    padding: 10,
    margin: 10,
    marginBottom: 5,
    width: 50,
    height: 50,
  },
  selected: {
    backgroundColor: "black",
    color: "white",
  },
  iconText: {
    textAlign: "center",
    fontSize: 20,
  },
  nameText: {
    textAlign: "center",
    fontSize: 12,
  },
});

export default FeedItem;
