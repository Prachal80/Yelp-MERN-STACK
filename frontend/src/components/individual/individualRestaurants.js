import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/all";

export default class individualRestaurant extends Component {
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

      showForm: false,
    };
  }

  render() {

    console.log("Restaurant Each component", this.props.data);
    return (
      <div
        style={{
          marginTop: "10px",
          marginBottom: "5px",
          paddingLeft: "40px",
         
        }}
      >
        <Card border="secondary" style={{}}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.name}
            </h3>
          </Card.Header>
          <Card.Body style={{ padding: "10px 5px 5px 5px" }}>
            <Fragment>
              <Container>
                <Row>
                  <Col style={{ marginRight:"0px", paddingLeft: "50px" }} xs={6}>
                    <img
                      src={
                        "http://" +
                        process.env.REACT_APP_IP +
                        ":3001/" +
                        this.props.data.restaurantProfilePic
                      }
                      alt="Dish Image"
                      style={{
                        width: "90%",
                        height: "90%",
                      }}
                    />
                  </Col>
                  <Col xs={6} style={{ marginLeft:"0px", padding: "0px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      Address: {this.props.data.address}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      City: {this.props.data.location}, {this.props.data.state}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Timings: {this.props.data.timings}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Contact: {this.props.data.contact}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Email: {this.props.data.email}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Ratings: {this.props.data.ratings} <BsStarFill />
                    </p>
                  </Col>
                </Row>
                {/* <br /> */}
                <Row>
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
                        pathname: "/customer/customerrestaurantview",
                        state: {
                          restaurantid: this.props.data._id,
                          name : this.props.data.name,
                          contact : this.props.data.contact,
                          timings:this.props.data.timings,
                          address:this.props.data.address,
                          state:this.props.data.state,
                          country:this.props.data.country,
                          ratings:this.props.data.ratings,
                          restaurantProfilePic: this.props.data.restaurantProfilePic,
                          email:this.props.data.email,
                          location:this.props.data.location,
                          dishes : this.props.data.dishes,
                          path: "/customer/dashboard",
                        },
                      }}
                    >
                      See Menu
                    </Link>
                    &nbsp;
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
