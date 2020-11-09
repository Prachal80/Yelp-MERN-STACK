import {POST_RESTAURANT_MESSAGE, POST_CUSTOMER_MESSAGE, GET_MESSAGE} from "../constants/action-types";
import axios from "axios";

export const postRestaurantMessage = (data) => (dispatch) => {
    
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    //Post message restaurant
    axios.post("http://" +
    process.env.REACT_APP_IP +
    ":3001" +
    "/message/restaurant", data
 )
 .then(response=>{
    console.log("Message ",response);
    // this.setState({
    //   messages:response.data.message.message,
    // })

    console.log("Restaurant message", response.data.message.message);
        let payload = {
            messages:response.data.message.message,
        }
        return dispatch({
            type: POST_RESTAURANT_MESSAGE,
            payload: payload,
        })
  })
    
  
}

export const postCustomerMessage = (data) => (dispatch) => {
    
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    //Post message customer
    axios.post("http://" +
    process.env.REACT_APP_IP +
    ":3001" +
    "/message/customer", data
 )
 .then(response=>{
    console.log("Message ",response);
    // this.setState({
    //   messages:response.data.message.message,
    // })

    console.log("Customer message", response.data.message.message);
    let payload = {
        messages:response.data.message.message,
    }
    return dispatch({
        type: POST_CUSTOMER_MESSAGE,
        payload: payload,
    })
  })

}

  


export const getMessages = (data) => (dispatch) => {
    console.log("Get message data", data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    //GET messages
    axios.get( "http://" +
    process.env.REACT_APP_IP +
    ":3001" +
    "/message/messages",
  {
    params: data
  }).then(response=>{
      console.log("Response messages", response);
      if(response.data.messages.length){
        console.log("Messages ",response);
        // this.setState({
        // messages:response.data.messages,
        // })

        console.log("All messages", response.data.messages);
        let payload = {
            messages:response.data.messages,
        }
        return dispatch({
            type: GET_MESSAGE,
            payload: payload,
        })
      }    
  })
  
}

