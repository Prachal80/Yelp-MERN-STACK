import { CUSTOMER_PROFILE_UPDATE } from "../constants/action-types";
import axios from "axios";
import { Redirect } from "react-router";

export const updateCustomerProfileAction = (data) => (dispatch) => {
  // //set the with credentials to true
  // axios.defaults.withCredentials = true;
  // //make a post request with the user data
  // axios
  //   .post("http://localhost:5001/customerProfile/updateProfile", data)
  //   .then((response) => {
  //     console.log("Status Code : ", response.status);
  //     console.log("response, ", response);
  //     console.log("*******************************", response);
  //     if (response.data.success) {
  //       return dispatch({
  //         type: CUSTOMER_PROFILE_UPDATE,
  //         payload: response.data.success,
  //       });
  //     }
  //   });


   //set the with credentials to true
   axios.defaults.withCredentials = true;
   //make a post request with the user data
   if (data) {
     axios
       .post(
         "http://" +
           process.env.REACT_APP_IP +
           ":3001" +
           "/customerProfile/updateCustomerProfile",
         data
       )
       .then((response) => {
         console.log("Status Code : ", response.status);
         console.log("response, ", response.data.success);
         if (
           response.data.success 
            && localStorage.getItem("user") === "customer"
         ) {
          return dispatch({
                    type: CUSTOMER_PROFILE_UPDATE,
                    payload: response.data,
                  });
                  
           window.location.assign("/customer/profile");
          
         }
       })
       .catch((response) => {
         this.setState({
           authFlag: false,
           ErrorMessage: "Something went wrong",
         });
       });
   }
};
