import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedsScreen from "./app/screens/FeedsScreen";
import FeedFormScreen from "./app/screens/FeedFormScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Feeds"
          component={FeedsScreen}
          options={{ title: "Feeds", header: () => null }}
        />
        <Stack.Screen
          name="AddFeed"
          component={FeedFormScreen}
          options={{ title: "Add Feed" }}
        />
        <Stack.Screen
          name="EditFeed"
          component={FeedFormScreen}
          options={{ title: "Edit Feed" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
