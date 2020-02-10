import React from "react";
import { View, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { HeaderButton } from "components";

const PlaceListScreen = () => {
  return (
    <View>
      <Text>PlaceListScreen</Text>
    </View>
  );
};

PlaceListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Places",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="add"
        iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
        onPress={() => {
          navigation.navigate("NewPlace");
        }}
      />
    </HeaderButtons>
  )
});

export default PlaceListScreen;
