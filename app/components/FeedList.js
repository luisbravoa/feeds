import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FeedItem from "./FeedItem";

class FeedList extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      feed: props.feed,
      feeds: props.feeds,
    };
  }

  handleFeedPress = (item) => {
    this.props.onFeedChange && this.props.onFeedChange(item);
    this.setState({
      feed: item,
    });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleFeedPress(item);
        }}
      >
        <FeedItem
          name={item.name}
          selected={this.state.feed === item}
        ></FeedItem>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feeds}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
  },
});

export default FeedList;
