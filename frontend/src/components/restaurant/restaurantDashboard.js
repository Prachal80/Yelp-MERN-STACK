import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import EachDish from "../dish/individualRestaurantDish";
import { BsStarFill } from "react-icons/all";
import EachReview from "../individual/indivudalReview";
import {getAllDishesAction,addDishAction,updateDishAction} from "../../redux/actions/dishAction";
import {getRestaurantReviews} from "../../redux/actions/reviewAction";
import { connect } from "react-redux";
import Pagination from 'react-bootstrap/Pagination'


var dotenv = require("dotenv").config({
  path: "../../../../.env",
});

class RestaurantDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      ErrorMessage: "",
      restaurantdescription: "",
      restaurantProfilePic: "",
      showForm: false,
      dishes: [],
      reviews: [],
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    
    axios.defaults.withCredentials = true;

    //make a post request with the Restaurant data
    let data = {
      RID: localStorage.getItem("RID"),
    };
    axios({
      url:
        "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/restaurantProfile/getRestaurantProfile",
      method: "GET",
      params: data,
    }).then((response) => {
      //console.log(" Profile details restaurant", response.data.restaurantProfileData);

      let restaurantData = response.data.restaurantProfileData;
      this.setState({
        name: restaurantData.name,
        location: restaurantData.location,
        address: restaurantData.address,
        state: restaurantData.state,
        country: restaurantData.country,
        restaurantdescription: restaurantData.description,
        timings: restaurantData.timings,
        email: restaurantData.email,
        contact: restaurantData.contact,
        ratings: restaurantData.ratings,
        method: restaurantData.method,
        cuisine: restaurantData.cuisine,
        restaurantProfilePic: restaurantData.restaurantProfilePic,

        //pagination
        currentPage:1,
        dishesPerPage: 2,
        indexOfLastDish: 2,
        indexOfFirstDish: 0,
        currentDishes: [],
      });
    });
   
    //Get all dishes
    //data define RID
    console.log("Getting all dishes Restaurant dashboard",localStorage.getItem("RID"));
    this.props.getAllDishesAction(localStorage.getItem("RID"));


    //Get all reviews given to restaurant
   this.props.getRestaurantReviews(localStorage.getItem("RID"));
  }

  // Change page
   paginate = (pageNumber) => {
    console.log("pagenumber ", pageNumber);

    let indexOfLastDish = pageNumber * this.state.dishesPerPage;
    let indexOfFirstDish = indexOfLastDish - this.state.dishesPerPage;
    let allDishes = this.state.dishes;
    let currentDishes = allDishes.slice(
      indexOfFirstDish,
      indexOfFirstDish
      
    );
    //console.log("all orders, ", allOrders, "current orders", currentOrders, " first index " , indexOfFirstOrder , " last index: ", indexOfLastOrder);

    this.setState({
      currentPage: pageNumber,
      indexOfLastDish: indexOfLastDish,
      indexOfFirstDish: indexOfFirstDish,
      currentDishes: currentDishes,
    });

  };

  componentWillReceiveProps(nextProps) {
    console.log("in restaurant dashboard recieve all dishes", nextProps);

    let currentDishes = nextProps.dishes.slice(
      this.state.indexOfFirstDish,
      this.state.indexOfLastDish
    )
    this.setState({
      dishes: nextProps.dishes,
      reviews: nextProps.reviews,
      currentDishes:currentDishes
    });
  }

  submitUpdate = (e) => {
    e.preventDefault();
    var formData = new FormData();
    console.log(
      "form data ",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );
    formData.append("dishname", this.state.dishname);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("ingredients", this.state.ingredients);
    formData.append(
      "restaurantDishImage",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );
    formData.append("price", this.state.price);
    formData.append("RID", localStorage.getItem("RID"));
    formData.append("Rname", localStorage.getItem("Rname"));
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (formData.get("category") != "undefined") {
      this.props.addDishAction(formData);
    } else {
      alert("Please provide all the information");
    }
  };

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //Function to make the Dish form visible
  showAddDishForm() {
    return (
      <form
        class="DishFrom"
        name="DishForm"
        onSubmit={this.submitUpdate}
        style={{
          position: "absolute",
          background: "#ffe6e6",
          marginLeft: "0%",
          zIndex: "100",
          left: "20%",
          top: "60%",
          borderRadius: "2%",
        }}
      >
        <Container>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "2px",
            }}
          >
            Add Dish
          </p>
          <Row>
            <Col xs={5}>
              <input
                type="text"
                name="dishname"
                placeholder="Dish Name"
                class="form-control"
                onChange={this.ChangeHandler}
                required
              />
            </Col>
            <Col xs={5}>
              <select
                name="category"
                class="form-control"
                value={this.state.value}
                required
                onChange={this.ChangeHandler}
                isSearchable
              >
                <option value="select" selected disabled>
                  Category
                </option>
                <option value="Appetizer">Appetizer </option>
                <option value="Salads">Salads</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={10}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                class="form-control"
                onChange={this.ChangeHandler}
                required
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={4}>
              <input
                type="text"
                name="ingredients"
                class="form-control"
                placeholder="Ingredients"
                onChange={this.ChangeHandler}
                required
              />
            </Col>
            <Col xs={2}>
              <input
                type="text"
                name="price"
                class="form-control"
                placeholder="Price"
                onChange={this.ChangeHandler}
                required
              />
            </Col>
            <Col xs={2}>
              <input type="file" name="restaurantDishImage" required />
            </Col>
          </Row>
        </Container>
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
          Submit
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button
          onClick={() => this.setState({ showForm: false })}
          type="submit"
          class="btn btn-primary"
          style={{
            background: "#D32323",
            color: "#ffffff",
            fontWeight: "bold",
            borderBlockColor: "white",
            border: "1px #D32323",
            MarginLeft: "10px",
          }}
        >
          Close
        </button>
      </form>
    );
  }

  render() {
    let CustomerReview = this.state.reviews.map((review) => {
      return <EachReview data={review}></EachReview>;
    });

    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }
    let dishAll = this.state.currentDishes.map((dish) => {
      return <EachDish data={dish}></EachDish>;
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
                    Description : {this.state.restaurantdescription}
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
                  this.state.restaurantProfilePic
                }
                alt="Profile Pic"
                style={{
                  width: "400px",
                  height: "250px",
                  border: "1px grey",

                  // marginLeft: "18%",
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
          <div class="formContent">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => this.setState({ showForm: true })}
              style={{
                marginLeft: "24%",
                background: "#D32323",
                color: "#ffffff",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
              }}
            >
              Add New Dish
            </button>

            {this.state.showForm ? this.showAddDishForm() : null}
          </div>
          <div class="wrapper fadeInDown">
            <br />

            <div class="DishInfo" class="row">
              <div
                style={{ overflowY: "scroll", height: "700px"}}
                class="col-7"
              >
                <h3 style={{ textAlign: "center" }}> Dishes</h3>
                <div style={{ paddingLeft: "11%" , paddingRight: "auto"}}>
                {dishAll}
                </div>
                
              </div>

              <div
                style={{
                  marginLeft: "10%",
                  overflowY: "scroll",
                  height: "700px",
                }}
                class="col-3"
              >
                <h3 style={{ marginLeft: "10%" }}>Reviews Received</h3>
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


const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(RestaurantDashboard);

const mapStateToProps = (state) => {
  return {
    dishes: state.RestaurantDish.dishes,
    isDishAdded: state.RestaurantDish.isDishAdded,
    reviews: state.Review.reviews,
  };
};

export default connect(mapStateToProps, {
  getAllDishesAction,addDishAction,updateDishAction, getRestaurantReviews
})(WrappedContainer,RestaurantDashboard);

