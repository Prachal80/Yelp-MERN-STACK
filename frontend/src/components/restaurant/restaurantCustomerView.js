import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import {getMessages, postRestaurantMessage} from "../../redux/actions/messageAction";

class restaurantCustomerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerid: "",
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      nickname: "",
      headline: "",
      phone: "",
      emailid: "",
      blog: "",
      yelpingSince: "",
      thingsIlove: "",
      findMeIn: "",
      imagePath: "",
      ErrorMessage: "",
      messages:[],
      message: "",
      followers:[],
      following:[]
    };
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    console.log("Inside message change handler", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //make a get request for the user data
    let data = {
      CID: this.props.location.state._id,
    };
    console.log("########### Getting customer deatails", data);
    axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    axios({
      url:
        "http://" +
        process.env.REACT_APP_IP +
        ":3001" +
        "/customerProfile/getCustomerProfile",
      method: "GET",
      params: data,
    }).then((response) => {
       console.log("profile details", response.data.profileData);

      let customerData = response.data.profileData;
      this.setState({
        name: customerData.name,
        dob: customerData.birthdate,
        city: customerData.city,
        state: customerData.state,
        country: customerData.country,
        nickname: customerData.nickname,
        headline: customerData.headline,
        phone: customerData.phone,
        emailid: customerData.email,
        blog: customerData.blog,
        yelpingSince: customerData.yelpingSince,
        thingsIlove: customerData.thingsIlove,
        findMeIn: customerData.findMeIn,
        imagePath: customerData.profilePic,
        followers: customerData.followers,
      following: customerData.following,
      });
      console.log("Profile ", this.state.imagePath);
    });


  //get all messages
  let messageData = {
    CID: this.props.location.state._id, 
    RID: localStorage.getItem("RID")
  }
  console.log("Message get action", messageData);
  this.props.getMessages(messageData);
   
  
}

componentWillReceiveProps(nextProps){
  console.log("in restaurant recieve props", nextProps);
  this.setState({
    messages: nextProps.messages,
  
});
}


  //Send Message Restaurant
  sendMessage = async (e) =>{
    
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = { 
      RID: localStorage.getItem("RID"),
      CID: this.props.location.state._id,
      name:  localStorage.getItem("Rname"),
      message: this.state.message,
    }
    this.props.postRestaurantMessage(data);
    
    
  } 

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }


  let messageFuction =this.state.messages.map((message)=>{
    return <h5 style={{marginBottom: "20px"}} ><span style={{
      background: "#429ef5",
      borderRadius:"5px",
      color: "#ffffff",
      borderBlockColor: "white",
      border: "1px solid #ffffff",
      padding: "5px",
  
    }}>{message}</span></h5>
  }) 

    return (
      <div>
        {redirectVar}
        <div>
          <div class="row" style={{ backgroundColor: "" }}>
            <img
              src={
                "http://" +
                process.env.REACT_APP_IP +
                ":3001/" +
                this.state.imagePath
              }
              alt="Profile Pic"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                margin: "2% 0 2% 3%",
              }}
            ></img>
            
            <div
            className="col-4"
              class="topHeadline"
              style={{
                position: "absolute",
                left: "20%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                textAlign: "justified-center",
                
              }}
            >  
            <p>DOB: {this.state.dob}</p>
            <p>Name: {this.state.name}</p>
            <p>Email: {this.state.emailid}</p>
            <p>Phone: {this.state.phone}</p>
              
            </div>
            <div className="col-4"
              class="topHeadline"
              style={{
                position: "absolute",
                left: "45%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                textAlign: "justified-center"}}>
                <p>
                {this.state.city}, {this.state.state}, {this.state.country}
              </p>
              <p>{this.state.headline}</p>
              <p>Followers: {this.state.followers.length} </p>
              <p>Following: {this.state.following.length} </p> 
            </div>
            <div
              className="col-4"
              style={{
                position: "absolute",
                width: "20%",
                height: "20%",
                right: "15%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
                textAlign: "justify",
              }}
            >
              <p>Yelping Since:{this.state.yelpingSince}</p>
              <p>Things I Love: {this.state.thingsIlove}</p>
              <p>Find me In: {this.state.findMeIn}</p>
              <p>My blog: {this.state.blog}</p>
            </div>
          </div>
          <hr />


          <div >
            <div
              style={{
                position: "absolute",
                width: "40%",
                top: "52%",
                left: "25%",
                border: "1px solid black",
                overflowY: "scroll",
                height: "410px",
              }}
              //class="overflow-auto"
            >
              <br />
              <form
                 // class="Review"
                  name="message"
                  onSubmit={this.sendMessage}
                  style={{
                    marginLeft: "0%",
                    zIndex: "100",
                    right: "10%",
                    top: "60%",
                    width: "100%",
                  }}
                >
                  <Container>
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "2px",
                        width: "100%",
                      }}
                    >
                      Message History with {this.state.name}
                    </p>
                    <hr />
                    <Col>
                    <div 
                      style={{
                        //marginLeft: "5%",
                        overflowY: "scroll",
                        height: "250px",
                      }}
                      class="overflow-auto">{messageFuction}</div>
                      <Row xs={15}>
                        <input
                          height="100px"
                          type="text"
                          name="message"
                          placeholder="Type text"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />

                      <button
                        type="submit"
                        class="btn btn-primary"
                        style={{
                          type: "button",
                          background: "#D32323",
                          color: "#ffffff",
                          fontWeight: "bold",
                          borderBlockColor: "white",
                          border: "1px #D32323",
                        }}
                      >
                        send
                      </button>
                      </Row>
                    
                    </Col>
                  </Container>
                </form>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    messages:state.Message.messages,
  };
};

export default connect(mapStateToProps, {
  getMessages, postRestaurantMessage
})(restaurantCustomerView);

// export default restaurantCustomerView;
