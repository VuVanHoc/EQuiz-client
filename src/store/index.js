import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { commonReducer } from "./common/reducers";
import { classroomReducer } from "./classroom/reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  classroom: classroomReducer,
});

export default rootReducer;
