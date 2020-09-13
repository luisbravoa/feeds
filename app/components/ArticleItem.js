import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Button, Linking } from "react-native";

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.article.urlToImage }}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>{this.props.article.title}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {this.props.article.description}
          </Text>
          <Button
            onPress={() => Linking.openURL(this.props.article.url)}
            title="Visit Website"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    borderRadius: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: 400,
    backgroundColor: "grey",
  },
  contentWrapper: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ArticleItem;
