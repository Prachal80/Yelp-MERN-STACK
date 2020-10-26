import { CUSTOMER_PROFILE_GET } from "../constants/action-types";
import axios from "axios";

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


};
