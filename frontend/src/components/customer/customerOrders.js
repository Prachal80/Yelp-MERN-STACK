import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachOrderCustomer from "../individual/individualPlacedOrders";
import { connect } from "react-redux";
import { makeOrderCustomerAction , getOrdersCustomerAction , cancelOrdersCustomerAction } from "../../redux/actions/orderAction";
import Pagination from "../Pagination";

class customerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      price: "",
      category: "",
      restaurantname: "",
      status: "",
      orderpic: "",
      orderid: "",
      time: "",
      optiontype: "",
      orders: [],
      filter: "",

      //pagination
      currentPage:1,
      ordersPerPage: 2,
      indexOfLastOrder: 2,
      indexOfFirstOrder: 0,
      currentOrders: [],

    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    let params = {
      CID: localStorage.getItem("CID")}
    //Get All orders made by a customer
    this.props.getOrdersCustomerAction(params);
  }

  componentWillReceiveProps(nextProps) {

    console.log("in customer recieve all orders", nextProps.orders);
    let currentOrders = nextProps.orders.slice(
      this.state.indexOfFirstOrder,
      this.state.indexOfLastOrder
    )
    console.log("current orders", currentOrders, " first index " , this.state.indexOfFirstOrder , " last index: ", this.state.indexOfLastOrder);
    this.setState({
      orders: nextProps.orders,
      currentOrders : currentOrders
     })

    // console.log("in customer recieve all orders", nextProps.orders);
    // this.setState({
    //   orders: nextProps.orders
    // });
  }

  // Change page
  paginate = (pageNumber) => {
    console.log("pagenumber ", pageNumber);

    let indexOfLastOrder = pageNumber * this.state.ordersPerPage;
    let indexOfFirstOrder = indexOfLastOrder - this.state.ordersPerPage;
    let allOrders = this.state.orders;
    let currentOrders = allOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
      
    );
    console.log("all orders, ", allOrders, "current orders", currentOrders, " first index " , indexOfFirstOrder , " last index: ", indexOfLastOrder);

    this.setState({
      currentPage: pageNumber,
      indexOfLastOrder: indexOfLastOrder,
      indexOfFirstOrder: indexOfFirstOrder,
      currentOrders: currentOrders,
    });

  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let orderDishAll = this.state.currentOrders.map((order) => {
      if (this.state.filter !== "") {
        if (order.status === this.state.filter) {
          return <EachOrderCustomer data={order}></EachOrderCustomer>;
        }
      } else {
        return <EachOrderCustomer data={order}></EachOrderCustomer>;
      }
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            Your Orders
          </h2>
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
                background: "#f0ab0c",
                border: "1px solid #f0ab0c",
              }}
              className="btn btn-danger"
              value="Order Received"
              onClick={this.ChangeHandler}
            >
              Order Received
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f07a0c",
                border: "1px solid #f07a0c",
              }}
              className="btn btn-danger"
              value="Preparing"
              onClick={this.ChangeHandler}
            >
              Preparing
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="On the way"
              onClick={this.ChangeHandler}
            >
              On the way
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="Ready for Pickup"
              onClick={this.ChangeHandler}
            >
              Ready for Pickup
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
              className="btn btn-primary"
              value="Picked up"
              onClick={this.ChangeHandler}
            >
              Picked up
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
              className="btn btn-primary"
              value="Delivered"
              onClick={this.ChangeHandler}
            >
              Delivered
            </button>
            &nbsp;
            <button
              style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
              className="btn btn-secondary"
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
          <div style={{ width: "100%" }} class="col-8">
            <div style={{marginLeft:"30%"}}>
              {orderDishAll}
            </div>
            <div style={{marginLeft:"60%"}}>
            <Pagination
            elementsPerPage= {this.state.ordersPerPage}
            totalElements={this.state.orders.length}
            paginate={this.paginate}
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isMakeOrder: state.CustomerOrders.isMakeOrder,
    isOrderCancelled: state.CustomerOrders.isOrderCancelled,
    orders: state.CustomerOrders.orders
  };
};

export default connect(mapStateToProps, {
  makeOrderCustomerAction , getOrdersCustomerAction , cancelOrdersCustomerAction
})(customerOrders);
