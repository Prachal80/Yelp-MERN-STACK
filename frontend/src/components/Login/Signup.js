import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import M from "materialize-css";

import logo from "../../img/signup_illustration.png";
import { Redirect } from "react-router";

const options = [
  { label: "customer", value: "customer" },
  { label: "restaurant", value: "restaurant" },
];

//Define a Login Component
class Signup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      password: "",
      email: "",
      location: "",
      userType: "customer",
      isRestaurant: false,
      ErrorMessage: "",
    };
    //Bind the handlers to this class
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  userTypeChangeHandler = (e) => {
    console.log("user type: ", e.target.value);
    if (e.target.value === "restaurant") {
      this.setState({
        isRestaurant: true,
        userType: "restaurant",
      });
    } else if (e.target.value === "customer") {
      this.setState({
        isRestaurant: false,
        userType: "customer",
      });
    }
    this.setState({
      userType: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitSignup = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    //e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType,
      location: this.state.location,
    };
    console.log(data);

    if (
      data.email !== "" &&
      data.username !== "" &&
      data.password !== "" &&
      data.userType !== ""
    ) {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.email
        )
      ) {
        M.toast({ html: "Invalid email", classes: "#fc2837 red darken-3" });
      } else {
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        return axios
          .post(
            "http://" + process.env.REACT_APP_IP + ":3001" + "/signup",
            data
          )
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response, ", response.data.success);
            if (response.data.success) {
            //   window.location.assign("/login");
              M.toast({
                html: "Signup success",
                classes: "green darken-1",
              });
            }
          })
          .catch((response) => {
            this.setState({
              authFlag: false,
              ErrorMessage: "Please provide all the details",
            });
          });
      }
    } else {
      M.toast({
        html: "Please Provide all the details",
        classes: "red darken-1",
      });
    }
  };

  UserRestaurant = () => {
    // console.log("Res location");
    if (this.state.isRestaurant) {
    //   console.log("Res location");
      return (
        <div class="form-group">
          <input
            placeholder="Location"
            type="text"
            className="form-control"
            id="Location"
            aria-describedby="Location"
            required
            onChange={this.LocationChangeHandler}
          />
        </div>
      );
    } else {
    //   console.log("In else");
    }
  };

  render() {
    let redirectVar = null;
    if (localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div class="outer">
        <div className="container">
          <form
            id="myForm"
            style={{
              margin: "15% 13% 20%",
              width: "25%",
              float: "left",
            }}
            onSubmit={this.submitSignup}
          >
            <div style={{ textAlign: "center" }}>
              <label for="myForm">
                <span>
                  <l
                    style={{
                      color: "#D32323",
                      fontSize: "15pt",
                      fontWeight: "bold",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Sign Up on Yelp
                  </l>
                </span>

                <p
                  style={{
                    fontSize: "12pt",
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <l> Already registered ? </l>
                  <l>
                    <a href="/login">Login</a>
                  </l>
                </p>
              </label>
            </div>
            <div class="form-group">
              <input
                placeholder="Name"
                type="text"
                className="form-control"
                id="exampleInputName"
                required
                onChange={this.nameChangeHandler}
              />
            </div>
            <div class="form-group">
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                required
                onChange={this.emailChangeHandler}
              />
            </div>
            <div class="form-group">
              <input
                placeholder="Password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                required
                onChange={this.passwordChangeHandler}
              />
            </div>

            {this.UserRestaurant()}
            {/* <UserRestaurant /> */}
            <div class="form-group">
              <label for="inputState">User Type:</label>
              <select
                id="userType"
                class="form-control"
                onChange={this.userTypeChangeHandler}
                value={this.state.userType}
                isSearchable
                required
              >
                <option value="select" disabled>
                  Select
                </option>
                <option value="customer" selected>
                  Customer
                </option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <button
              type="submit"
              class="btn "
              style={{
                width: "100%",
                color: "#ffffff",
                fontWeight: "bold",
                backgroundColor: "#D32323",
              }}
            >
              Sign Up
            </button>
          </form>
          <img
            className="image-work"
            src={logo}
            alt="Signup Illustration"
            style={{ marginTop: "140px", PaddingRight: "60%" }}
          />
        </div>
      </div>
    );
  }
}

export default Signup;
