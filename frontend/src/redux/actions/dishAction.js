import { RESTAURANT_ADD_DISH, RESTAURANT_GET_ALL_DISH,RESTAURANT_UPDATE_DISH, CUSTOMER_GET_ALL_REST } from "../constants/action-types";
import axios from "axios";

export const getAllRestaurantsAction = (data) => (dispatch) => {


    axios.defaults.withCredentials = true;
  
    axios
    .get(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/customerDishes/getAllRestaurants",
      {
        params: {},
      }
    )
    .then((response) => {
        let allRestaurants = response.data.allRestaurants;
      console.log("Received All restaurants",allRestaurants );
    //   this.setState({
    //     restaurants: this.state.restaurants.concat(
    //       response.data.allRestaurants
    //     ),
    //   });
      return dispatch({
        type: CUSTOMER_GET_ALL_REST,
        payload: allRestaurants,
      })
    }).catch((error)=>{
      console.log(error);
    });
  
  
  }

export const getAllDishesAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    console.log("Get all dish action data",data);
    //Get All dishes
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantDishes/getAllDishes",
        {
          params: {
              
             RID: data,
          },
        }
      )
      .then((response) => {
        console.log("Received Dishes");
        return dispatch({
            type: RESTAURANT_GET_ALL_DISH,
            payload: response.data.restaurantDishGet,
        })
        // this.setState({
        //   dishes: this.state.dishes.concat(response.data.restaurantDishGet),
        // });
        // //console.log("Dishes: ", this.state.dishes);
      });


  }  

export const addDishAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    axios
    .post(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/restaurantDishes/addRestaurantDishes",
      data,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log("Status Code : ", response.status);
      console.log("response, ", response.data.success);
      if (response.data.success) {
        // window.location.reload(true);
        return dispatch({
            type: RESTAURANT_ADD_DISH,
            payload: response.data.success,
        })
      }
    })
    // .catch((error) => {
    //     return dispatch({
    //         action: RESTAURANT_ADD_DISH,
    //         payload: false,
    //     }) 
    //   this.setState({
    //     ErrorMessage: "Something went wrong while adding dish",
    //   });
    // });

}  

export const updateDishAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    axios
    .post(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/restaurantDishes/updateRestaurantDishes",
      data,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log("Status Code : ", response.status);
      console.log("response, ", response.data.success);
      if (response.data.success) {
        //window.location.assign("/restaurant/dashboard");
        return dispatch({
            type: RESTAURANT_UPDATE_DISH,
            payload: response.data.success,
        })
      }
    })
    // .catch((response) => {
    //     return dispatch({
    //         action: RESTAURANT_UPDATE_DISH,
    //         payload: false,
    //     })
    //   this.setState({
    //     ErrorMessage: "Something went wrong while updating dish",
    //   });
    // });
}  






