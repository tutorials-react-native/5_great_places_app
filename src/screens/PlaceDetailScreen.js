import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

import MapPreview from "components/LocationPicker/MapPreview";
import { selectors } from "store";
import Colors from "colors";

const PlaceDetailScreen = ({ navigation }) => {
  const placeId = navigation.getParam("id");
  const place = useSelector(selectors.getPlaceById(placeId));
  const { image, address, lat, lng } = place;

  const pressMapPreviewHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initialLocation: { lat, lng }
    });
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          location={{ lat, lng }}
          style={styles.mapPreview}
          onPress={pressMapPreviewHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    backgroundColor: "#ccc"
  },
  locationContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    width: "90%",
    maxWidth: 350,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  addressContainer: {
    padding: 20
  },

  address: {
    color: Colors.primary,
    textAlign: "center"
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden"
  }
});

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("title")
  };
};

export default PlaceDetailScreen;
