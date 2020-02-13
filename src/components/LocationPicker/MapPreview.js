import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

import ENV from "env";

const env = ENV();

const MapPreview = ({ location, children, style, onPress }) => {
  let ImagePreviewUrl;
  if (location) {
    const { lat, lng } = location;
    ImagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${env.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image source={{ uri: ImagePreviewUrl }} style={styles.mapImage} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});

export default MapPreview;
