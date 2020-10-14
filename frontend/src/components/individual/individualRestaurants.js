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
    return (
      <div
        style={{
          //   marginLeft: "5%",
          //   marginLeft: "5%",
          //   border: "1px solid black",
          marginTop: "10px",
          marginBottom: "5px",
          paddingLeft: "40px",
          //   height: "300px",
          //   width: "600px",
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
                  <Col xs={6}>
                    <img
                      src={
                        "http://" +
                        process.env.REACT_APP_IP +
                        ":3001/" +
                        this.props.data.restaurantprofilepic
                      }
                      alt="Dish Image"
                      style={{
                        width: "100%",
                        height: "90%",
                      }}
                    />
                  </Col>
                  <Col xs={6} style={{ padding: "0px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.address}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.location}, {this.props.data.state}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.timings}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.contact}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.email}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.ratings} <BsStarFill />
                    </p>
                  </Col>
                </Row>
                <br />
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
                          restaurantid: this.props.data.id,
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
