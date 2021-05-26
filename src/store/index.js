import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { commonReducer } from "./common/reducers";
import { classroomReducer } from "./classroom/reducers";
import { questionReducer } from "./question/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  classroom: classroomReducer,
  question: questionReducer,
});

export default rootReducer;
