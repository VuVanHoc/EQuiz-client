export const AUTHENTICATION_ACTIONS = {
  REQUEST_LOGIN: "auth/requestLogin",
  REQUEST_LOGOUT: "auth/requestLogout",
};

export const requestLogin = (params) => {
  return {
    type: AUTHENTICATION_ACTIONS.REQUEST_LOGIN,
    payload: params,
  };
};

export const requestLogout = () => {
  return {
    type: AUTHENTICATION_ACTIONS.requestLogout,
  };
};
