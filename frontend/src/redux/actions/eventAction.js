import {GET_CUSTOMER_UNREGISTERED_EVENTS,GET_CUSTOMER_REGISTERED_EVENTS, GET_CUSTOMER_SINGLE_EVENT,GET_CUSTOMER_IS_REGISTERED,POST_CUSTOMER_REGISTER_EVENT, GET_RESTAURANT_EVENTS,GET_REGISTERED_CUSTOMERS, POST_RESTAURANT_EVENTS } from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";

export const getCutomerUnregisteredEvents = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
        //Get All unregistered events
        axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
        axios
        .get(
          "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/customerEvents/getAllEvents",
          {
            params: {
             
            },
          }
        )
        .then((response) => {
          console.log("Received all unregistered Events", response.data.customerEventsGet);
          let payload  = {
            success: response.data.success,
            events: response.data.customerEventsGet 
        }
          return dispatch({
              type: GET_CUSTOMER_UNREGISTERED_EVENTS,
              payload: payload
          })  
        //   this.setState({
        //     events: this.state.events.concat(response.data.customerEventsGet),
        //   });
        });
}

export const getCustomerRegisteredEvents = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

     //Get All registered events
     axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
     axios
     .get(
       "http://" +
         process.env.REACT_APP_IP +
         ":3001" +
         "/customerEvents/getRegisteredEvents",
       {
         params:data,
       }
     )
     .then((response) => {
       console.log("Received all registered Events", response.data.getRegisteredEvents);
       let payload  = {
        success: response.data.success,
        registered_events : response.data.getRegisteredEvents 
    }
      return dispatch({
          type: GET_CUSTOMER_REGISTERED_EVENTS,
          payload: payload
      })   
    //    this.setState({
    //      registered_events: this.state.registered_events.concat(
    //        response.data.getRegisteredEvents
    //      ),
    //    });
     });
}

// export const getCutomerSingleEvent = (data) => (dispatch) => {
//     axios.defaults.withCredentials = true;

// }

// export const getCutomerIsRegistered = (data) => (dispatch) => {
//     axios.defaults.withCredentials = true;

// }


export const postCutomerRegister = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
      .post(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/customerEvents/registerEventCustomer",
        data
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          //window.location.assign("/customer/events");
          return dispatch({
              type: POST_CUSTOMER_REGISTER_EVENT,
              payload: response.data.success,
          })
        }
      })
      .catch((response) => {
        // this.setState({
        //   ErrorMessage: "Event Register Error",
        // });
      });
}

export const getRestauarantEvents = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    //Get All events
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/getAllEvents",
        {
          params: data,
          
        }
      )
      .then((response) => {
        console.log("Received all restaurant Events",response.data.restaurantEventsGet);
        return dispatch({
            type: GET_RESTAURANT_EVENTS,
            payload:response.data.restaurantEventsGet
        })
        // this.setState({
        //   events: this.state.events.concat(response.data.restaurantEventsGet),
        // });
      });


}

export const getRegisteredCustomers = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    //Get All registered customers
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/getRegisteredCustomers",
        {
          params:data,
        }
      )
      .then((response) => {
        console.log("Received all registered Events");
        return dispatch({
            type: GET_REGISTERED_CUSTOMERS,
            payload: response.data.getRegisteredCustomers,
        })
        // this.setState({
        //   registered_events: this.state.registered_events.concat(
        //     response.data.getRegisteredCustomers
        //   ),
        // });
      });

}

export const postRestaurantEvents = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
      .post(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/addRestaurantEvents", data
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        let payload = {
            event: response.data.event,
            success: response.data.success
        }
        if (response.data.success) {

          //window.location.assign("/restaurant/events");
          return dispatch({
              type: POST_RESTAURANT_EVENTS,
              payload: payload,
          })
        }
      })
      .catch((response) => {
        // this.setState({
        //   ErrorMessage: "Something went wrong on event adding",
        // });
      });

}