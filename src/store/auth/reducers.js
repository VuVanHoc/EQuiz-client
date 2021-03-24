import { AUTHENTICATION_ACTIONS } from "./actions";

export function authReducer(
  state = {
    isLogin: false,
    token: null,
    user: {},
    isSubmitting: false,
  },
  action
) {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.data.accessToken,
        user: { ...action.data.userDTO },
        isLogin: true,
      };
    }
    case AUTHENTICATION_ACTIONS.REQUEST_LOGOUT: {
      return { ...state, token: null, user: {}, isLogin: false };
    }
    case AUTHENTICATION_ACTIONS.SET_SUBMITTING_FORM: {
      return { ...state, isSubmitting: action.status };
    }
    default: {
      return state;
    }
  }
}
