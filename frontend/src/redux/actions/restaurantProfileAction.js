import { RESTAURANT_PROFILE_UPDATE, RESTAURANT_PROFILE_GET } from "../constants/action-types";
import axios from "axios";
import { Redirect } from "react-router";

export const updateRestaurantProfileAction = (data) => (dispatch) => {

   //set the with credentials to true
   axios.defaults.withCredentials = true;
   //make a post request with the user data
   if (data) {
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
    .post(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/restaurantProfile/updateRestaurantProfile",
      data
    )
    .then((response) => {
      console.log("Status Code : ", response.status);
      console.log("response, ", response.data.success);
      if (
        response.data.success &&
        localStorage.getItem("user") === "restaurant"
      ) {
        let restaurantData = response.data.restaurantProfileData;
        console.log("Restaurant profile details", restaurantData);
        return dispatch({
          type: RESTAURANT_PROFILE_UPDATE,
          payload: restaurantData,
        });
      }
    })
    .catch((response) => {
      console.log("********** Catch", response);
    });
   }
};

export const getRestaurantProfileAction = (data) => (dispatch) => {
 
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
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

