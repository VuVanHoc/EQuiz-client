import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  AUTHENTICATION_ACTIONS,
  loginSuccess,
  setSubmittingForm,
} from "../store/auth/actions";
import md5 from "md5";
import http from "../api";
import {
  NotificationSuccess,
  NotificationError,
} from "../common/components/Notification";
import history from "../utils/history";
import { ROUTES_PATH } from "../common/Constants";
import { delay } from "redux-saga/effects";
function* requestLogin({ loginRequest }) {
  yield put(setSubmittingForm(true));

  try {
    const res = yield call(http.post, `/api/auth/login`, {
      username: loginRequest.username,
      password: md5(loginRequest.password),
    });

    if (res) {
      yield put(setSubmittingForm(false));
      NotificationSuccess(`Xin chào ${res.userDTO?.fullName}`);
      yield put(loginSuccess(res));
    }
  } catch (error) {
    yield put(setSubmittingForm(false));
    NotificationError(
      "Đăng nhập không thành công",
      "Tên đăng nhập hoặc mật khẩu chưa đúng"
    );
  }
}

function* requestSignUp({ signupRequest }) {
  yield put(setSubmittingForm(true));

  try {
    const res = yield call(http.post, `/api/auth/signup`, {
      ...signupRequest,
      password: md5(signupRequest.password),
      confirmPassword: md5(signupRequest.confirmPassword),
    });
    if (res) {
      yield put(setSubmittingForm(false));
      NotificationSuccess(
        `Đăng ký thành công`,
        `Vui lòng xác nhận email để kích hoạt tài khoản`
      );
      history.push(ROUTES_PATH.LOGIN);
    }
  } catch (error) {
    yield put(setSubmittingForm(false));
  }
}
function* authSagas() {
  yield takeLatest(AUTHENTICATION_ACTIONS.REQUEST_LOGIN, requestLogin);
  yield takeLatest(AUTHENTICATION_ACTIONS.REQUEST_SIGNUP, requestSignUp);
}

export default authSagas;
