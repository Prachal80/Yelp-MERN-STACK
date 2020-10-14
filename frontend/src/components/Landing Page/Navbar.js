import React, { Component } from "react";
import yelp from "../../img/yelp.png";
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie

  handleLogout = () => {
    if (localStorage.getItem("CID")) {
      localStorage.removeItem("user");
      localStorage.removeItem("CID");
      localStorage.removeItem("Cemail");
      localStorage.removeItem("Cname");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("RID");
      localStorage.removeItem("Remail");
      localStorage.removeItem("Rname");
    }
  };
  render() {
    //if Cookie is set render Logout Button
    let redirectVar = null;
    let NavBar = null;
    if (localStorage.getItem("CID")) {
      // redirectVar = <Redirect to="/customer/dashboard" />;
      NavBar = (
        <nav
          class="navbar navbar-expand-lg"
          style={{
            background: "#D32323",
            width: "100%",
            height: "60px",
          }}
        >
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src={yelp}
              alt="Signup Illustration"
              style={{
                width: "100px",
                height: "60px",
                marginLeft: "47%",
                marginRight: "auto",
              }}
            />
            {
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/customer/dashboard"
                  >
                    Dashboard <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/customer/profile"
                  >
                    Profile <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/customer/orders"
                  >
                    Orders <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/customer/events"
                  >
                    Events <span class="sr-only"></span>
                  </a>
                </li>
                <li onClick={this.handleLogout} class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/login"
                  >
                    Logout <span class="sr-only"></span>
                  </a>
                </li>
              </ul>
            }
          </div>
        </nav>
      );
      console.log("Customer Local Storage");
    } else if (localStorage.getItem("RID")) {
      NavBar = (
        <nav
          class="navbar navbar-expand-lg"
          style={{
            background: "#D32323",
            width: "100%",
            height: "60px",
          }}
        >
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src={yelp}
              alt="Signup Illustration"
              style={{
                width: "100px",
                height: "60px",
                marginLeft: "47%",
                marginRight: "auto",
              }}
            />
            {
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/restaurant/dashboard"
                  >
                    Dashboard <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/restaurant/profile"
                  >
                    Profile <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/restaurant/orders"
                  >
                    Orders <span class="sr-only"></span>
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/restaurant/events"
                  >
                    Events <span class="sr-only"></span>
                  </a>
                </li>
                <li onClick={this.handleLogout} class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/login"
                  >
                    Logout <span class="sr-only"></span>
                  </a>
                </li>
              </ul>
            }
          </div>
        </nav>
      );
      console.log("Restaurant Local Storage");
      // redirectVar = <Redirect to="/restaurant/dashboard" />;
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      NavBar = (
        <nav
          class="navbar navbar-expand-lg"
          style={{
            background: "#D32323",
            width: "100%",
            height: "60px",
          }}
        >
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src={yelp}
              alt="Signup Illustration"
              style={{
                width: "100px",
                height: "60px",
                marginLeft: "47%",
                marginRight: "auto",
              }}
            />
            {
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/login"
                  >
                    Login <span class="sr-only"></span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a
                    class="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                    href="/"
                  >
                    Home <span class="sr-only"></span>
                  </a>
                </li>
              </ul>
            }
          </div>
        </nav>
      );
      // redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        {NavBar}
      </div>
    );
  }
}

export default Navbar;
