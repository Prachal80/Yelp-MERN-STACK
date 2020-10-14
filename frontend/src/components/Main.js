import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./home";
import Signup from "./Login/Signup";
import CustomerDashboard from "./customer/customerDashboard";
import CustomerProfile from "./customer/customerProfile";
import CustomerEvents from "./customer/customerEvents";
import CustomerOrders from "./customer/customerOrders";
import CustomerRestaurantView from "./customer/customerRestaurantView";
import CustomerEventView from "./customer/customerEventView";

import RestaurantDashboard from "./restaurant/restaurantDashboard";
import RestaurantProfile from "./restaurant/restaurantProfile";
import RestaurantEvents from "./restaurant/restaurantEvents";
import RestaurantOrders from "./restaurant/restaurantOrders";
import ReastaurantCustomerView from "./restaurant/restaurantCustomerView";

import Navbar from "./Landing Page/Navbar.js";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/customer/dashboard" component={CustomerDashboard} />
        <Route path="/customer/events" component={CustomerEvents} />
        <Route path="/customer/orders" component={CustomerOrders} />
        <Route
          path="/customer/customerrestaurantview"
          component={CustomerRestaurantView}
        />
        <Route
          path="/customer/customereventview"
          component={CustomerEventView}
        />
        <Route
          path="/restaurant/restaurantcustomerview"
          component={ReastaurantCustomerView}
        />

        <Route path="/restaurant/dashboard" component={RestaurantDashboard} />
        <Route path="/restaurant/profile" component={RestaurantProfile} />
        <Route path="/restaurant/events" component={RestaurantEvents} />
        <Route path="/restaurant/orders" component={RestaurantOrders} />

        {/* <Route path="/home" component={Home} /> */}
      </div>
    );
  }
}
//Export The Main Component
export default Main;
