import { fork } from "redux-saga/effects";
import authSagas from "./auth";
import classroomSagas from "./classroom";

export default function* rootSaga() {
  yield fork(authSagas);
  yield fork(classroomSagas);
}
