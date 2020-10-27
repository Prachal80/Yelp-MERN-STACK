import {GET_ORDERS_RESTAURANT, CHANGE_ORDER_STATUS_RESTAURANT} from "../constants/action-types";

const initialState = {
    orders: [],
    isOrderStatusChanged : null
  };
  
  export default function restaurantOrderReducer (state = initialState, action) {
    switch (action.type) {
      case GET_ORDERS_RESTAURANT:
        console.log("inside restaurant orders GET", action.payload);
        return Object.assign({}, state, {
          ProfileGet: action.payload,
        });
  
      default:
        return state;
    }
  }
  