import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachUser from "../individual/individualUser";
import { connect } from "react-redux";
//import { makeOrderRestaurantAction , getOrdersCustomerAction , cancelOrdersCustomerAction } from "../../redux/actions/orderAction";

class customerUserView extends Component {
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
    //   optiontype: "",
      users: [],
      filter: "",
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    let params = {
    Cemail: localStorage.getItem("Cemail"),

}
    //get all the customers 
    axios.get(

        "http://" +
            process.env.REACT_APP_IP +
            ":3001" +
            "/customerProfile/getAllUsers",
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
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let userFunction = this.state.users.map((user) => {
      if (this.state.filter !== "") {
        // if (user. === this.state.filter) {
        //   return <EachOrderCustomer data={order}></EachOrderCustomer>;
        // }
      } else {
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
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f0ab0c",
                border: "1px solid #f0ab0c",
              }}
              className="btn btn-danger"
              value="Order Received"
              onClick={this.ChangeHandler}
            >
              Order Received
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f07a0c",
                border: "1px solid #f07a0c",
              }}
              className="btn btn-danger"
              value="Preparing"
              onClick={this.ChangeHandler}
            >
              Preparing
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="On the way"
              onClick={this.ChangeHandler}
            >
              On the way
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="Ready for Pickup"
              onClick={this.ChangeHandler}
            >
              Ready for Pickup
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#11ad17",
                border: "1px solid #11ad17",
              }}
              className="btn btn-primary"
              value="Picked up"
              onClick={this.ChangeHandler}
            >
              Picked up
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#11ad17",
                border: "1px solid #11ad17",
              }}
              className="btn btn-primary"
              value="Delivered"
              onClick={this.ChangeHandler}
            >
              Delivered
            </button>
            &nbsp;
            <button
              style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
              className="btn btn-secondary"
              value=""
              onClick={this.ChangeHandler}
            >
              Clear
            </button>
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

export default customerUserView;