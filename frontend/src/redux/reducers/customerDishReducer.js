import { CUSTOMER_GET_ALL_REST } from "../constants/action-types";

const initialState = {
  restaurants : [],
};

export default function customerDishReducer(state = initialState, action) {
    switch (action.type) {
      case CUSTOMER_GET_ALL_REST:
        console.log("inside Customer GET all restaurants", action.payload);
        return Object.assign({}, state, {
          restaurants: action.payload,
        });
  
      default:
        return state;
    }
  }
  