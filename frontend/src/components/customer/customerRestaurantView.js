import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import Container from "react-bootstrap/Container";
import { BsStarFill, FaRoad } from "react-icons/all";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import OrderEachDish from "../individual/individualOrderDish";
import EachCustomerReview from "../individual/indivudalReview";
import {postCustomerReview, getAllReviews} from "../../redux/actions/reviewAction";
import { connect } from "react-redux";
import Pagination from "../Pagination";



var dotenv = require("dotenv").config({
  path: "../.env",
});

class customerRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantid: this.props.location.state.restaurantid,
      path: this.props.location.state.path,
      name: this.props.location.state.name,
      location: this.props.location.state.location,
      address: this.props.location.state.address,
      state: this.props.location.state.state,
      country: this.props.location.state.country,
      description: this.props.location.state.description,
      timings: this.props.location.state.timings,
      email: this.props.location.state.email,
      contact: this.props.location.state.contact,
      ratings: this.props.location.state.ratings,
      restaurantprofilepic: this.props.location.state.restaurantProfilePic,
      dishes: [],
      reviews: [],
      //Review form
      isAdd: false,
      rating: "",
      review: "",
      reviewdate: "",
      messages: [],
      message: "",

      //pagination
      currentPage:1,
      dishesPerPage: 2,
      indexOfLastDish: 2,
      indexOfFirstDish: 0,
      currentDishes: [],

    };
    this.ChangeHandler = this.ChangeHandler.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    console.log("Inside message change handler", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    console.log("RID", this.state.restaurantid);
    console.log("%%%%%%%%%%%%%%%% data of restaurants", this.props.location.state);
      //Get All dishes
      axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
      axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/customerDishes/getAllDishes",
        {
          params: {},
        }
      )
      .then((response) => {
        let currentDishes = this.props.location.state.dishes.slice(
          this.state.indexOfFirstDish,
          this.state.indexOfLastDish
        )

        console.log("Received Dishes", response.data.customerDishGet);
        this.setState({
          dishes: this.state.dishes.concat(this.props.location.state.dishes),
          currentDishes : currentDishes
        });

      
      });

      //Get customer reviews
      this.props.getAllReviews({CID: localStorage.getItem("CID"),
      RID: this.state.restaurantid})

      //get all messages
      axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
      axios.get( "http://" +
      process.env.REACT_APP_IP +
      ":3001" +
      "/message/messages",
    {
      params: {CID: localStorage.getItem("CID"), RID: this.state.restaurantid },
    }).then(response=>{
      console.log("Message ",response);
      this.setState({
        messages:response.data.messages,
      })
    })
  }

   // Change page
   paginate = (pageNumber) => {
    console.log("pagenumber ", pageNumber);

    let indexOfLastDish = pageNumber * this.state.dishesPerPage;
    let indexOfFirstDish = indexOfLastDish - this.state.dishesPerPage;
    let allDishes = this.state.dishes;
    let currentDishes = allDishes.slice(
      indexOfFirstDish,
      indexOfLastDish
      
    );

    this.setState({
      currentPage: pageNumber,
      indexOfLastDish: indexOfLastDish,
      indexOfFirstDish: indexOfFirstDish,
      currentDishes: currentDishes,
    });

  };


  componentWillReceiveProps(nextProps) {
    console.log("in customer restaurant recieve posted reviews", nextProps);
    
    this.setState({
      reviews: nextProps.reviews
    });
  }

  //Post the review
  submitReview = async (e) => {
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
      await this.props.postCustomerReview(data);
      // this.setState({
      //   isAdd: true,
      // })
      //window.location.reload();
    } else {
      alert("Please add all the review fields");
    }
  };

  //Send Message Customer
  sendMessage = async (e) =>{

    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = { 
      RID: this.state.restaurantid,
      CID: localStorage.getItem("CID"),
      name:  localStorage.getItem("Cname"),
      message: this.state.message,
    }
    if(this.state.messages.length>0){
      axios.post("http://" +
      process.env.REACT_APP_IP +
      ":3001" +
      "/message/customer", data
   )
   .then(response=>{
      console.log("Message ",response);
      this.setState({
        messages:response.data.message.message,
      })
    })
    }
    else{
      alert("Can not start conversation");
    }  
    
  }
  


  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let redirectUrl= null;
    if(this.state.isAdd){
      redirectUrl = <Redirect to="/customer/customerrestaurantview" />;
      this.setState({
        isAdd: false,
      })
    }

    let CustomerReview = this.state.reviews.map((review) => {
      return <EachCustomerReview data={review}></EachCustomerReview>;
    });

    let orderDishAll = this.state.currentDishes.map((dish) => {
      return <OrderEachDish data={dish}></OrderEachDish>; 
    });
    let messageFuction =this.state.messages.map((message)=>{
      return <p style={{
        marginBottom: "2px",
      }}>
          <span style={{
              background: "#429ef5",
              borderRadius:"5px",
              color: "#ffffff",
              borderBlockColor: "white",
              border: "1px solid #ffffff",
              padding: "5px",
    
      }}>{message}
      </span>
      </p>
    }) 

  
    return (
      <div>
        {redirectVar}
        {redirectUrl}
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
              
                height: "200px",
              }}
              class="col-5"
            >
              <div style={{ height: "600px", marginBottom:"50px" }} >{orderDishAll}
            
              </div>
              <div style={{marginLeft:"25%"}}>
                  <Pagination
                  elementsPerPage= {this.state.dishesPerPage}
                  totalElements={this.state.dishes.length}
                  paginate={this.paginate}
                  />
              </div>
            </div>
           
            <div class="rightdiv">

              <div
              style={{
                marginLeft: "25%",
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
                  onSubmit={this.sendMessage}
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
                      Message from {this.state.name}
                    </p>
                    <hr />
                    <Col>
                      <div 
                      style={{
                        //marginLeft: "5%",
                        overflowY: "scroll",
                        height: "100px",
                      }}
                      class="overflow-auto">{messageFuction}</div>
                      <Row xs={15}>
                        <input
                          height="100px"
                          type="text"
                          name="message"
                          placeholder="Type text"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />

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
                        send
                      </button>
                      </Row>
                    
                    </Col>
                  </Container>
                </form>
              </div>
              <div
                style={{
                  marginLeft: "25%",
                  marginTop: "5%",
                  border: "1px solid black",
                  width: "100%",
                  height: "250px",
                  padding: "2%",
                  left: "80%",

                }}
                //class="col-6"
              >
                <br/>
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
                      <br/>
                    </Col>
                  </Container>
                </form>
                <br />
                <br />
                <h2 style={{textAlign:"center"}}> Reviews You Posted</h2>
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

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(customerRestaurantView);


const mapStateToProps = (state) => {
  return {
    newReview: state.Review.newReview,
    reviews: state.Review.reviews,
  };
};

export default connect(mapStateToProps, {
  postCustomerReview, getAllReviews
})(WrappedContainer,customerRestaurantView);

