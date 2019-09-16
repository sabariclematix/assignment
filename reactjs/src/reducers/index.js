import { combineReducers } from "redux";

import { notification } from "./notification.reducers";

const rootReducer = combineReducers({
  notification
});

export default rootReducer;
