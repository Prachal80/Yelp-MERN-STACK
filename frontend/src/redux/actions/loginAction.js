import { LOGIN } from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";


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
            if (response.data.success && data.userType === "customer") {
              localStorage.setItem("user", "customer");
              localStorage.setItem("CID", response.data.res._id);
              localStorage.setItem("Cname", response.data.res.name);
              localStorage.setItem("Cemail", response.data.res.email);
              
              //window.location.assign("/customer/dashboard");
              M.toast({
                html: "Signup success",
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
              data.userType === "restaurant"
            ) {
              localStorage.setItem("user", "restaurant");
              localStorage.setItem("RID", response.data.res._id);
              localStorage.setItem("Rname", response.data.res.name);
              localStorage.setItem("Remail", response.data.res.email);
              //window.location.assign("/restaurant/dashboard");
              M.toast({
                html: "Signup success",
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
