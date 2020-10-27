import {MAKE_ORDER_CUSTOMER, GET_ALL_ORDERS_CUSTOMER, CANCEL_ORDER_CUSTOMER} from "../constants/action-types";


const initialState = {
    orders: [],
    isOrderCancelled : null,
    isMakeOrder: null
  };
  
  export default function customerOrderReducer (state = initialState, action) {
    switch (action.type) {
      case GET_ALL_ORDERS_CUSTOMER:
        console.log("inside restaurant orders GET", action.payload);
        return Object.assign({}, state, {
          ProfileGet: action.payload,
        });
  
      default:
        return state;
    }
  }