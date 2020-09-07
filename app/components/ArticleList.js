import React, { Component } from "react";
import { View, ActivityIndicator, RefreshControl } from "react-native";
import { getArticles } from "../api";
import { FlatList } from "react-native-gesture-handler";
import ArticleItem from "./ArticleItem";

class ArticleList extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
    };
  }

  componentDidMount() {
    this.setState({
      refreshing: false,
    });
    this.loadArticles();
  }

  loadArticles() {
    const { feed } = this.state;
    this.setState({
      loading: true,
    });
    getArticles(feed.q).then((response) => {
      const { totalResults, articles } = response;
      this.setState({
        loading: false,
        articles,
        totalResults,
        refreshing: false,
      });
    });
  }

  onRefresh = () => {
    this.setState({
      loading: true,
    });
    this.loadArticles();
  };

  render() {
    return (
      <View key={this.state.feed.id}>
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <ArticleItem article={item} />}
          keyExtractor={(item) => item.url}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        ></FlatList>
        {this.state.loading && <ActivityIndicator size="large" />}
      </View>
    );
  }
}

export default ArticleList;
