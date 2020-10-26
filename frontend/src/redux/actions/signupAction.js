import { SIGNUP } from "../constants/action-types";
import axios from "axios";
import M from "materialize-css";

export const signupAction = (data) => (dispatch) => {
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  // //make a post request with the user data
  // axios
  //   .post("http://localhost:5001/signup", data)
  //   .then((response) => {
  //     console.log("Status Code : ", response.status);
  //     console.log("response, ", response.data.success);
  //     if (response.data.success) {
  //       return dispatch({
  //         type: SIGNUP,
  //         payload: response.data.success,
  //       });
  //     }
  //   })
  //   .catch((response) => {
  //     return dispatch({
  //       type: SIGNUP,
  //       payload: response.data.success,
  //     });
  //   });

  if (
    data.email !== "" &&
    data.username !== "" &&
    data.password !== "" &&
    data.userType !== ""
  ) {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    ) {
      M.toast({ html: "Invalid email", classes: "#fc2837 red darken-3" });
    } else {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      return axios
        .post(
          "http://" + process.env.REACT_APP_IP + ":3001" + "/signup",
          data
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          console.log("response, ", response);
          if (response.data.success) {
          // window.location.assign("/login");
          
            M.toast({
              html: "Signup success",
              classes: "green darken-1",
            });

            return dispatch({
                      type: SIGNUP,
                      payload: response.data.success,
                    });
          }
        
        })
        .catch((error) => {
          console.log("response ", error.response.data.message);
          if(error.response.data.message !== ""){
            this.setState({
              ErrorMessage: error.response.data.message,
            });
          }else{
            this.setState({
              ErrorMessage: "Please provide all the details",
            });
          }
          
        });
    }
  } else {
    M.toast({
      html: "Please Provide all the details",
      classes: "red darken-1",
    });
    return dispatch({
            type: SIGNUP,
            payload: false,
          });
  }
};


