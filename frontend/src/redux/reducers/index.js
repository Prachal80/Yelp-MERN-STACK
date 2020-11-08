import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signuReducer from "./signupReducer";
import customerProfileReducer from "./customerProfileReducer";
import restaurantProfileReducer from "./restaurantProfileReducer";
import customerDishReducer from "./customerDishReducer";
import restuarantDishReducer from "./restaurantDishReducer";
import restaurantOrderReducer from "./restaurantOrderReducer";
import customerOrderReducer from "./customerOrderReducer";
import reviewReducer from "./reviewReducer";
import EventReducer from "./eventReducer";
import messageReducer from "./messageReducer";


const rootReducer = combineReducers({
  Login: loginReducer,
  Signup: signuReducer,
  CustomerProfile: customerProfileReducer,
  RestaurantProfile: restaurantProfileReducer,
  CustomerDishGet: customerDishReducer,
  RestaurantDish: restuarantDishReducer,
  RestaurantOrders: restaurantOrderReducer,
  CustomerOrders: customerOrderReducer,
  Events: EventReducer,
  Review: reviewReducer,
  Message: messageReducer,
});

export default rootReducer;
