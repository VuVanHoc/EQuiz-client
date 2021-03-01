export const COMMON_ACTIONS = {
  SET_VISIBLE_MODAL: "common/setVisibleModal",
};

export const setVisibleModal = (id, visible) => {
  return {
    type: COMMON_ACTIONS.SET_VISIBLE_MODAL,
    id,
    visible,
  };
};
