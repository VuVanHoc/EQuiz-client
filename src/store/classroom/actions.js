export const CLASSROOM_ACTIONS = {
  REQUEST_CREATE: "classroom/requestCreate",
  REQUEST_CREATE_SUCCESS: "classroom/requestCreateSuccess",
  REQUEST_UPDATE: "classroom/requestUpdate",
  REQUEST_UPDATE_SUCCESS: "classroom/requestUpdateSuccess",
  REQUEST_FETCH_LIST: "classroom/requestFetchList",
  REQUEST_FETCH_LIST_SUCCESS: "classroom/requestFetchListSuccess",
  SET_STATUS_FETCHING: "classroom/setStatusFetching",
};

export const setStatusFetching = (status) => {
  return {
    type: CLASSROOM_ACTIONS.SET_STATUS_FETCHING,
    status,
  };
};

export const requestCreate = (data) => {
  return {
    type: CLASSROOM_ACTIONS.REQUEST_CREATE,
    data,
  };
};

export const requestFetchList = (data) => {
  return {
    type: CLASSROOM_ACTIONS.REQUEST_FETCH_LIST,
    data,
  };
};

export const requestFetchListSuccess = (data) => {
  return {
    type: CLASSROOM_ACTIONS.REQUEST_FETCH_LIST_SUCCESS,
    data,
  };
};
