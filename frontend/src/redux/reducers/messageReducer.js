import {POST_RESTAURANT_MESSAGE, POST_CUSTOMER_MESSAGE, GET_MESSAGE} from "../constants/action-types";

const initialState = {
    messages : [],
    
  };


  export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case POST_RESTAURANT_MESSAGE:
            console.log("inside restaurant POST message reducer", action.payload);
          
            console.log("New message restaurant", action.payload.message)
            return Object.assign({}, state, {
                messages: action.payload.messages,
                
         });
         case POST_CUSTOMER_MESSAGE:
            console.log("inside Customer POST message reducer", action.payload);
            console.log("New message customer", action.payload.message)
            return Object.assign({}, state, {
                messages: action.payload.messages,
         }); 

         case GET_MESSAGE:
            console.log("inside Restaurant GET all messages reducer", action.payload);
            return Object.assign({}, state, {
                messages: action.payload.messages,
         }); 
         default:
            return state;
        }
    }