import { CUSTOMER_PROFILE_UPDATE,CUSTOMER_PROFILE_GET } from "../constants/action-types";
import axios from "axios";
import { Redirect } from "react-router";

export const updateCustomerProfileAction = (data) => (dispatch) => {
   console.log("In action update",data);
   //set the with credentials to true
   axios.defaults.withCredentials = true;
   //make a post request with the user data
   if (data) {
     console.log("Iside functuin");
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
          let customerData = response.data.profileData;
          console.log("Customer Data", customerData);
          return dispatch({
                    type: CUSTOMER_PROFILE_UPDATE,
                    payload: customerData,
                  });
          
         }
       })
       .catch((response) => {
         this.setState({
           authFlag: false,
           ErrorMessage: "Something went wrong",
         });
       });
   }
}

export const getCustomerProfileAction = (data) => (dispatch) => {


  axios.defaults.withCredentials = true;

  axios({
    url:
      "http://" +
      process.env.REACT_APP_IP +
      ":3001" +
      "/customerProfile/getCustomerProfile",
    method: "GET",
    params: data,
  }).then((response) => {

    let customerData = response.data.profileData;
    console.log("Customer Data", customerData);
    return dispatch({
      type: CUSTOMER_PROFILE_GET,
      payload: customerData,
    })
    
  }).catch((error)=>{
    console.log(error);
  });
}
