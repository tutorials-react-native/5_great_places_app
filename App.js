import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { MainNavigator } from "navigations";
import store from "store/configureStore";
import { init } from "helpers/db";

init()
  .then(() => {
    console.log("Initialized database.");
  })
  .catch(error => {
    console.log("Initializing db failed.");
    console.log(error);
  });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
