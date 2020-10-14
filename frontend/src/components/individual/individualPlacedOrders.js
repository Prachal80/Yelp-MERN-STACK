import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default class individualPlacedOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      dishimage: "",
      price: "",
      category: "",
      restaurantname: "",
      status: "",
      orderid: "",
      time: "",
      ErrorMessage: "",
    };
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    console.log("Inside option change handler", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit cancelOrder handler to delete order
  cancelOrder = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      orderid: this.props.data.orderid,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
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
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/customer/orders");
        }
      })
      .catch((response) => {
        console.log("********** Catch", response);
        this.setState({
          ErrorMessage: "Invalid delete request Credentials",
        });
      });
  };

  render() {
    return (
      <div
        style={{
          marginLeft: "5%",
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
                      Order type: : {this.props.data.optiontype}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Category : {this.props.data.category}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Restaurant : {this.props.data.restaurantname}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Status : {this.props.data.status}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Placed on :
                      {this.props.data.time.slice(0, 19).replace("T", " ")}
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <form onSubmit={this.cancelOrder}>
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
                        Cancel Order
                      </button>
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
