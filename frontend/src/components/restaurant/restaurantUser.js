import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachUser from "../individual/individualUser";
import { connect } from "react-redux";
//import { makeOrderRestaurantAction , getOrdersCustomerAction , cancelOrdersCustomerAction } from "../../redux/actions/orderAction";

class RestaurantUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   dishname: "",
    //   price: "",
    //   category: "",
    //   restaurantname: "",
    //   status: "",
    //   orderpic: "",
    //   orderid: "",
    //   time: "",
      option: "",
      filter: "",
      pattern: "",
      searchCriteria: "name",
      users: [],
    };
  }


  userSearch = (e) => {
    this.setState({
      pattern: e.target.value,
    });
    console.log(this.state.pattern)
  };

  selectSearchCriteria = (e) => {
    this.setState({
      searchCriteria: e.target.value,
      filter: "",
    });
    console.log(this.state.searchCriteria)
  };

  ChangeHandler = (e) => {
    this.setState({
      pattern: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    let params = {
    Cemail: localStorage.getItem("Cemail"),

}
    //get all the customers 
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios.get(

        "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/restaurantProfile/getAllUsers",
        {   
            params: params
        }
    )
    .then((response =>{
        console.log("ALL users", response.data.users);
        this.setState({
        users: response.data.users,
        });
            
       })
       )
     
  }

//   componentWillReceiveProps(nextProps) {
//     console.log("in customer recieve all orders", nextProps.users);
//     this.setState({
//       orders: nextProps.orders
//     });
//   }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let userFunction = this.state.users.map((user) => {
         if (this.state.pattern !== "") {
          let criteria = this.state.searchCriteria;
          console.log("Each User", user[criteria]);
          console.log("criteria", criteria);
    
          if (
            JSON.stringify(user[this.state.searchCriteria]).toLowerCase().includes(this.state.pattern.toLowerCase())
          ) {
             return (
              <EachUser
                 //key={Math.random}
                data={user}
              ></EachUser>
            );
          }
       } 


       else {
        return <EachUser data={user}></EachUser>;
      }
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            Users
          </h2>
          <br />
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            
            &nbsp;
            <button
              style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
              className="btn btn-secondary"
              value=""
              onClick={this.ChangeHandler}
            >
              Clear
            </button>
            &nbsp;
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            &nbsp;
            <form>
            <div className="form-row">
              <div class="form-group " style={{}}>
                <select
                  id="inputState"
                  class="form-control"
                  onChange={this.selectSearchCriteria}
                >
                  <option value="name">Name</option>
                  <option value="nickname">Nickname</option>                 
                  <option value="city">Location</option>
                </select>
              </div>
              &nbsp;
              <div className="form-group ">
                <input
                  type="text"
                  placeholder="Search Users"
                  onChange={this.userSearch}
                  classNames="test-class"
                />
              </div>
            </div>
          </form>
          </div>
          <br />
          <hr />
        </div>

        <div class="row">
          <div style={{ width: "100%" }} class="col-6">
            <h2 style={{ textAlign: "center" }}>All Users</h2>
            <div style={{ overflowY: "scroll", height: "700px" }}>
              {userFunction}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// const mapStateToProps = (state) => {
//   return {
//     isMakeOrder: state.CustomerOrders.isMakeOrder,
//     isOrderCancelled: state.CustomerOrders.isOrderCancelled,
//     orders: state.CustomerOrders.orders
//   };
// };

// export default connect(mapStateToProps, {
//   makeOrderRestaurantAction , getOrdersCustomerAction , cancelOrdersCustomerAction
// })(customerUserView);

export default RestaurantUser;