import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default class individualEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
    };
  }

  render() {
    let userSide = null;

    if (localStorage.getItem("user") === "customer") {
      userSide = (
        <Card border="secondary" style={{ width: "20rem" }}>
          <Card.Header>
            <h5 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.eventname}
            </h5>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col xs={15}>
                    <p style={{ marginBottom: "0px" }}>
                      Location :{this.props.data.eventlocation}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Date:{" "}
                      {this.props.data.eventdate.slice(0, 10).replace("T", " ")}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Orgaized by: {this.props.data.restaurantname}
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginTop: "5px" }}>
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
                      pathname: "/customer/customereventview",
                      state: {
                        eventid: this.props.data.eventid,
                        path: "/customer/events",
                      },
                    }}
                  >
                    Event Details
                  </Link>
                </Row>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      );
    } else if (localStorage.getItem("user") === "restaurant") {
      userSide = (
        <Card border="secondary" style={{ width: "20rem" }}>
          <Card.Header>
            <h5 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.eventname}
            </h5>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col xs={15}>
                    <p style={{ marginBottom: "0px" }}>
                      Location :{this.props.data.eventlocation}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Date:{" "}
                      {this.props.data.eventdate.slice(0, 10).replace("T", " ")}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Time: {this.props.data.eventtime}
                    </p>
                  </Col>
                </Row>
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
