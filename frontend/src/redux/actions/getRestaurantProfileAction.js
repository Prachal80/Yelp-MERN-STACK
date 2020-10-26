import { RESTAURANT_PROFILE_GET } from "../constants/action-types";
import axios from "axios";

export const getRestaurantProfileAction = (data) => (dispatch) => {
 
    axios.defaults.withCredentials = true;
    //make a post request with the user data
   
    axios({
      url:
        "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/restaurantProfile/getRestaurantProfile",
      method: "GET",
      params: data,
    }).then((response) => {

      let restaurantData = response.data.restaurantProfileData;
      console.log("Restaurant profile details", restaurantData);
      return dispatch({
        type: RESTAURANT_PROFILE_GET,
        payload: restaurantData,
      })
    }).catch((error)=>{
        console.log(error);
      });

};
