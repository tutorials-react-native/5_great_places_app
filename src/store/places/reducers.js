import produce from "immer";

import { actions } from "store";

const INITIAL_STATE = {
  places: []
};

const places = produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_PLACE:
      const { title } = action;
      draft.places.push(title);
      return;
  }
  return;
}, INITIAL_STATE);

export default places;
