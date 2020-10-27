import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signuReducer from "./signupReducer";
import updateCustomerProfileReducer from "./updateCustomerProfileReducer";
import getCustomerProfileReducer from "./getCustomerProfileReducer";
import updateRestaurantProfileReducer from "./updateRestaurantProfileReducer";
import getRestaurantProfileReducer from "./getRestaurantProfileReducer";
import customerDishReducer from "./customerDishReducer";
import restuarantDishReducer from "./restaurantDishReducer";
import restaurantOrderReducer from "./restaurantOrderReducer";
import customerOrderReducer from "./customerOrderReducer";

const rootReducer = combineReducers({
  Login: loginReducer,
  Signup: signuReducer,
  CustomerProfileUpdate: updateCustomerProfileReducer,
  CustomerProfileGet: getCustomerProfileReducer,
  RestaurantProfileUpdate: updateRestaurantProfileReducer,
  RestaurantProfileGet: getRestaurantProfileReducer,
  CustomerDishGet: customerDishReducer,
  RestaurantDish: restuarantDishReducer,
  RestaurantOrders: restaurantOrderReducer,
  CustomerOrders: customerOrderReducer,
});

export default rootReducer;
