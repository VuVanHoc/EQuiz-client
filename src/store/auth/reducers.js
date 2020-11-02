import { AUTHENTICATION_ACTIONS } from "./actions";

export function authReducer(
  state = {
    isLogin: false,
    token: {},
    user: {},
  },
  action
) {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.REQUEST_LOGIN: {
      return { ...state };
    }
    case AUTHENTICATION_ACTIONS.REQUEST_LOGOUT: {
      return { ...state, token: {}, user: {} };
    }
    default: {
      return state;
    }
  }
}
