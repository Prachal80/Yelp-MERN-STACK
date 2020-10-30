import {GET_ORDERS_RESTAURANT, CHANGE_ORDER_STATUS_RESTAURANT} from "../constants/action-types";

const initialState = {
    orders: [],
    isOrderStatusChanged : null,
    isGetOrders:null
  };
  
  export default function restaurantOrderReducer (state = initialState, action) {
    switch (action.type) {
      case GET_ORDERS_RESTAURANT:
        console.log("inside restaurant orders GET", action.payload);
        return Object.assign({}, state, {
          isGetOrders:action.payload.success,
          orders: action.payload.orders
        });

        case CHANGE_ORDER_STATUS_RESTAURANT:
        console.log("inside restaurant update orders POST", action.payload);
        let newOrder = action.payload.order;

          // console.log("to update order: ", newOrder);
          //let orderVar = state.orders.filter(order => order._id != newOrder._id);
          //orderVar.push(newOrder);
          let updateOrder =[];
          let length = state.orders.length;
          for(let i = 0 ; i < length; i++){
            if(state.orders[i]._id===newOrder._id)
            { 
              console.log("Inside if", newOrder._id);
              updateOrder.push(newOrder);
              
            }
            else{
              updateOrder.push(state.orders[i]);
            }
          }

          // state.orders = updateOrder;
          // updateOrder.map(order => {
          //   if(order._id === newOrder._id ){
          //     order = newOrder
          //     console.log("New Order", order);
          //   }
            
          // });
          //console.log("Updated order in reducer cancel : ",state.orders);

        return Object.assign({}, state, {
          orders: updateOrder,
          isOrderStatusChanged: action.payload.success,
        });
  
      default:
        return state;
    }
  }
  