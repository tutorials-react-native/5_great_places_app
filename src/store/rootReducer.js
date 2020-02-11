import { combineReducers } from "redux";

import places from "./places/reducers";

const rootReducer = combineReducers({
  places
});

export default rootReducer;
