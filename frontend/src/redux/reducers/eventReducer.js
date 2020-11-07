import { GET_CUSTOMER_UNREGISTERED_EVENTS_ASC,GET_CUSTOMER_UNREGISTERED_EVENTS_DESC,GET_CUSTOMER_REGISTERED_EVENTS, GET_CUSTOMER_SINGLE_EVENT,GET_CUSTOMER_IS_REGISTERED,POST_CUSTOMER_REGISTER_EVENT, GET_RESTAURANT_EVENTS, GET_REGISTERED_CUSTOMERS ,POST_RESTAURANT_EVENTS } from "../constants/action-types";

const initialState = {
  events : [],
  registered_events : [],
  getAllEvents: null,
  isRegistered: null,
  registered_customers : [],
  restaurant_events: [],
  isNewEventAdded:null,

};

export default function customerEventReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER_UNREGISTERED_EVENTS_ASC:
            console.log("inside Customer GET all unregistered events reducer", action.payload);
            return Object.assign({}, state, {
                events: action.payload.events,
                getAllEvents: action.payload.success
         });
        
         case GET_CUSTOMER_UNREGISTERED_EVENTS_DESC:
            console.log("inside Customer GET all unregistered events in descending order reducer", action.payload);
            return Object.assign({}, state, {
                events: action.payload.events,
                getAllEvents: action.payload.success
         });
        
         
        case GET_CUSTOMER_REGISTERED_EVENTS:
            console.log("Inside customer GET all registered events reducer", action.payload); 
            return Object.assign({}, state, {
                registered_events: action.payload.registered_events,
            })

        case GET_CUSTOMER_SINGLE_EVENT:
            console.log("Inside customer GET single event", action.payload); 
            return Object.assign({}, state, {
                event: action.payload.event,
            })
            
        case GET_CUSTOMER_IS_REGISTERED:
            console.log("Inside customer if registered", action.payload); 
            return Object.assign({}, state, {
                getAllEvents: action.payload.success,
            })   
            
        case POST_CUSTOMER_REGISTER_EVENT:
            console.log("Inside customer registere request", action.payload); 
            return Object.assign({}, state, {
                isRegistered: action.payload,
            })    
        case GET_RESTAURANT_EVENTS:
            console.log("Inside Restaurant register reducer", action.payload); 
            return Object.assign({}, state, {
                restaurant_events: action.payload,
            })
        case GET_REGISTERED_CUSTOMERS:
            console.log("Inside Restaurant get registered customers reducer", action.payload); 
            return Object.assign({}, state, {
                registered_customers: action.payload,
            })       
        case POST_RESTAURANT_EVENTS:
            console.log("Inside Restaurant POST event reducer", action.payload);
            
            let eventArr = state.restaurant_events;
            eventArr.push(action.payload.event);
            console.log("New Event array", eventArr)

            return Object.assign({}, state, {
                restaurant_events: eventArr,
                isNewEventAdded: action.payload.success,
                
            }) 

      default:
        return state;
    }
  }
  