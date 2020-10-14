import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BsStarFill } from "react-icons/all";

export default class individualReview extends Component {
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
        <h5 style={{ textAlign: "center", alignContent: "center" }}>
          {this.props.data.restaurantname}
        </h5>
      );
    } else {
      userSide = (
        <h5 style={{ textAlign: "center", alignContent: "center" }}>
          Review By : {this.props.data.customername}
        </h5>
      );
    }

    return (
      <div
        style={{
          //   marginLeft: "5%",
          marginLeft: "0%",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
          margin: "2%",
        }}
      >
        <Card border="secondary" style={{ width: "20rem" }}>
          <Card.Header>{userSide}</Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col xs={15}>
                    <p style={{ marginBottom: "0px" }}>
                      Ratings :{this.props.data.rating} <BsStarFill />
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Review: {this.props.data.review}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      Date: {this.props.data.reviewdate.slice(0, 10)}
                    </p>
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
