import React from "react";
import { View, Text } from "react-native";

const PlaceDetailScreen = ({ navigation }) => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("title")
  };
};

export default PlaceDetailScreen;
