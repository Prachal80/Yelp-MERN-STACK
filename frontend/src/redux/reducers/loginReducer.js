import { LOGIN } from "../constants/action-types";

const initialState = {
  isLoggedIn: null,
  ErrorMessage: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log("inside LOG_IN reducer");
      return Object.assign({}, state, {
        isLoggedIn: action.payload.success,
        ErrorMessage: action.payload.ErrorMessage
      });

    default:
      return state;
  }
}
