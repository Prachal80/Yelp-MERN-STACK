import { RESTAURANT_PROFILE_UPDATE, RESTAURANT_PROFILE_GET } from "../constants/action-types";

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
        isProfileUpdated: true,
        restaurantProfile: action.payload,
        
      });

      case RESTAURANT_PROFILE_GET:
        console.log("inside Restaurant Profile GET", action.payload);
        return Object.assign({}, state, {
          restaurantProfile: action.payload,
        });
    

    default:
      return state;
  }
}
