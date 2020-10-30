import {MAKE_ORDER_CUSTOMER, GET_ALL_ORDERS_CUSTOMER, CANCEL_ORDER_CUSTOMER} from "../constants/action-types";


const initialState = {
    orders: [],
    isGetAllOeders: null,
    isOrderCancelled : null,
    isMakeOrder: null
  };
  
  export default function customerOrderReducer (state = initialState, action) {
    switch (action.type) {
      case GET_ALL_ORDERS_CUSTOMER:
        console.log("inside customer orders GET", action.payload);
        return Object.assign({}, state, {
          isGetAllOeders: action.payload.success,
          orders: action.payload.orders,
        });
        case MAKE_ORDER_CUSTOMER:
          console.log("inside customer make order POST", action.payload);
          // let toAdd = action.payload.order;
          // console.log("to add order: ", toAdd);
          // let newOrders = [];
          // state.orders = state.orders.push(toAdd);
          // newOrders = state.orders;
          // console.log("state order array", state.orders);
          // console.log("New order array", newOrders);
          return Object.assign({}, state, {
            isMakeOrder: action.payload.success,
            orders: action.payload.order,
          });

        case CANCEL_ORDER_CUSTOMER:
          console.log("inside cancel order customer POST", action.payload);
          let todelete = action.payload.order;
          console.log("to delete order: ", todelete);
          let orderVar = state.orders.filter(order => order._id != action.payload.order._id);
          console.log("Updated order in reducer cancel : ",orderVar);
          return Object.assign({}, state, {
            isOrderCancelled: action.payload.success,
            orders : orderVar,
            //someArray = someArray.filter(person => person.name != 'John');
          })
      default:
        return state;
    }
  }