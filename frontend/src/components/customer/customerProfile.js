import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { updateCustomerProfileAction, getCustomerProfileAction } from "../../redux/actions/customerProfileAction";
import { push } from 'react-router-redux';


var dotenv = require("dotenv").config({
  path: "../.env",
});

class CustomerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      nickname: "",
      headline: "",
      phone: "",
      emailid: "",
      blog: "",
      yelpingSince: "",
      thingsIlove: "",
      findMeIn: "",
      imagePath: "",
      ErrorMessage: "",
      updateFlag:false,
      followers:[],
      following:[]
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }
  componentDidMount() {
    
    //make a get request for the user data
    console.log("inside compo did mount");
    let data = {
      CID: localStorage.getItem("CID"),
    };
    console.log("cid ", data);
    this.props.getCustomerProfileAction(data);
  }

  componentWillReceiveProps(nextProps) {
    console.log("in customer will recieve props for details", nextProps.customerProfile);
    this.setState({
      name: nextProps.customerProfile.name,
      dob: nextProps.customerProfile.birthdate,
      city: nextProps.customerProfile.city,
      state: nextProps.customerProfile.state,
      country: nextProps.customerProfile.country,
      nickname: nextProps.customerProfile.nickname,
      headline: nextProps.customerProfile.headline,
      phone: nextProps.customerProfile.phone,
      emailid: nextProps.customerProfile.email,
      blog: nextProps.customerProfile.blog,
      yelpingSince: nextProps.customerProfile.yelpingSince,
      thingsIlove: nextProps.customerProfile.thingsIlove,
      findMeIn: nextProps.customerProfile.findMeIn,
      imagePath: nextProps.customerProfile.profilePic,
      followers: nextProps.customerProfile.followers,
      following: nextProps.customerProfile.following,
    });
  }

 // change handlers to update state variable with the text entered by the user
 ChangeHandler = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
  //submit Login handler to send a request to the node backend
  submitUpdate = async (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      dob: this.state.dob,
      emailid: this.state.emailid,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      nickname: this.state.nickname,
      headline: this.state.headline,
      phone: this.state.phone,
      blog: this.state.blog,
      yelpingSince: this.state.yelpingSince,
      thingsIlove: this.state.thingsIlove,
      findMeIn: this.state.findMeIn,
      CID: localStorage.getItem("CID"),
     
      
    };
    console.log(data);
    await this.props.updateCustomerProfileAction(data);
    this.setState({
      updateFlag:true,
    })
  
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }


    let redirectUrl= null;
    if(this.state.updateFlag){
      redirectUrl = <Redirect to="/customer/profile" />;
      this.setState({
        updateFlag: false,
      })
    }

    return (
      <div>
        {redirectVar}
        {redirectUrl}
        <div>
          <div class="row" style={{ backgroundColor: "" }}>
            <img
              src={
                "http://" +
                process.env.REACT_APP_IP +
                ":3001/" +
                this.state.imagePath
              }
              alt="Profile Pic"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                margin: "2% 0 2% 3%",
              }}
            ></img>
            <div
              class="topHeadline"
              style={{
                position: "absolute",
                width: "60%",
                height: "20%",
                left: "20%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
                textAlign: "center",
              }}
            >
              <p>
                {this.state.city}, {this.state.state}, {this.state.country}
              </p>
              <p>{this.state.headline}</p>
              <p>Followers: {this.state.followers.length} </p>
              <p>Following: {this.state.following.length} </p> 
            </div>
            <div
              class="card"
              style={{
                position: "absolute",
                width: "20%",
                height: "20%",
                right: "0%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
                textAlign: "justify",
              }}
            >
              <p>Yelping Since:{this.state.yelpingSince}</p>
              <p>Things I Love: {this.state.thingsIlove}</p>
              <p>Find me In: {this.state.findMeIn}</p>
              <p>My blog: {this.state.blog}</p>
            </div>
          </div>
          <hr />
          <br />
          <br />
          <div>
            <form
              action="http://localhost:3001/customerProfile/updateCustomerProfilePic"
              method="POST"
              encType="multipart/form-data"
              style={{
                position: "absolute",
                width: "15%",
                height: "15%",
                marginLeft: "2%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                name="CID"
                value={localStorage.getItem("CID")}
                style={{ display: "none", width: "10px" }}
              />
              <input type="file" name="profilePic" />
              <br />
              <br />

              <button
                type="submit"
                class="btn"
                style={{
                  backgroundColor: "#D32323",
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderBlockColor: "white",
                  border: "1px #D32323",
                  width: "150px",
                }}
              >
                Update Picture
              </button>

              <br />
              <br />
            </form>
          </div>
          <div class="wrapper fadeInDown">
            <div
              style={{
                position: "absolute",
                width: "30%",
                top: "63%",
                left: "2%",
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <p>Name : {this.state.name}</p>
              <p>Nick Name : {this.state.nickname}</p>
              <p>Email : {this.state.emailid}</p>
              <p>Phone : {this.state.phone}</p>
              <p>DOB : {this.state.dob}</p>
              <p></p>
            </div>
            <div id="formContent">
              <form
                onSubmit={this.submitUpdate}
                style={{
                  position: "absolute",
                  background: "#ffe6e6",
                  marginLeft: "0%",
                  left: "23%",
                  top: "57%",
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
                    Update your Details
                  </p>
                  <Row>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        class="form-control"
                        id="exampleInputPassword"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="date"
                        name="dob"
                        class="form-control"
                        placeholder="DOB"
                        id="dob"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="headline"
                        placeholder="Headline"
                        class="form-control"
                        id="headline"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="city"
                        class="form-control"
                        placeholder="City"
                        id="city"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="state"
                        class="form-control"
                        id="state"
                        placeholder="State"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="country"
                        class="form-control"
                        placeholder="Country"
                        id="country"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="nickname"
                        class="form-control"
                        id="nickname"
                        placeholder="Nickname"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="yelpingSince"
                        class="form-control"
                        placeholder="Yelping Since"
                        id="Yelping Since"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="thingsIlove"
                        class="form-control"
                        id="thingsILove"
                        placeholder="Things I love"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="findMeIn"
                        class="form-control"
                        placeholder="Find Me In"
                        id="findMeIn"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="blog"
                        class="form-control"
                        id="blog"
                        placeholder="My Blog"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={5}>
                      <input
                        type="email"
                        name="emailid"
                        class="form-control"
                        placeholder="Email"
                        id="emailid"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={5}>
                      <input
                        type="text"
                        name="phone"
                        class="form-control"
                        id="phone"
                        placeholder="Phone"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                </Container>
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
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isProfileUpdated: state.CustomerProfile.isProfileUpdated,
    customerProfile: state.CustomerProfile.customerProfile,
  };
};



export default connect(mapStateToProps, {
  updateCustomerProfileAction,
  getCustomerProfileAction,
})(CustomerProfile);

