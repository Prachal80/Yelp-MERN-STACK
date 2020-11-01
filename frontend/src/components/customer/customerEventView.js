import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Card, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {postCutomerRegister}  from "../../redux/actions/eventAction";

class customerEventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventid: "",
      eventname: "",
      eventdescription: "",
      eventtime: "",
      eventdate: "",
      eventlocation: "",
      hashtags: "",
      restaurantname: "",
      customername: "",
      restaurantid: "",
      customerid: "",
      ErrorMessage: "",
      registered: false,
    };
  }

  //Register for the event
  registerEvent = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      eventid: this.state.eventid,
      eventname: this.state.eventname,
      eventdescription: this.state.eventdescription,
      eventtime: this.state.eventtime,
      eventdate: this.state.eventdate.slice(0, 10).replace("T", " "),
      eventlocation: this.state.eventlocation,
      hashtags: this.state.hashtags,
      restaurantid: this.state.restaurantid,
      restaurantname: this.state.restaurantname,
      customername: localStorage.getItem("Cname"),
      customerid: localStorage.getItem("CID"),
    };
    console.log("Event regisstration customer Data", data);
    //set the with credentials to true
    if (!this.state.registered) {
      this.props.postCutomerRegister(data);
    } else {
      alert("Already Registered for this event");
    }
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //make a get request for the user data
    let data = {
      eventid: this.props.location.state.eventid,
    };
    console.log("########### Getting Event deatails", data);
    axios({
      url:
        "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/customerEvents/getSingleEvent",
      method: "GET",
      params: data,
    }).then((response) => {
       console.log("Customer event details", response.data.customerEventDetails[0]);
      let EventData = response.data.customerEventDetails[0];
      this.setState({
        eventid: EventData._id,
        eventname: EventData.eventname,
        eventdescription: EventData.eventdescription,
        eventtime: EventData.eventtime,
        eventdate: EventData.eventdate,
        eventlocation: EventData.eventlocation,
        hashtags: EventData.hashtags,
        restaurantname: EventData.restaurantname,
        restaurantid: EventData.restaurantid,
      });
      console.log("Event id", this.state.eventid);
    });

    //make a get request for the customer event registration data
    let data1 = {
      customerid: localStorage.getItem("CID"),
      eventid: this.props.location.state.eventid,
    };
    console.log("########### Getting Event deatails", data1);
    axios({
      url:
        "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/customerEvents/getRegisteredCustomer",
      method: "GET",
      params: data1,
    }).then((response) => {
      // console.log("profile details", response.data.profileData[0]);
      //let EventCustomer = response.data.getRegisteredCustomer[0];

      if (response.data.success) {
        console.log("Has registered");
        this.setState({
          registered: true,
        });
      }
    });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="centered">
          <h1 style={{ textAlign: "center" }}> Event Details </h1>
          <hr />
          <Card border="secondary" style={{ width: "50rem", margin: "auto" }}>
            <Card.Header>
              <h5 style={{ textAlign: "center", alignContent: "center" }}>
                {this.state.eventname}
              </h5>
            </Card.Header>
            <Card.Body>
              <Fragment>
                <Container>
                  <Row xs={60}>
                    <Col xs={60}>
                      <p style={{ marginBottom: "0px" }}>
                        Location :{this.state.eventlocation}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Date:{" "}
                        {this.state.eventdate}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Time: {this.state.eventtime}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Organized by: {this.state.restaurantname}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Description: {this.state.eventdescription}
                      </p>
                      <p style={{ marginBottom: "4px" }}>
                        Hashtags: {this.state.hashtags}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        border: "1px #D32323",
                      }}
                      onClick={this.registerEvent}
                    >
                      Register
                    </button>
                  </Row>
                </Container>
              </Fragment>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRegistered: state.Events.isRegistered,
  };
};

export default connect(mapStateToProps, {
  postCutomerRegister
})(customerEventView);
