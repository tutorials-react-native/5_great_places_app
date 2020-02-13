import React, { useState, useCallback } from "react";
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
import { ImagePicker, LocationPicker } from "components";

const NewPlaceScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const changeTitleHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(actions.addPlace({ titleValue, selectedImage, selectedLocation }));
    navigation.goBack();
  };

  const imageTakenHandler = imageUri => {
    setSelectedImage(imageUri);
  };

  const selectLocationHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChangeText={changeTitleHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          onSelectLocation={selectLocationHandler}
          navigation={navigation}
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
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default NewPlaceScreen;
