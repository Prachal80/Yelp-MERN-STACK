import {GET_CUSTOMER_REVIEW, GET_RESTAURANT_REVIEW,POST_CUSTOMER_REVIEW } from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";


export const postCustomerReview = (data) => (dispatch) => {
    
    axios.defaults.withCredentials = true;

    //Post review customer
    axios
        .post(
          "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/reviews/addReviewCustomer",
          data
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          console.log("response, ", response.data.success);
          if (
            response.data.success &&
            localStorage.getItem("user") === "customer"
          ) {
            //window.location.assign("/customer/customerrestaurantview");
            console.log("NEW REVIEW $%#$%^$^7", response.data.review);
            let payload = {
                success:response.data.success,
                review: response.data.review,
            }
            return dispatch({
                type: POST_CUSTOMER_REVIEW,
                payload: payload,
            })
          }
        })
        .catch((response) => {
        //   this.setState({
        //     ErrorMessage: "Review Post Error",
        //   });
        });
  
}

export const getAllReviews = (data) =>(dispatch) =>{

    axios.defaults.withCredentials = true;

    axios
  .get(
    "http://" +
      process.env.REACT_APP_IP +
      ":3001" +
      "/reviews/getCustomerReviews",
    {
      params: {
        CID: data.CID,
        RID: data.RID,
      },
    }
  )
  .then((response) => {
    console.log("Received All reviews",response.data.customerReviews);
    return dispatch({
        type: GET_CUSTOMER_REVIEW,
        payload: response.data.customerReviews,
    })
    // this.setState({
    //   reviews: this.state.reviews.concat(response.data.customerReviews),
    // });
    //console.log(this.state.reviews);
  })
  .catch((response) => {
    console.log("********** Catch", response);
    // this.setState({
    //   ErrorMessage: "Something went wrong while getting all the reviews",
    // });
  })
}

export const getRestaurantReviews = (data) =>(dispatch) =>{

    axios.defaults.withCredentials = true;

    axios
    .get(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/reviews/getRestaurantReviews",
        {
            params: {
                
               RID: data,
            },
          },
      
    )
    .then((response) => {
      console.log("Received All reviews");

    //   this.setState({
    //     reviews: this.state.reviews.concat(response.data.restaurantReviews),
    //   });
    return dispatch({
        type: GET_RESTAURANT_REVIEW,
        payload: response.data.restaurantReviews,
    })
    //   console.log(this.state.reviews);
    })
    .catch((response) => {
      console.log("********** Catch", response);
    //   this.setState({
    //     ErrorMessage: "Something went wrong while getting all the reviews",
    //   });
    });    
}