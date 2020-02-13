import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "colors";

const MapScreen = ({ navigation }) => {
  const initialLocation = navigation.getParam("initialLocation");
  const readonly = navigation.getParam("readonly");
  const [selectedPoint, setSelectedPoint] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectPointHandler = event => {
    if (readonly) {
      return;
    }
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedPoint({
      lat: latitude,
      lng: longitude
    });
  };

  const saveSelectedPointHandler = useCallback(() => {
    navigation.navigate("NewPlace", { selectedPoint });
  }, [selectedPoint]);

  useEffect(() => {
    navigation.setParams({ saveHandler: saveSelectedPointHandler });
  }, [saveSelectedPointHandler]);

  let markerCoordinates;
  if (selectedPoint) {
    markerCoordinates = {
      latitude: selectedPoint.lat,
      longitude: selectedPoint.lng
    };
  }
  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectPointHandler}>
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => {
  const readonly = navigation.getParam("readonly");
  if (readonly) {
    return {};
  }
  const saveSelectedPointHandler = navigation.getParam("saveHandler");
  return {
    headerTitle: "Map",
    headerRight: () => (
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveSelectedPointHandler}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  saveButton: {
    marginRight: 10
  },
  saveButtonText: {
    fontSize: 16,
    color: Platform.OS === "ios" ? Colors.primary : "white"
  }
});

export default MapScreen;
