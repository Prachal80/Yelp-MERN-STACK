import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

export default class individualUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let userSide = null;

    if (localStorage.getItem("user") === "customer") {
      userSide = (
        <Card border="secondary" style={{ width: "20rem" }}>
          <Card.Header>
            <h5 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.name}
            </h5>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Col xs={40}>

                <Row>
                    <p style={{ marginBottom: "0px" }}>
                      Email:{" "}
                      {this.props.data.email}
                    </p>
                  </Row>
                  <Row>
                    <p style={{ marginBottom: "0px" }}>
                      Location: {this.props.data.city}
                    </p>
                  </Row>
                  <Row>
                    <p style={{ marginBottom: "0px" }}>
                  
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
                          pathname: "/customer/customeruserview",
                          state: {
                            id: this.props.data._id,
                            path: "/customer/users",
                          },
                        }}
                      >
                        Full Profile
                      </Link>
                    </p>
                  </Row>

                </Col>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      );
    } 

    else if (localStorage.getItem("user") === "restaurant") {
      userSide = (
        <Card border="secondary" style={{ width: "20rem" }}>
          <Card.Header>
            <h5 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.name}
            </h5>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Col xs={40}>

                <Row>
                    <p style={{ marginBottom: "0px" }}>
                      Email:{" "}
                      {this.props.data.email}
                    </p>
                  </Row>
                  <Row>
                    <p style={{ marginBottom: "0px" }}>
                      Location: {this.props.data.city}
                    </p>
                  </Row>
                  <Row>
                    <p style={{ marginBottom: "0px" }}>
                  
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
                          pathname: "/restaurant/restaurantcustomerview",
                          state: {
                            _id: this.props.data._id,
                            path: "/restaurant/users",
                          },
                        }}
                      >
                        Full Profile
                      </Link>
                    </p>
                  </Row>

                </Col>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      );
    }

    return (
      <div
        style={{
          marginLeft: "0%",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
          margin: "2%",
        }}
      >
        {userSide}
      </div>
    );
  }
}
