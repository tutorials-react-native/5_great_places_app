import produce from "immer";

import { actions } from "store";
import Place from "models/place";

const INITIAL_STATE = {
  places: []
};

const places = produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_PLACE:
      const {
        titleValue,
        selectedImage,
        id,
        address,
        selectedLocation
      } = action;
      const newPlace = new Place(
        id.toString(),
        titleValue,
        selectedImage,
        address,
        selectedLocation.lat,
        selectedLocation.lng
      );
      draft.places.push(newPlace);
      return;
    case actions.SET_PLACES:
      draft.places = action.places.map(
        pl =>
          new Place(
            pl.id.toString(),
            pl.title,
            pl.imageUri,
            pl.address,
            pl.lat,
            pl.lng
          )
      );
      return;
  }
  return;
}, INITIAL_STATE);

export default places;
