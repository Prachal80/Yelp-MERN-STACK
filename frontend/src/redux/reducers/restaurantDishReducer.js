import { RESTAURANT_ADD_DISH, RESTAURANT_GET_ALL_DISH,RESTAURANT_UPDATE_DISH } from "../constants/action-types";
const initialState = {
  dishes : [],
  isUpdateDish: null,
  isDishAdded: null,
};

export default function restaurantDishReducer(state = initialState, action) {
    switch (action.type) {
      case RESTAURANT_GET_ALL_DISH:
        console.log("inside restaurant GET all dishes", action.payload);
        return Object.assign({}, state, {
          dishes: action.payload,
        });
        
      case RESTAURANT_ADD_DISH:
        console.log("inside restaurant add dish", action.payload);
        return Object.assign({},state,{
            dishes: action.payload.dish,
            isDishAdded: action.payload.success,
            
          });
          
      case RESTAURANT_UPDATE_DISH:
        console.log("inside restaurant update all dishes", action.payload);
        return Object.assign({},state,{
          dishes: action.payload.dish,
            isUpdateDish: action.payload.success,
          });
      default:
        return state;
    }
  }
  