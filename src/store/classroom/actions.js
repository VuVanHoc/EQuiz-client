export const CLASSROOM_ACTIONS = {
  REQUEST_CREATE: "classroom/requestCreate",
  REQUEST_CREATE_SUCCESS: "classroom/requestCreateSuccess",
  REQUEST_UPDATE: "classroom/requestUpdate",
  REQUEST_UPDATE_SUCCESS: "classroom/requestUpdateSuccess",
};

export const requestCreate = (data) => {
  return {
    type: CLASSROOM_ACTIONS.REQUEST_CREATE,
    data,
  };
};

export const requestCreateSuccess
