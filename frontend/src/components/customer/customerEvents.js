import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachEventCustomer from "../individual/individualEvents";
import EachRegisteredEvent from "../individual/individualRegistredEvents";
import { connect } from "react-redux";
import { getCutomerUnregisteredEvents , getCustomerRegisteredEvents } from "../../redux/actions/eventAction";


class CustomerEvents extends Component {
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
      getAllEvents:"",
    };
  }

  eventSearch = (e) => {
    this.setState({
      pattern: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    this.props.getCutomerUnregisteredEvents();
    this.props.getCustomerRegisteredEvents({CID: localStorage.getItem("CID")});
   
  }

componentWillReceiveProps(nextProps){
  console.log("in customer recieve all events", nextProps);
  this.setState({
    events: nextProps.events,
    registered_events: nextProps.registered_events,
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
              style={{ marginLeft: "45%" }}
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
                marginLeft: "15%",
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
            <h2 style={{ paddingLeft: "28%" }}>Registered Events</h2>
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


const mapStateToProps = (state) => {
  return {
    getAllEvents: state.Events.getAllEvents,
    registered_events: state.Events.registered_events,
    events: state.Events.events,
  };
};

export default connect(mapStateToProps, {
  getCutomerUnregisteredEvents , getCustomerRegisteredEvents 
})(CustomerEvents);
