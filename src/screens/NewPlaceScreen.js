import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView
} from "react-native";

import Colors from "colors";
import { actions } from "store";

const NewPlaceScreen = () => {
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();

  const changeTitleHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(actions.addPlace(titleValue));
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChangeText={changeTitleHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "New Place"
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  label: {
    fontSize: 18,
    paddingVertical: 10
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default NewPlaceScreen;
