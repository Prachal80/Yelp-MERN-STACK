import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import EachOrderRestaurant from "../individual/individualRestaurantOrders";

export default class restaurantOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      dishimage: "",
      price: "",
      category: "",
      cusotmername: "",
      customerid: "",
      status: "",
      orderid: "",
      time: "",
      optiontype: "",
      orders: [],
      filter: "",
    };
  }

  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };
  componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("mounting");
    //Get All orders made by customers to the restaurant
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantOrders/getAllOrdersRestaurant",
        {
          params: {
            RID: localStorage.getItem("RID"),
          },
        }
      )
      .then((response) => {
        console.log("Received all Orders");

        this.setState({
          orders: this.state.orders.concat(response.data.RestaurantGetOrder),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let orderDishAll = this.state.orders.map((order) => {
      if (this.state.filter !== "") {
        if (order.status === this.state.filter) {
          return <EachOrderRestaurant data={order}></EachOrderRestaurant>;
        }
      } else {
        return <EachOrderRestaurant data={order}></EachOrderRestaurant>;
      }
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}>Orders Made by Customers</h2>
          <br />

          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f07a0c",
                border: "1px solid #f07a0c",
              }}
              className="btn btn-danger"
              value="Order Received"
              onClick={this.ChangeHandler}
            >
              New Order
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#11ad17",
                border: "1px solid #11ad17",
              }}
              className="btn btn-danger"
              value="Delivered"
              onClick={this.ChangeHandler}
            >
              Delivered Order
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                backgroud: "#940000",
                border: "1px solid #940000",
              }}
              className="btn btn-danger"
              value="Cancelled"
              onClick={this.ChangeHandler}
            >
              Cancelled Order
            </button>
            &nbsp;
            <button
              style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
              className="btn btn-secondary"
              name="option"
              value=""
              onClick={this.ChangeHandler}
            >
              Clear
            </button>
          </div>
          <br />
          <hr />
        </div>

        <div class="row">
          <div
            class="col-6"
            style={{ width: "100%", overflowY: "scroll", height: "700px" }}
          >
            <h2 style={{ textAlign: "center" }}>All orders</h2>
            {orderDishAll}
          </div>
          <div class="rightdiv"></div>
        </div>
      </div>
    );
  }
}
