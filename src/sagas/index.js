import { fork } from "redux-saga/effects";
import authSagas from "./auth";
import classroomSagas from "./classroom";
import questionSagas from "./question";

export default function* rootSaga() {
  yield fork(authSagas);
  yield fork(classroomSagas);
  yield fork(questionSagas);
}
