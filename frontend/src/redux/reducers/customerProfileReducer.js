import { CUSTOMER_PROFILE_UPDATE,CUSTOMER_PROFILE_GET } from "../constants/action-types";

const initialState = {
  isProfileUpdated: null,
  customerProfile: null,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_PROFILE_UPDATE:
      console.log("inside Customer Profile Updatereducer",action.payload);

      return Object.assign({}, state, {
        isProfileUpdated: action.payload.success,
        customerProfile: action.payload,
      
      });

    case CUSTOMER_PROFILE_GET:
      console.log("inside Customer Profile GET", action.payload);
      return Object.assign({}, state, {
        customerProfile: action.payload,
      });
  

    default:
      return state;
  }
}
