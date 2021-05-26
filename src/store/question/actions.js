export const QUESTION_ACTIONS = {
  REQUEST_FETCH_LIST: "question/requestFetchList",
  REQUEST_FETCH_LIST_SUCCESS: "question/requestFetchListSuccess",
  SET_STATUS_FETCHING: "question/setStatusFetching",
};

export const requestFetchList = (data) => {
  return {
    type: QUESTION_ACTIONS.REQUEST_FETCH_LIST,
    data,
  };
};

export const requestFetchListSuccess = (data) => {
  return {
    type: QUESTION_ACTIONS.REQUEST_FETCH_LIST_SUCCESS,
    data,
  };
};
export const setStatusFetching = (status) => {
  return {
    type: QUESTION_ACTIONS.SET_STATUS_FETCHING,
    status,
  };
};
