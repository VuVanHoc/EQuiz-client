import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { commonReducer } from "./common/reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
});

export default rootReducer;
