import {
  QUESTION_ACTIONS,
  setStatusFetching,
  requestFetchListSuccess,
} from "../store/question/actions";
import { takeLatest } from "redux-saga/effects";
import { call, put, select } from "@redux-saga/core/effects";
import http from "../api";

function* requestFetchList({ data }) {
  yield put(setStatusFetching(true));
  const state = yield select();
  try {
    const body = {
      orderBy: state.question.orderBy || "createdDate",
      orderByAsc: false,
      userId: state.auth.user.userId,
      ownerId: state.auth.user.userId,
      searchText: "",
    };
    const res = yield call(http.post, `/api/question/list`, body, {
      params: {
        pageIndex: data.pageIndex || 0,
        pageSize: data.pageSize || 10,
      },
    });
    if (res) {
      console.log("res:", res);
      yield put(
        requestFetchListSuccess({
          dataSource: res.data,
          totalResult: res.total,
        })
      );
      yield put(setStatusFetching(false));
    }
  } catch (error) {
    yield put(setStatusFetching(false));
  }
}

function* questionSagas() {
  yield takeLatest(QUESTION_ACTIONS.REQUEST_FETCH_LIST, requestFetchList);
}

export default questionSagas;
