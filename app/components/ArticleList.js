import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { getArticles } from "../api";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import ArticleItem from "./ArticleItem";

class ArticleList extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
      articles: [],
    };
  }

  componentDidMount() {
    this.setState({
      refreshing: false,
    });
    this.loadArticles();
  }

  loadArticles = () => {
    const { feed } = this.state;
    this.setState({
      loading: true,
    });
    getArticles(feed.q, feed.sources, this.state.articles.length + 1, 10).then(
      (response) => {
        const { totalResults, articles, status, code, message } = response;

        if (status === "error") {
          Alert.alert(message);
          return this.setState({
            loading: false,
          });
        }

        this.setState({
          loading: false,
          articles: [...(this.state.articles || []), ...(articles || [])],
          totalResults,
          refreshing: false,
        });
      }
    );
  };

  onRefresh = () => {
    this.setState({
      loading: true,
    });
    this.loadArticles();
  };

  onLoadMore = () => {
    if (this.state.articles.length >= 100) {
      return Alert.alert(
        "News API does not allow more than 100 results in the development version"
      );
    }
    if (this.shouldLoadMore) {
      this.loadArticles();
    }
  };

  shouldLoadMore() {
    return this.state.totalResults > this.state.articles.length;
  }

  render() {
    return (
      <View>
        <View key={this.state.feed.id}>
          {
            <FlatList
              data={this.state.articles}
              renderItem={({ item }) => <ArticleItem article={item} />}
              keyExtractor={(item, index) => item.url + index}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              ListEmptyComponent={() => <Text>No Results</Text>}
              ListFooterComponent={() => (
                <View>
                  {this.shouldLoadMore() && (
                    <View style={styles.loadMoreWrapper}>
                      <TouchableHighlight onPress={this.onLoadMore}>
                        <Text>Load More</Text>
                      </TouchableHighlight>
                    </View>
                  )}
                </View>
              )}
              onEndReached={this.onLoadMore}
              onEndReachedThreshold={2}
            ></FlatList>
          }
          {this.state.loading && <ActivityIndicator size="large" />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadMoreWrapper: {
    // height: 100,
    // position: "absolute",
    // bottom: 0,
  },
});

export default ArticleList;
