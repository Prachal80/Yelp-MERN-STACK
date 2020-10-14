import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import Container from "react-bootstrap/Container";
import { BsStarFill } from "react-icons/all";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import OrderEachDish from "../individual/individualOrderDish";
import EachCustomerReview from "../individual/indivudalReview";
var dotenv = require("dotenv").config({
  path: "../.env",
});

class customerRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantid: this.props.location.state.restaurantid,
      path: this.props.location.state.path,
      name: "",
      location: "",
      address: "",
      state: "",
      country: "",
      description: "",
      timings: "",
      email: "",
      contact: "",
      ratings: "",
      restaurantprofilepic: "",
      dishes: [],
      reviews: [],
      //Review form

      rating: "",
      review: "",
      reviewdate: "",
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

  componentDidMount() {
    console.log("RID", this.state.restaurantid);
   
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/reviews/getCustomerReviews",
        {
          params: {
            CID: localStorage.getItem("CID"),
            RID: this.state.restaurantid,
          },
        }
      )
      .then((response) => {
        console.log("Received All reviews");

        this.setState({
          reviews: this.state.reviews.concat(response.data.customerReviews),
        });
        console.log(this.state.reviews);
      })
      .catch((response) => {
        console.log("********** Catch", response);
        this.setState({
          ErrorMessage: "Something went wrong while getting all the reviews",
        });
      });
  }

  //Post the review
  submitReview = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      rating: this.state.rating,
      review: this.state.review,
      reviewdate: this.state.reviewdate,
      RID: this.state.restaurantid,
      restaurantname: this.state.name,
      customername: localStorage.getItem("Cname"),
      CID: localStorage.getItem("CID"),
    };
    console.log("Review Data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    if (data.rating && data.review && data.reviewdate) {
      axios
        .post(
          "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/reviews/addReviewCustomer",
          data
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          console.log("response, ", response.data.success);
          if (
            response.data.success &&
            localStorage.getItem("user") === "customer"
          ) {
            window.location.assign("/customer/customerrestaurantview");
          }
        })
        .catch((response) => {
          this.setState({
            ErrorMessage: "Review Post Error",
          });
        });
    } else {
      alert("Please add all the review fields");
    }
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }
    let CustomerReview = this.state.reviews.map((review) => {
      return <EachCustomerReview data={review}></EachCustomerReview>;
    });

    let orderDishAll = this.state.dishes.map((dish) => {
      return <OrderEachDish data={dish}></OrderEachDish>;
    });
    return (
      <div>
        {redirectVar}
        <div>
          <div class="row" style={{ marginTop: "2%" }}>
            <div
              style={{
                marginLeft: "2%",
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Name : {this.state.name}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>Email : {this.state.email}</ListGroup.Item>
                  <ListGroup.Item>
                    Contact : {this.state.contact}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Timings : {this.state.timings}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description : {this.state.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div
              style={{
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Location City : {this.state.location}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>
                    Address : {this.state.address}
                  </ListGroup.Item>
                  <ListGroup.Item>State : {this.state.state}</ListGroup.Item>
                  <ListGroup.Item>
                    Country : {this.state.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ratings : {this.state.ratings} <BsStarFill />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div>
              <img
                src={
                  "http://" +
                  process.env.REACT_APP_IP +
                  ":3001/" +
                  this.state.restaurantprofilepic
                }
                alt="Profile Pic"
                style={{
                  width: "400px",
                  height: "250px",
                  border: "1px grey",
                }}
              ></img>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <Map
                google={this.props.google}
                zoom={16}
                style={{
                  width: "400px",
                  height: "250px",
                  border: "1px grey",
                }}
              >
                <Marker
                  onClick={this.state.address}
                  name={"Current location"}
                />

                <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>{this.state.address}</h1>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </div>

          <hr />
          <br />
          <br />
          <div class="row">
            <div
              style={{
                marginLeft: "5%",
                overflowY: "scroll",
                height: "700px",
              }}
              class="overflow-auto"
              //class="lefttdiv"
              class="col-4"
            >
              {orderDishAll}
            </div>
            <div class="rightdiv">
              <div
                style={{
                  marginLeft: "45%",
                  marginTop: "5%",
                  border: "1px solid black",
                  width: "100%",
                  height: "250px",
                  padding: "2%",
                  left: "80%",
                }}
              >
                <form
                  class="Review"
                  name="Review"
                  onSubmit={this.submitReview}
                  style={{
                    marginLeft: "0%",
                    zIndex: "100",
                    right: "10%",
                    top: "60%",
                    width: "100%",
                  }}
                >
                  <Container>
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "2px",
                        width: "100%",
                      }}
                    >
                      Add Review for {this.state.name}, {this.state.location}
                    </p>
                    <hr />
                    <Col>
                      <Row xs={5}>
                        <Col>
                          <input
                            type="text"
                            name="rating"
                            placeholder="Rating out of 5"
                            class="form-control"
                            onChange={this.ChangeHandler}
                          />
                        </Col>
                        <Col>
                          <input
                            type="date"
                            name="reviewdate"
                            placeholder="date"
                            class="form-control"
                            onChange={this.ChangeHandler}
                          />
                        </Col>
                      </Row>
                      <br />
                      <Row xs={15}>
                        <input
                          height="100px"
                          type="text"
                          name="review"
                          placeholder="Review"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />
                      </Row>
                      <br />
                      <button
                        type="submit"
                        class="btn btn-primary"
                        style={{
                          type: "button",
                          background: "#D32323",
                          color: "#ffffff",
                          fontWeight: "bold",
                          borderBlockColor: "white",
                          border: "1px #D32323",
                        }}
                      >
                        Post Review
                      </button>
                    </Col>
                  </Container>
                </form>
                <br />
                <br />
                <h2> Reviews You Posted</h2>
              </div>
              <br />
              <div
                style={{
                  marginLeft: "45%",
                  overflowY: "scroll",
                  height: "700px",
                  width: "100%",
                  padding: "2%",
                  left: "80%",
                }}
              >
                <br />
                <br />
                {CustomerReview}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "process.env.API_KEY",
})(customerRestaurantView);
