import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import FeedList from "../components/FeedList";
import ArticleList from "../components/ArticleList";
import ActionButton from "react-native-action-button";
import { getFeeds } from "../api";

class FeedsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: null,
      feed: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getFeeds();
    });
    this.getFeeds();
  }

  getFeeds() {
    this.setState({
      loading: true,
    });
    getFeeds().then((feeds) =>
      this.setState({
        loading: false,
        feeds,
        feed: feeds[0] || null,
      })
    );
  }

  handleFeedChange = (feed) => {
    this.setState({
      feed,
    });
  };

  handleNewFeedPress = () => {
    this.props.navigation.navigate("AddFeed");
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {this.state.feeds && (
          <FeedList
            feeds={this.state.feeds}
            feed={this.state.feed}
            onFeedChange={this.handleFeedChange}
          />
        )}
        <View style={styles.content}>
          {this.state.feed && (
            <ArticleList feed={this.state.feed} key={this.state.feed.id} />
          )}
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.handleNewFeedPress}
          ></ActionButton>
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
