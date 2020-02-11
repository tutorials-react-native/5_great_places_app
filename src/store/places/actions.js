import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = ({ titleValue, selectedImage }) => async dispatch => {
  const fileName = selectedImage.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: selectedImage,
      to: newPath
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  dispatch({ type: ADD_PLACE, titleValue, selectedImage: newPath });
};
