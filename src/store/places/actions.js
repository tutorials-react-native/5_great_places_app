import * as FileSystem from "expo-file-system";
import { insertPlace, getPlaces } from "helpers/db";
import { googleMapApi } from "api";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = ({
  titleValue,
  selectedImage,
  selectedLocation
}) => async dispatch => {
  const response = await googleMapApi.convertCoordToAddress(
    selectedLocation.lat,
    selectedLocation.lng
  );
  const resData = response.data;
  const address = resData.results[0].formatted_address;
  const fileName = selectedImage.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: selectedImage,
      to: newPath
    });
    const dbResult = await insertPlace({
      title: titleValue,
      imageUri: newPath,
      address: address,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng
    });
    dispatch({
      type: ADD_PLACE,
      id: dbResult.insertId,
      titleValue,
      selectedImage: newPath,
      address,
      selectedLocation
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadPlaces = () => async dispatch => {
  const dbResult = await getPlaces();
  dispatch({ type: SET_PLACES, places: dbResult.rows._array });
};
