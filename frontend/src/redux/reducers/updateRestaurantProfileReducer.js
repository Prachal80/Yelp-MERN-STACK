import { RESTAURANT_PROFILE_UPDATE } from "../constants/action-types";

const initialState = {
  isProfileUpdated: null,
  restaurantProfile: null,
  redirectVar: null,
};

export default function updateReducer(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_PROFILE_UPDATE:
      console.log("inside Customer Profile Updatereducer");
      return Object.assign({}, state, {
        isProfileUpdated: action.payload.success,
        restaurantProfile: action.payload,
        //redirectVar = <Redirect to="/customer/profile" />
      });

    default:
      return state;
  }
}
