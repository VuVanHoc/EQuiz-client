import { CLASSROOM_ACTIONS } from "./actions";
import { AUTHENTICATION_ACTIONS } from "../auth/actions";

export function classroomReducer(
  state = {
    isFetching: false,
    isSubmittingForm: false,
    orderBy: "createdDate",
  },
  action
) {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.REQUEST_LOGOUT:
      return {
        isFetching: false,
        isSubmittingForm: false,
        orderBy: "createdDate",
      };
    case CLASSROOM_ACTIONS.REQUEST_FETCH_LIST_SUCCESS:
      return {
        ...state,
        dataSource: action.data.dataSource || [],
        totalResult: action.data.totalResult,
      };
    case CLASSROOM_ACTIONS.SET_STATUS_FETCHING:
      return { ...state, isFetching: action.status };
    default:
      return state;
  }
}
