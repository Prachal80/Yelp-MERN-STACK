import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { connect } from "react-redux";
import {changeOrderStatusRestaurantAction} from "../../redux/actions/orderAction";

var dotenv = require("dotenv").config({
  path: "../.env",
});

class individualRestaurantOrders extends Component {
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
      option: "",
      ErrorMessage: "",
    };
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    console.log("Inside status change handler", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit cancelOrder handler to delete order
  changeOrder = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      orderid: this.props.data._id,
      status: this.state.status,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("************", data);
    this.props.changeOrderStatusRestaurantAction(data);

    
  };

  showOptions = () => {
    if(this.props.data.status==="Cancelled") {
      return (
        <select
          id="satus"
          name="status"
          class="form-control"
         
          value="Cancelled"
          
        >
          <option value="select" selected disabled>
            Cancelled order
          </option>
        </select>
      );
    }
    else if (this.props.data.option === "Delivery") {
      return (
        <select
          id="satus"
          name="status"
          class="form-control"
          onChange={this.ChangeHandler}
          value={this.state.value}
          isSearchable
          required
        >
          <option value="select" selected disabled>
            Select Status
          </option>
          <option value="Preparing">Preparing</option>
          <option value="On the way">On the way</option>
          <option value="Delivered">Delivered</option>
        </select>
      );
    } else if (this.props.data.option === "Pickup") {
      return (
        <select
          id="satus"
          name="status"
          class="form-control"
          onChange={this.ChangeHandler}
          value={this.state.value}
          isSearchable
          required
        >
          <option value="select" selected disabled>
            Select Status
          </option>
          <option value="Preparing">Preparing</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Picked up">Picked up</option>
        </select>
      );
    }

  };

  render() {
    console.log("Props", this.props);
    return (
      <div
        style={{
          marginLeft: "5%",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
        }}
      >
        <Card border="secondary" style={{ width: "32rem" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.dishname}
            </h3>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col>
                    <img
                      src={
                        "http://" +
                        process.env.REACT_APP_IP +
                        ":3001/" +
                        this.props.data.dishimage
                      }
                      alt="Dish Image"
                      style={{
                        width: "200px",
                        height: "150px",
                      }}
                    />
                  </Col>
                  <Col style={{ textAlign: "justify" }}>
                    <p style={{ marginBottom: "0px" }}>
                      Price : {this.props.data.price}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Order type: {this.props.data.option}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Category : {this.props.data.category}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Customer : {this.props.data.customername}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Status : {this.props.data.status}
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <form onSubmit={this.changeOrder}>
                      {this.showOptions()}
                      <br />
                      <button
                        type="submit"
                        class="btn btn-primary"
                        style={{
                          background: "#D32323",
                          color: "#ffffff",
                          fontWeight: "bold",
                          borderBlockColor: "white",
                          border: "1px #D32323",
                        }}
                      >
                        Change Status
                      </button>
                    </form>
                  </Col>
                  <Col>
                    <Link
                      className="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        border: "1px #D32323",
                      }}
                      to={{
                        pathname: "/restaurant/restaurantcustomerview",
                        state: {
                          customerid: this.props.data.customerid,
                          path: "/restaurant/dashboard",
                        },
                      }}
                    >
                      Customer Details
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
    isOrderStatusChanged: state.RestaurantOrders.isOrderStatusChanged,
    orders: state.RestaurantOrders.orders
  };
};

export default connect(mapStateToProps, {
  changeOrderStatusRestaurantAction
})(individualRestaurantOrders);
