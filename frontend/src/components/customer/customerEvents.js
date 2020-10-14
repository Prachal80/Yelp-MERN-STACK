import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachEventCustomer from "../individual/individualEvents";
import EachRegisteredEvent from "../individual/individualRegistredEvents";

export class CustomerEvents extends Component {
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
      pattern: "",
    };
  }

  eventSearch = (e) => {
    this.setState({
      pattern: e.target.value,
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
          "/customerEvents/getAllEvents",
        {
          params: {
            CID: localStorage.getItem("CID"),
          },
        }
      )
      .then((response) => {
        console.log("Received all unregistered Events");

        this.setState({
          events: this.state.events.concat(response.data.customerEventsGet),
        });
      });

    //Get All registered events
    axios
      .get(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/customerEvents/getRegisteredEvents",
        {
          params: {
            CID: localStorage.getItem("CID"),
          },
        }
      )
      .then((response) => {
        console.log("Received all registered Events");

        this.setState({
          registered_events: this.state.registered_events.concat(
            response.data.getRegisteredEvents
          ),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }
    let upcomingEvents = this.state.events.map((event) => {
      if (this.state.pattern != "") {
        if (event.eventname.toLowerCase().includes(this.state.pattern)) {
          return <EachEventCustomer data={event}></EachEventCustomer>;
        }
      } else {
        return <EachEventCustomer data={event}></EachEventCustomer>;
      }
    });

    let registeredEvents = this.state.registered_events.map(
      (registeredEvent) => {
        return (
          <EachRegisteredEvent data={registeredEvent}></EachRegisteredEvent>
        );
      }
    );

    return (
      <div>
        {redirectVar}
        <div className="top">
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}> Events</h2>
          <br />
          &nbsp;
          <div className="form-group ">
            <input
              style={{ marginLeft: "43%" }}
              type="text"
              placeholder="Search Events"
              onChange={this.eventSearch}
              classNames="test-class"
            />
          </div>
          <hr />
        </div>

        <div class="row">
          <div style={{ paddingLeft: "10%" }} class="col-6">
            <h2
              style={{
                marginLeft: "23%",
              }}
            >
              Upcoming Events
            </h2>
            <div
              style={{
                marginLeft: "13%",
                overflowY: "scroll",
                height: "700px",
              }}
            >
              {upcomingEvents}
            </div>
          </div>
          <div style={{ paddingLeft: "4%" }} class="col-6">
            <h2 style={{ paddingLeft: "19%" }}>Registered Events</h2>
            <div
              style={{
                marginLeft: "13%",
                overflowY: "scroll",
                height: "700px",
              }}
            >
              {registeredEvents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerEvents;
