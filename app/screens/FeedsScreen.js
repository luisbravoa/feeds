import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import FeedList from "../components/FeedList";
import ArticleList from "../components/ArticleList";
import ActionButton from "react-native-action-button";

const feeds = [
  {
    id: "1",
    name: "iPhone news",
    q: "iphone",
    sources: [],
  },
  {
    id: "2",
    name: "Android news",
    q: "android",
    sources: [],
  },
  {
    id: "3",
    name: "Javascript news",
    q: "Javascript",
    sources: [],
  },
  {
    id: "4",
    name: "PHP news",
    q: "PHP",
    sources: [],
  },
];

class FeedsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: feeds,
      feed: feeds[0],
    };
  }

  handleFeedChange = (feed) => {
    this.setState({
      feed,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FeedList
          feeds={this.state.feeds}
          feed={this.state.feed}
          onFeedChange={this.handleFeedChange}
        />
        <View style={styles.content}>
          <ArticleList feed={this.state.feed} key={this.state.feed.id} />
          <ActionButton buttonColor="rgba(231,76,60,1)"></ActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    marginTop: 5,
  },
});

export default FeedsScreen;
