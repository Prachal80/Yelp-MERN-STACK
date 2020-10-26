import { CUSTOMER_PROFILE_UPDATE } from "../constants/action-types";

const initialState = {
  isProfileUpdated: null,
  customerProfile: null,
  redirectVar: null,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_PROFILE_UPDATE:
      console.log("inside Customer Profile Updatereducer");
      return Object.assign({}, state, {
        isProfileUpdated: action.payload.success,
        customerProfile: action.payload,
        //redirectVar = <Redirect to="/customer/profile" />
      });

    default:
      return state;
  }
}
