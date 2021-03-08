import { takeLatest } from "redux-saga/effects";
import {
  CLASSROOM_ACTIONS,
  requestFetchListSuccess,
  setStatusFetching,
  requestFetchList as requestFetchListAction,
} from "../store/classroom/actions";
import http from "../api";
import { call, put, select } from "@redux-saga/core/effects";
import { message } from "antd";
import { setVisibleModal } from "../store/common/actions";
import {
  NotificationSuccess,
  NotificationError,
} from "../common/components/Notification";

function* requestCreateClassroom({ data }) {
  const state = yield select();
  try {
    const res = yield call(http.post, `/api/classroom/create`, { ...data });
    console.log(res);
    if (res) {
      NotificationSuccess("Tạo lớp học mới thành công");
      yield put(requestFetchListAction({ pageSize: 5 }));
      yield put(setVisibleModal("createClassroom", false));
    }
  } catch (error) {}
}

function* requestFetchList({ data }) {
  yield put(setStatusFetching(true));
  const state = yield select();
  try {
    const body = {
      orderBy: state.classroom.orderBy || "createdDate",
      orderByAsc: false,
      responsibleId: state.auth.user.userId,
      searchText: "",
    };
    const res = yield call(http.post, `/api/classroom/getList`, body, {
      params: {
        pageIndex: data.pageIndex || 0,
        pageSize: data.pageSize || 5,
      },
    });
    if (res) {
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
function* classroomSagas() {
  yield takeLatest(CLASSROOM_ACTIONS.REQUEST_FETCH_LIST, requestFetchList);
  yield takeLatest(CLASSROOM_ACTIONS.REQUEST_CREATE, requestCreateClassroom);
}

export default classroomSagas;
