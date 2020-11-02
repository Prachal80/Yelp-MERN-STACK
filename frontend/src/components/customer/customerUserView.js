import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class CustomerUserView extends Component {
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
      followers: [],
      following: [],
      isFollowing: false,
      buttonVar:"",
    };

    this.followUser = this.followUser.bind(this);
  }


followUser = (e) => {

    e.preventDefault();

    axios.defaults.withCredentials = true;
    let params = {
    CID: localStorage.getItem("CID"),
    Follow_CID: this.props.location.state.id,

}   
    console.log("Params", params);
    
    if(!this.state.isFollowing){
        axios.post(

            "http://" +
                process.env.REACT_APP_IP +
                ":3001" +
                "/customerProfile/follow",
            params,
        )
        .then((response =>{
            console.log("ALL users", response.data);
            this.setState({
            followers: response.data.followers,
            isFollowing:true,
            buttonVar: "Unfollow"
            });
                
           })
           )
    }
    else{
        axios.post(

            "http://" +
                process.env.REACT_APP_IP +
                ":3001" +
                "/customerProfile/unfollow",
            params,
        )
        .then((response =>{
            console.log("ALL users", response.data);
            this.setState({
            followers: response.data.followers,
            isFollowing:false,
            buttonVar: "Follow"
            });
                
           })
           )
    }

    // this.setState({
    //   filter: e.target.value,
    // });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //make a get request for the user data
    let data = {
      CID: this.props.location.state.id,
    };
    console.log("########### Getting customer deatails", data);
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
      //if(persons.some(person => person.name === "Peter"))
      if(this.state.followers.some(match => match.follower_id === localStorage.getItem("CID"))){
          //localStorage.getItem("CID"))
        this.setState({
           // followers: response.data.followers,
            isFollowing:true,
            buttonVar: "Unfollow"
            });
    }
    else if(!this.state.followers.some(match => match.follower_id === localStorage.getItem("CID"))){
        this.setState({
            //followers: response.data.followers,
            isFollowing:false,
            buttonVar: "Follow"
            });
        
    }
    });
  }

  render() {
    let redirectVar = null;
    //let buttonVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }
   
    
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
              <button style= {{fontWeight:"bold", background: "#0952ed", color:"white"}} className="btn btn-primary" onClick={this.followUser}>{this.state.buttonVar} </button>
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
          <br />
          <br />

          <div class="wrapper fadeInDown">
            <div
              style={{
                position: "absolute",
                width: "30%",
                top: "55%",
                left: "2%",
              }}
            >
              <br />
              <br />

              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerUserView;
