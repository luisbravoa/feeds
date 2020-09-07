import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { getSources } from "../api";
import { ScrollView } from "react-native-gesture-handler";
import { addFeed } from "../api";

class FeedFormScreen extends Component {
  constructor(props) {
    super(props);
    const { feed } = props;
    this.state = {
      isNew: !feed,
      id: feed ? feed.id : null,
      name: feed ? feed.name : "",
      q: feed ? feed.q : "",
      sources: feed ? feed.sources : [],
      loading: false,
      allSources: [],
    };
  }

  componentDidMount() {
    getSources().then((response) => {
      this.setState({
        allSources: response.sources,
      });
    });
  }

  handleNameChange = (text) => {
    this.setState({
      name: text,
    });
  };
  handleSearchChange = (text) => {
    this.setState({
      q: text,
    });
  };

  handleSourceChange = (selected) => {
    this.setState({
      sources: Array.from(new Set([...selected])),
    });
  };

  handleSubmit = () => {
    const { name, q, sources } = this.state;

    if (!name && !q) {
      Alert.alert("Please enter required values");
    } else if (!name) {
      Alert.alert("Please enter a name");
    } else if (!q) {
      Alert.alert("Please enter a search term");
    }

    addFeed(name, q, sources).then(() =>
      this.props.navigation.navigate("Feeds")
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fieldHolder}>
          <Text style={styles.fieldLabel}>Name*</Text>
          <TextInput
            style={styles.fieldInput}
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </View>
        <View style={styles.fieldHolder}>
          <Text style={styles.fieldLabel}>Search Query*</Text>
          <TextInput
            style={styles.fieldInput}
            onChangeText={this.handleSearchChange}
            value={this.state.q}
          />
        </View>
        <View style={[styles.sourcesHolder]}>
          <MultiSelect
            hideTags
            items={this.state.allSources}
            uniqueKey="id"
            ref={(component) => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.handleSourceChange}
            selectedItems={this.state.sources}
            selectText="Select Sources"
            searchInputPlaceholderText="Search Available Sources..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
            hideSubmitButton={true}
            styleDropdownMenuSubsection={[
              styles.fieldInput,
              {
                backgroundColor: "transparent",
                padding: 10,
                paddingLeft: 10,
              },
            ]}
            styleInputGroup={{
              backgroundColor: "white",
              padding: 10,
            }}
            styleItemsContainer={{
              backgroundColor: "white",
              height: 300,
            }}
          />
          <ScrollView style={styles.sourceSelection}>
            {this.multiSelect &&
              this.multiSelect.getSelectedItemsExt(this.state.sources)}
          </ScrollView>
        </View>
        <View style={styles.submitHolder}>
          <Button title="Submit" onPress={this.handleSubmit}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 0,
    paddingBottom: 300,
  },
  fieldHolder: {
    marginBottom: 10,
  },
  fieldLabel: {
    marginBottom: 5,
  },
  fieldInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  sourcesHolder: {
    marginTop: 10,
    height: 400,
  },
  sourceSelection: {
    height: 50,
    flex: 0,
  },
  submitHolder: {},
});

export default FeedFormScreen;
