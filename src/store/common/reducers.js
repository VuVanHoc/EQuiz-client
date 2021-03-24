import { COMMON_ACTIONS } from "./actions";
export function commonReducer(
  state = {
    overviewType: null,
    visibleModals: {},
  },
  action
) {
  switch (action.type) {
    case COMMON_ACTIONS.SET_VISIBLE_MODAL:
      return {
        ...state,
        visibleModals: {
          ...state.visibleModals,
          [action.id]: action.visible,
        },
      };
    default:
      return state;
  }
}
