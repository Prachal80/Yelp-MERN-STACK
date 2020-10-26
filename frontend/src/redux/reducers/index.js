import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signuReducer from "./signupReducer";
import updateCustomerProfileReducer from "./updateCustomerProfileReducer";
import getCustomerProfileAction from "./getCustomerProfileReducer";
import updateRestaurantProfileReducer from "./updateRestaurantProfileReducer";
import getRestaurantProfileAction from "./getRestaurantProfileReducer";

const rootReducer = combineReducers({
  Login: loginReducer,
  Signup: signuReducer,
  CustomerProfileUpdate: updateCustomerProfileReducer,
  CustomerProfileGet: getCustomerProfileAction,
  RestaurantProfileUpdate: updateRestaurantProfileReducer,
  RestaurantProfileGet: getRestaurantProfileAction,
});

export default rootReducer;
