export const AUTHENTICATION_ACTIONS = {
  REQUEST_LOGIN: "auth/requestLogin",
  REQUEST_LOGOUT: "auth/requestLogout",
  REQUEST_SIGNUP: "auth/requestSignup",
  LOGIN_SUCCESS: "auth/loginSuccess",
  SET_SUBMITTING_FORM: "auth/setSubmittingForm",
};

export const setSubmittingForm = (status) => {
  return {
    type: AUTHENTICATION_ACTIONS.SET_SUBMITTING_FORM,
    status,
  };
};
export const requestLogin = (loginRequest) => {
  return {
    type: AUTHENTICATION_ACTIONS.REQUEST_LOGIN,
    loginRequest,
  };
};
export const requestSignup = (signupRequest) => {
  return {
    type: AUTHENTICATION_ACTIONS.REQUEST_SIGNUP,
    signupRequest,
  };
};
export const requestLogout = () => {
  return {
    type: AUTHENTICATION_ACTIONS.REQUEST_LOGOUT,
  };
};
export const loginSuccess = (data) => {
  return {
    type: AUTHENTICATION_ACTIONS.LOGIN_SUCCESS,
    data,
  };
};
