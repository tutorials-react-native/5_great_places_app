import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Colors from "colors";

const PlaceItem = ({ image, title, address, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "flex-start",
    width: 250
  },
  title: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    color: "#666"
  }
});

export default PlaceItem;
