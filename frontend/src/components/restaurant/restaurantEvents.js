import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EachEventRestaurant from "../individual/individualEvents";
import EachRegisteredEvent from "../individual/individualRegistredEvents";

export class restaurantEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      events: [],
      registered_events: [],
    };

    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addEvent = (e) => {
    e.preventDefault();
    const data = {
      eventname: this.state.eventname,
      eventdescription: this.state.eventdescription,
      eventtime: this.state.eventtime,
      eventdate: this.state.eventdate.slice(0, 10).replace("T", " "),
      eventlocation: this.state.eventlocation,
      hashtags: this.state.hashtags,
      restaurantname: localStorage.getItem("Rname"),
      restaurantid: localStorage.getItem("RID"),
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/addRestaurantEvents",
        data
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/restaurant/events");
        }
      })
      .catch((response) => {
        this.setState({
          ErrorMessage: "Something went wrong on event adding",
        });
      });
  };
  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All unregistered events
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/getAllEvents",
        {
          params: {
            RID: localStorage.getItem("RID"),
          },
        }
      )
      .then((response) => {
        console.log("Received all restaurant Events");

        this.setState({
          events: this.state.events.concat(response.data.restaurantEventsGet),
        });
      });

    //Get All registered customers
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantEvents/getRegisteredCustomers",
        {
          params: {
            RID: localStorage.getItem("RID"),
          },
        }
      )
      .then((response) => {
        console.log("Received all registered Events");

        this.setState({
          registered_events: this.state.registered_events.concat(
            response.data.getRegisteredCustomers
          ),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }
    let upcomingEvents = this.state.events.map((event) => {
      return <EachEventRestaurant data={event}></EachEventRestaurant>;
    });

    let registeredCustomers = this.state.registered_events.map(
      (registeredCustomer) => {
        return (
          <EachRegisteredEvent data={registeredCustomer}></EachRegisteredEvent>
        );
      }
    );

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}> Events</h2>
          <br />
          <hr />
        </div>

        <div class="row">
          <div
            style={{
              width: "100%",
              overflowY: "scroll",
              height: "700px",
            }}
            class="col-6"
          >
            <h2>Registered Customers</h2>
            {registeredCustomers}
          </div>
          <div
            style={{ width: "100%", marginLeft: "" }}
            class="row"
            class="overflow-auto"
            class="col-6"
          >
            <div style={{}}>
              <form
                onSubmit={this.addEvent}
                style={{
                  background: "#ffe6e6",
                  border: "1px solid black",
                  marginLeft: "0%",
                  top: "30%",
                }}
              >
                <Container style={{ padding: "10px" }}>
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "2px",
                    }}
                  >
                    Add Events
                  </p>
                  <Row style={{ padding: "5px" }}>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="eventname"
                        placeholder="Event Name"
                        class="form-control"
                        required
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={6}>
                      <input
                        type="date"
                        name="eventdate"
                        class="form-control"
                        placeholder="DOB"
                        required
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>

                  <Row style={{ padding: "5px" }}>
                    <Col xs={5}>
                      <input
                        type="text"
                        name="eventtime"
                        placeholder="Time"
                        class="form-control"
                        required
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="eventlocation"
                        class="form-control"
                        placeholder="Location"
                        required
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: "5px" }}>
                    <Col xs={12}>
                      <input
                        type="text"
                        name="eventdescription"
                        class="form-control"
                        id="state"
                        required
                        placeholder="Details"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <input
                        type="text"
                        name="hashtags"
                        class="form-control"
                        placeholder="Hashtags"
                        required
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                </Container>

                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{
                    background: "#D32323",
                    color: "#ffffff",
                    fontWeight: "bold",
                    borderBlockColor: "white",
                    border: "1px #D32323",
                    marginTop: "5px",
                    marginLeft: "40%",
                    marginBottom: "5px",
                  }}
                >
                  Add Event
                </button>
              </form>
              <div style={{ marginTop: "10%", marginLeft: "10%" }}>
                <h2 style={{ marginLeft: "10%" }}>All Upcoming Events</h2>
                {upcomingEvents}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default restaurantEvents;
