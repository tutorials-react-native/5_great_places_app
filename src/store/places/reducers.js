import produce from "immer";

import { actions } from "store";
import Place from "models/place";

const INITIAL_STATE = {
  places: []
};

const places = produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_PLACE:
      const { titleValue, selectedImage } = action;
      const newPlace = new Place(
        new Date().toISOString(),
        titleValue,
        selectedImage
      );
      draft.places.push(newPlace);
      return;
  }
  return;
}, INITIAL_STATE);

export default places;
