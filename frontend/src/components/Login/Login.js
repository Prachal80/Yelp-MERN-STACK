import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import logo from "../../img/signup_illustration.png";
import M from "materialize-css";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    // console.log("*********", process.env);
    this.setState({
      authFlag: false,
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  userTypeChangeHandler = (e) => {
    console.log("user type: ", e.target.value);
    this.setState({
      userType: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      userType: this.state.userType,
    };
    console.log(data);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    if (data.username !== "" && data.password !== "" && data.userType !== "") {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.username
        )
      ) {
        M.toast({ html: "Invalid email", classes: "#fc2837 red darken-3" });
      } else {
         return axios
          .post("http://" + process.env.REACT_APP_IP + ":3001" + "/login", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response, ", response.data);
            if (response.data.success && data.userType === "customer") {
              localStorage.setItem("user", "customer");
              localStorage.setItem("CID", response.data.res[0].id);
              localStorage.setItem("Cname", response.data.res[0].name);
              localStorage.setItem("Cemail", response.data.res[0].email);
              window.location.assign("/customer/dashboard");
              M.toast({
                html: "Signup success",
                classes: "green darken-1",
              });
            } else if (
              response.data.success &&
              data.userType === "restaurant"
            ) {
              localStorage.setItem("user", "restaurant");
              localStorage.setItem("RID", response.data.res[0].id);
              localStorage.setItem("Rname", response.data.res[0].name);
              localStorage.setItem("Remail", response.data.res[0].email);
              window.location.assign("/restaurant/dashboard");
              M.toast({
                html: "Signup success",
                classes: "green darken-1",
              });
            }
          })
          .catch((response) => {
            this.setState({
              authFlag: false,
              ErrorMessage: "Invalid Login Credentials",
            });
          });
      }
    } else {
      this.setState({
        authFlag: false,
        ErrorMessage: "Please Provide all the details",
      });
      M.toast({
        html: "Please Provide all the details",
        classes: "red darken-1",
      });
    }
  };

  render() {
    // redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/customer/dashboard" />;
    } else if (localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/restaurant/dashboard" />;
    }

    return (
      <div class="outer">
        {redirectVar}
        <div className="container">
          <form
            id="myForm"
            style={{
              margin: "15% 13% 20%",
              width: "25%",
              float: "left",
            }}
            onSubmit={this.submitLogin}
          >
            <div style={{ textAlign: "center" }}>
              <label for="myForm">
                <span style={{}}>
                  <l
                    style={{
                      color: "#D32323",
                      fontSize: "15pt",
                      fontWeight: "bold",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Sign in to Yelp
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
                  <l> New to yelp ? </l>
                  <l>
                    <a href="/signup">Sign up</a>
                  </l>
                </p>
              </label>
            </div>
            <div class="form-group">
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                onChange={this.usernameChangeHandler}
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
            <div class="form-group">
              <label for="inputState">User Type:</label>
              <select
                id="userType"
                class="form-control"
                onChange={this.userTypeChangeHandler}
                value={this.state.value}
                required
                isSearchable
              >
                <option value="select" selected disabled>
                  Select
                </option>
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <button
              onClick={this.submitLogin}
              type="submit"
              class="btn "
              style={{
                width: "100%",
                color: "#ffffff",
                fontWeight: "bold",
                backgroundColor: "#D32323",
              }}
            >
              Sign In
            </button>
            <br />
            <br />
            <p
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                backgroundColor: "#D32323",
                textAlign: "center",
                borderRadius: "4%",
              }}
            >
              {this.state.ErrorMessage}
            </p>
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
//export Login Component
export default Login;
