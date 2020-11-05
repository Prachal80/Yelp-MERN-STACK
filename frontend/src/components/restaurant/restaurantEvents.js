import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EachEventRestaurant from "../individual/individualEvents";
import EachRegisteredEvent from "../individual/individualRegistredEvents";
import { connect } from "react-redux";
import { getRegisteredCustomers , getRestauarantEvents ,postRestaurantEvents} from "../../redux/actions/eventAction";
import Pagination from "../Pagination";

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
      isAdd: false,

      //pagination
      currentPage:1,
      eventsPerPage: 2,
      indexOfLastEvent: 2,
      indexOfFirstEvent: 0,
      currentEvents: [],
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
  addEvent = async (e) => {
    e.preventDefault();
    const data = {
      eventname: this.state.eventname,
      eventdescription: this.state.eventdescription,
      eventtime: this.state.eventtime,
      eventdate: this.state.eventdate,
      eventlocation: this.state.eventlocation,
      hashtags: this.state.hashtags,
      restaurantname: localStorage.getItem("Rname"),
      restaurantid: localStorage.getItem("RID"),
      
    };
    console.log(data);
    //set the with credentials to true
    //axios.defaults.withCredentials = true;

    await this.props.postRestaurantEvents(data);
    this.setState({
        isAdd: true,
      })
    
  };
  componentDidMount() {
    axios.defaults.withCredentials = true;

    this.props.getRestauarantEvents( {RID: localStorage.getItem("RID")});

    this.props.getRegisteredCustomers({RID: localStorage.getItem("RID")});
    
  }

  componentWillReceiveProps(nextProps){
    console.log("in restaurant recieve props", nextProps);

    let currentEvents = nextProps.restaurant_events.slice(
      this.state.indexOfFirstEvent,
      this.state.indexOfLastEvent
    )
    console.log("Current events ", currentEvents );
    this.setState({
      events: nextProps.restaurant_events,
      registered_events: nextProps.registered_events,
      currentEvents: currentEvents
  });
  }

    // Change page
    paginate = (pageNumber) => {
      console.log("pagenumber ", pageNumber);
  
      let indexOfLastEvent = pageNumber * this.state.eventsPerPage;
      let indexOfFirstEvent = indexOfLastEvent - this.state.eventsPerPage;
      let allEvents = this.state.events;
      let currentEvents = allEvents.slice(
        indexOfFirstEvent,
        indexOfLastEvent
        
      );
      console.log("updated events", currentEvents);
      this.setState({
        currentPage: pageNumber,
        indexOfLastEvent: indexOfLastEvent,
        indexOfFirstEvent: indexOfFirstEvent,
        currentEvents: currentEvents,
      });
  
    };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let redirectUrl= null;
    if(this.state.isAdd){
      redirectUrl = <Redirect to="/restaurant/events" />;
      this.setState({
        isAdd: false,
      })
    }


    let upcomingEvents = this.state.currentEvents.map((event) => {
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
        {redirectUrl}
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
            class="col-5"
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
              <div style={{ 
              marginTop: "10%",
              marginLeft: "10%" ,
              width: "100%",
              overflowY: "scroll",
              height: "700px"
              }}>
                <h2 style={{ marginLeft: "10%" }}>All Upcoming Events</h2>
                {upcomingEvents}
                <div style={{marginLeft:"25%"}}>
                  <Pagination
                  elementsPerPage= {this.state.eventsPerPage}
                  totalElements={this.state.events.length}
                  paginate={this.paginate}
                  />
                  </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    restaurant_events:state.Events.restaurant_events,
    registered_events: state.Events.registered_customers,
  };
};

export default connect(mapStateToProps, {
  getRegisteredCustomers , getRestauarantEvents ,postRestaurantEvents
})(restaurantEvents);
