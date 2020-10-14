import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";
import M from "materialize-css";

export default class individualOrderDish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      dishimage: "",
      price: "",
      category: "",
      customerid: "",
      restaurantid: "",
      restaurantname: "",
      status: "",
      option: "",
      time: "",
      ErrorMessage: "",
    };
    this.ChangeHandler = this.ChangeHandler.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    console.log("Inside option change handler", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitOrder = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      dishname: this.props.data.dishname,
      dishimage: this.props.data.image,
      price: this.props.data.price,
      category: this.props.data.category,
      customerid: localStorage.getItem("CID"),
      restaurantid: this.props.data.restaurantid,
      status: "Order Received",
      option: this.state.option,
      restaurantname: this.props.data.restaurantname,
      customername: localStorage.getItem("Cname"),
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("#############", data);
    if (data.option) {
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
          if (
            response.data.success &&
            localStorage.getItem("user") === "customer"
          ) {
            window.location.assign("/customer/orders");
          }
        })
        .catch((response) => {
          console.log("********** Catch", response);
          this.setState({
            authFlag: false,
            ErrorMessage: "Something went wrong while placing the order",
          });
        });
    } else {
      M.toast({
        html: "Please select 1 option",
        classes: "red darken-1",
      });
    }
  };

  render() {
    return (
      <div
        style={{
          //   marginLeft: "5%",
          //   marginLeft: "5%",
          //   border: "1px solid black",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
        }}
      >
        <Card border="secondary" style={{}}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.dishname}
            </h3>
          </Card.Header>
          <Card.Body style={{ padding: "10px 5px 5px 5px" }}>
            <Fragment>
              <Container>
                <Row>
                  <Col className="col-6">
                    <img
                      src={
                        "http://" +
                        process.env.REACT_APP_IP +
                        ":3001/" +
                        this.props.data.image
                      }
                      alt="Order dish"
                      style={{
                        width: "100%",
                        height: "90%",
                      }}
                    />
                  </Col>
                  <Col style={{ padding: "0px" }} className="col-6">
                    <p style={{ marginBottom: "0px" }}>
                      Price : {this.props.data.price}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Ingredients : {this.props.data.ingredients}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Category : {this.props.data.category}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Description : {this.props.data.description}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Restaurant : {this.props.data.restaurantname}
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <form onSubmit={this.submitOrder}>
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
                        Place Order
                      </button>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <input
                        type="radio"
                        name="option"
                        value="Delivery"
                        onChange={this.ChangeHandler}
                      />
                      Delivery &nbsp;
                      <input
                        type="radio"
                        name="option"
                        value="Pickup"
                        onChange={this.ChangeHandler}
                      />
                      Pickup
                    </form>
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
