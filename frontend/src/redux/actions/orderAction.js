import {GET_ORDERS_RESTAURANT, CHANGE_ORDER_STATUS_RESTAURANT, MAKE_ORDER_CUSTOMER, GET_ALL_ORDERS_CUSTOMER, CANCEL_ORDER_CUSTOMER} from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";

export const getOrdersRestaurantAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    console.log("Data for get orders :", data);
     //Get All orders made by customers to the restaurant
     axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
     axios
     .get(
       "http://" +
         process.env.REACT_APP_IP +
         ":3001" +
         "/restaurantOrders/getAllOrdersRestaurant",
       {
         params: data,
       }
     )
     .then((response) => {
       console.log("Received all Orders : ",response);
       let payload  = {
           success: response.data.success,
           orders: response.data.RestaurantGetOrder 
       }
        return dispatch({
            type: GET_ORDERS_RESTAURANT,
            payload:payload,
        })
    //    this.setState({
    //      orders: this.state.orders.concat(response.data.RestaurantGetOrder),
    //    });
     });
}


export const changeOrderStatusRestaurantAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;


    if (data.status) {
        axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
        axios
          .post(
            "http://" +
              process.env.REACT_APP_IP +
              ":3001" +
              "/restaurantOrders/changeOrderStatusRestaurant",
            data
          )
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response, ", response.data.success);

            let payload = {
                success: response.data.success,
                order: response.data.order,
            }
            if (response.data.success) {
              //window.location.assign("/restaurant/orders");
              return dispatch({
                  type: CHANGE_ORDER_STATUS_RESTAURANT,
                  payload: payload
              })
            }
          })
          .catch((response) => {
            console.log("********** Catch", response);
            // this.setState({
            //   ErrorMessage: "Error while making change request",
            // });
          });
      } else {
        alert("Please select the Order status");
      }
}


export const makeOrderCustomerAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    if (data.option) {
      axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
        axios
          .post(
            "http://" +
              process.env.REACT_APP_IP +
              ":3001" +
              "/customerOrders/makeOrderCustomer",
            data
          )
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response, ", response.data.success);
            let payload = {
                success: response.data.success,
                order:response.data.order
              }
            if (
              response.data.success &&
              localStorage.getItem("user") === "customer"
            ) {
                return dispatch({
                    type: MAKE_ORDER_CUSTOMER ,
                    payload: payload,
                })
              //window.location.assign("/customer/orders");
              // window.location.history.push({
              //   pathName: "/customer/orders"
              // })
            }
          })
          .catch((response) => {
            console.log("********** Catch", response);
            // this.setState({
            //   authFlag: false,
            //   ErrorMessage: "Something went wrong while placing the order",
            // });
          });
      } else {
        M.toast({
          html: "Please select 1 option",
          classes: "red darken-1",
        });
      }

}

export const getOrdersCustomerAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios
    .get(
      "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/customerOrders/getAllOrders",
      {
        params: data,
      }
    )
    .then((response) => {
      console.log("Received all Orders",response.data.CustomerGetOrder);
      let payload = {
        success: response.data.success,
        orders:response.data.CustomerGetOrder
      }
      if (response.data.success) {
        return dispatch({
            type:GET_ALL_ORDERS_CUSTOMER ,
            payload: payload,
        })
      }

    //   this.setState({
    //     orders: this.state.orders.concat(response.data.CustomerGetOrder),
    //   });
    //   console.log("orders", this.state.orders);
    });
}

export const cancelOrdersCustomerAction = (data) => (dispatch) => {
   
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
      console.log("#############", data);
      axios
        .post(
          "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/customerOrders/deleteOrderCustomer",
          data
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          console.log("response, ", response.data);
          let payload = {
            success: response.data.success,
            order:response.data.cancelledOrder
          }
          if (response.data.success) {
            return dispatch({
                type:CANCEL_ORDER_CUSTOMER ,
                payload: payload
            })
            //window.location.assign("/customer/orders");
          }
        })
        .catch((response) => {
          console.log("********** Catch", response);
        });
}
