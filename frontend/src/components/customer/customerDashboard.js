import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import EachDish from "../individual/individualOrderDish";
import EachRestaurant from "../individual/individualRestaurants";
import {getAllRestaurantsAction} from "../../redux/actions/dishAction";
import { connect } from "react-redux";
import Pagination from "../Pagination";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
      dishes: [],
      restaurants: [],
      filter: "",
      pattern: "",
      searchCriteria: "dishes",
      cuisine: "",
      location: "",
      method: "",
      markers: [
        { latitude: 37.335845, longitude: -121.885866 },
        { latitude: 37.332818, longitude: -121.885144 },
        { latitude: 37.332074, longitude: -121.886889 },
        { latitude: 37.331105, longitude: -121.882943 },
        { latitude: 37.334246, longitude: -121.876356 },
        { latitude: 37.324849, longitude: -121.879581 },
        { latitude: 37.324545, longitude: -121.881218 },
      ],

      //pagination
      currentPage:1,
      restaurantsPerPage: 2,
      indexOfLastRestaurant: 2,
      indexOfFirstRestaurant: 0,
      currentRestaurants: [],
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
      searchCriteria: "",
      pattern:"",
    });
  };

  restaurantSearch = (e) => {
    this.setState({
      pattern: e.target.value,
    });
  };

  selectSearchCriteria = (e) => {
    this.setState({
      searchCriteria: e.target.value,
      filter: "",
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All dishes
    // axios
    //   .get(
    //     "http://" +
    //       process.env.REACT_APP_IP +
    //       ":3001" +
    //       "/customerDishes/getAllDishes",
    //     {
    //       params: {},
    //     }
    //   )
    //   .then((response) => {
    //     console.log("Received Dishes", response.data.customerDishGet);
    //     this.setState({
    //       dishes: this.state.dishes.concat(response.data.customerDishGet.dishes),
    //     });
    //     console.log("State Dishes", this.state.dishes);
    //   });

    //get all restaurants
    // axios
    //   .get(
    //     "http://" +
    //       process.env.REACT_APP_IP +
    //       ":3001" +
    //       "/customerDishes/getAllRestaurants",
    //     {
    //       params: {},
    //     }
    //   )
    //   .then((response) => {
    //     console.log("Received All restaurants", response.data.allRestaurants);
    //     this.setState({
    //       restaurants: this.state.restaurants.concat(
    //         response.data.allRestaurants
    //       ),
    //     });
    //   });

    this.props.getAllRestaurantsAction();

  }

   // Change page
   paginate = (pageNumber) => {
    console.log("pagenumber ", pageNumber);

    let indexOfLastRestaurant = pageNumber * this.state.restaurantsPerPage;
    let indexOfFirstRestaurant = indexOfLastRestaurant - this.state.restaurantsPerPage;
    let allRestaurants = this.state.restaurants;
    let currentRestaurants = allRestaurants.slice(
      indexOfFirstRestaurant,
      indexOfLastRestaurant
      
    );
    //console.log("all orders, ", allOrders, "current orders", currentOrders, " first index " , indexOfFirstOrder , " last index: ", indexOfLastOrder);

    this.setState({
      currentPage: pageNumber,
      indexOfLastRestaurant: indexOfLastRestaurant,
      indexOfFirstRestaurant: indexOfFirstRestaurant,
      currentRestaurants: currentRestaurants,
    });

  };

  componentWillReceiveProps(nextProps) {
    console.log("in customer dashboard recieve all restaurants", nextProps.restaurants);

    let currentRestaurants = nextProps.restaurants.slice(
      this.state.indexOfFirstRestaurant,
      this.state.indexOfLastRestaurant
    )
    //console.log("current orders", currentOrders, " first index " , this.state.indexOfFirstOrder , " last index: ", this.state.indexOfLastOrder);
    this.setState({
      restaurants: nextProps.restaurants,
      currentRestaurants : currentRestaurants
     })
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let allRestaurants = this.state.currentRestaurants.map((eachRestaurant) => {
      if (this.state.filter !== "" ) {
        if (
          eachRestaurant.method
            .toLowerCase()
            .includes(this.state.filter.toLowerCase())
        ) {
          return (
            <EachRestaurant
              //key={Math.random}
              data={eachRestaurant}
            ></EachRestaurant>
          );
        }
      } else if (this.state.pattern !== "" ) {
        let criteria = this.state.searchCriteria;
        console.log("Each Restaurant", eachRestaurant[criteria]);
        console.log("criteria", criteria);
  
        if (
          JSON.stringify(eachRestaurant[this.state.searchCriteria]).toLowerCase().includes(this.state.pattern.toLowerCase())
        ) {
          return (
            <EachRestaurant
              // key={Math.random}
              data={eachRestaurant}
            ></EachRestaurant>
          );
        }
     } 
      else {
        return (
          <EachRestaurant
             //key={Math.random}
            data={eachRestaurant}
          ></EachRestaurant>
        );
      }
    });

    return (
      <div>
        {redirectVar}
        <br />
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          Find Restaurants , Dishes and Place orders
        </h2>
        <br />
        <div className="row" style={{ textAlign: "center", marginLeft: "5px" }}>
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Delivery"
            onClick={this.ChangeHandler}
          >
            Yelp Delivery
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Pickup"
            onClick={this.ChangeHandler}
          >
            Curbside Pickup
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Dinein"
            onClick={this.ChangeHandler}
          >
            Dine In
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-secondary"
            name="option"
            value=""
            onClick={this.ChangeHandler}
          >
            Clear
          </button>
          &nbsp; &nbsp;
          <form>
            <div className="form-row">
              <div class="form-group " style={{}}>
                <select
                  id="inputState"
                  class="form-control"
                  onChange={this.selectSearchCriteria}
                >
                  <option value="dishes">Dish names</option>
                  <option value="cuisine">Cuisines</option>
                  <option value="location">Location</option>
                  <option value="method">Mode of Delivery</option>
                  <option value="name">Restaurant Name</option>
                </select>
              </div>
              &nbsp;
              <div className="form-group ">
                <input
                  type="text"
                  placeholder="Search Restaurants, Dishes and more"
                  onChange={this.restaurantSearch}
                  classNames="test-class"
                  //value={this.state.pattern}
                />
              </div>
            </div>
          </form>
        </div>

        <hr />
        <div class="row">
          <div class="overflow-auto" style={{}} className="col-8">
            <h2 style={{ textAlign: "center" }}>Restaurants</h2>
            <div
              class="DishInfo"
              style={{ height: "600px" , marginBottom:"100px"}}
            >
              {allRestaurants}
            </div>
            <div style={{marginLeft:"25%"}}>
            <Pagination
            elementsPerPage= {this.state.restaurantsPerPage}
            totalElements={this.state.restaurants.length}
            paginate={this.paginate}
            />
            </div>
          </div>
         
          <div className="col-4">
            <h2 style={{ textAlign: "center" }}>Map</h2>

            <Map
              google={this.props.google}
              zoom={15}
              center={{ lat: 37.331605, lng: -121.882843 }}
              style={{
                width: "80%",
                height: "700px",
                border: "1px solid grey",
                marginTop: "10px",
              }}
            >
              {this.state.markers.map((marker) => (
                <Marker
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                />
              ))}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(CustomerDashboard);


const mapStateToProps = (state) => {
  return {
    restaurants: state.CustomerDishGet.restaurants,
    
  };
};

export default connect(mapStateToProps, {
  getAllRestaurantsAction,
})(WrappedContainer,CustomerDashboard);

