import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "colors";
import MapPreview from "./MapPreview";

const LocationPicker = ({ navigation, onSelectLocation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();

  const selectedPointLocation = navigation.getParam("selectedPoint");

  useEffect(() => {
    if (selectedPointLocation) {
      setCurrentLocation(selectedPointLocation);
      onSelectLocation(selectedPointLocation);
    }
  }, [selectedPointLocation, onSelectLocation]);

  const veryfyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions.",
        "You need a permission on location to use it.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getUserLocationHandler = async () => {
    const hasPermission = await veryfyPermission();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      const { latitude, longitude } = location.coords;
      setCurrentLocation({
        lat: latitude,
        lng: longitude
      });
      onSelectLocation({
        lat: latitude,
        lng: longitude
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreView}>
        <MapPreview
          location={currentLocation}
          style={styles.mapPreView}
          onPress={pickOnMapHandler}
        >
          {isFetching ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Text>Location is not selected yet.</Text>
          )}
        </MapPreview>
      </View>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getUserLocationHandler}
        />

        <Button
          title="Pick On map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    alignItems: "center"
  },
  mapPreView: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default LocationPicker;
