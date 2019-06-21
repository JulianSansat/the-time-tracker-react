import { ERROR } from "../actions/types";
const INITIAL_STATE = {
  errors: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR:
      let error = action.payload;
      return { ...state.errors, error };
    default:
      return state;
  }
};
