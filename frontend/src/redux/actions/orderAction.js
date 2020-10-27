import {GET_ORDERS_RESTAURANT, CHANGE_ORDER_STATUS_RESTAURANT, MAKE_ORDER_CUSTOMER, GET_ALL_ORDERS_CUSTOMER, CANCEL_ORDER_CUSTOMER} from "../constants/action-types";
import axios from "axios";


export const getOrdersRestaurantAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
}


export const changeOrderStatusRestaurantAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
}


export const makeOrderRestaurantAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
}

export const getOrdersCustomerAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
}

export const cancelOrdersCustomerAction = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
}
