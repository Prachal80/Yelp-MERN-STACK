import { LOGIN } from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";
// const jwt_decode = require('jwt-decode');
import jwt_decode from 'jwt-decode';

export const loginAction = (data) => (dispatch) => {

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    if (data.username !== "" && data.password !== "" && data.userType !== "") {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.username
        )
      ) {
        M.toast({ html: "Invalid email", classes: "#fc2837 red darken-3" });
      } else {
         return axios
          .post("http://" + process.env.REACT_APP_IP + ":3001" + "/login", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response, ", response.data);
            // console.log("token", response.data.token);
            var token_data = response.data.token.split(' ')[1];
            // console.log("token data", token_data)
           
            var decoded = jwt_decode(token_data)
            if (response.data.success && decoded.user === "customer") {

              // var decoded = jwt_decode(response.token.split(' ')[1]);
              // console.log("decoded", decoded)
              console.log("inside if customer", decoded)
              localStorage.setItem("user", "customer");
              localStorage.setItem("CID", decoded.CID);
              localStorage.setItem("Cname", decoded.Cname);
              localStorage.setItem("Cemail", decoded.Cemail);
              localStorage.setItem("token",response.data.token);
              
              //window.location.assign("/customer/dashboard");
              M.toast({
                html: "Signin success",
                classes: "green darken-1",
              });
              //dispatch
              const payload = {
                success:true,
                ErrorMessage:"",
              };
        
              return dispatch({
                type: LOGIN,
                payload: payload, 
              });
            } else if (
              response.data.success &&
              decoded.user === "restaurant"
            ) {

              console.log("Restaurant login action");
              localStorage.setItem("user", "restaurant");
              localStorage.setItem("RID", decoded.RID);
              localStorage.setItem("Rname", decoded.Rname);
              localStorage.setItem("Remail", decoded.Remail);
              localStorage.setItem("token",response.data.token);
              
              //window.location.assign("/restaurant/dashboard");
              M.toast({
                html: "Signin success",
                classes: "green darken-1",
              });
            }

            //dispatch
            return dispatch({
              type: LOGIN,
              payload: response.data.success, 
            });
          })
          .catch((error) => {
            //let ErrorMessage = "Invalid Login Credentials";
            let success = false;
              //dispatch
              M.toast({
                html: "Invalid Login Credentials",
                classes: "red darken-1",
              });
              return dispatch({
                type: LOGIN,
                payload: false, ErrorMessage :"Invalid Login Credentials",
              });
            // this.setState({
            //   authFlag: false,
            //   ErrorMessage: "Invalid Login Credentials",
            // });
          });
      }
    } else {
      // this.setState({
      //   authFlag: false,
      //   ErrorMessage: "Please Provide all the details",
      // });
      M.toast({
        html: "Please Provide all the details",
        classes: "red darken-1",
      });
      //let ErrorMessage = "Please Provide all the details";
      //let success =  false;
      const payload = {
        success:false,
        ErrorMessage:"Please Provide all the details",
      };
      return dispatch({
        type: LOGIN,
        payload: payload 
      });
    }
};
