import { SIGNUP } from "../constants/action-types";

const initialState = {
  isSignedup: null,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      console.log("inside Sign up reducer");
      return Object.assign({}, state, {
        isSignedup: action.payload,
      });

    default:
      return state;
  }
}
