import { RESTAURANT_PROFILE_GET } from "../constants/action-types";

const initialState = {
  ProfileGet: null,
};

export default function getProfileReducer(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_PROFILE_GET:
      console.log("inside Restaurant Profile GET", action.payload);
      return Object.assign({}, state, {
        ProfileGet: action.payload,
      });

    default:
      return state;
  }
}
