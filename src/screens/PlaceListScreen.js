import React, { useEffect } from "react";
import { View, Text, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButton, PlaceItem } from "components";
import { selectors, actions } from "store";

const PlaceListScreen = ({ navigation }) => {
  const places = useSelector(selectors.getPlaces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadPlaces());
  }, [dispatch]);

  const selectItemHandler = item => {
    const { id, title } = item;
    navigation.navigate("PlaceDetail", { id, title });
  };
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        const { title, image, address, lat, lng } = itemData.item;
        return (
          <PlaceItem
            title={title}
            image={image}
            address={address}
            onSelect={selectItemHandler.bind(this, itemData.item)}
          />
        );
      }}
    />
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
