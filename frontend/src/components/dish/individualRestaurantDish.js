import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default class individualDish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
      address: "",
      state: "",
      country: "",
      timings: "",
      email: "",
      contact: "",
      ratings: "",
      id: "",
      dishname: this.props.data.dishname,
      description: this.props.data.description,
      category: this.props.data.category,
      ingredients: this.props.data.ingredients,
      price: this.props.data.price,
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  submitUpdate = (e) => {
    e.preventDefault();
    var formData = new FormData();

    console.log(
      "form data ",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );

    formData.append("dishname", this.state.dishname);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("ingredients", this.state.ingredients);
    formData.append(
      "restaurantDishImage",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );
    formData.append("price", this.state.price);
    formData.append("RID", localStorage.getItem("RID"));
    formData.append("Rname", localStorage.getItem("Rname"));
    formData.append("id", this.props.data.id);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post(
        "http://" +
          process.env.REACT_APP_IP +
          ":3001" +
          "/restaurantDishes/updateRestaurantDishes",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/restaurant/dashboard");
        }
      })
      .catch((response) => {
        this.setState({
          ErrorMessage: "Something went wrong while adding dish",
        });
      });
  };

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Function to make the Dish form visible
  showAddDishForm() {
    return (
      <form
        class="DishFrom"
        name="DishForm"
        onSubmit={this.submitUpdate}
        style={{
          position: "absolute",
          background: "#ffe6e6",
          marginLeft: "0%",
          zIndex: "100",
          left: "20%",
          top: "60%",
          borderRadius: "2%",
        }}
      >
        <Container>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "2px",
            }}
          >
            Edit Dish
          </p>
          <Row>
            <Col xs={5}>
              <input
                type="text"
                name="dishname"
                value={this.state.dishname}
                contentEditable
                placeholder="Dish Name"
                class="form-control"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={5}>
              <select
                name="category"
                class="form-control"
                contentEditable
                value={this.state.category}
                onChange={this.ChangeHandler}
                isSearchable
              >
                <option value="select" selected disabled>
                  Category
                </option>
                <option value="Appetizer">Appetizer </option>
                <option value="Salads">Salads</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={10}>
              <input
                type="text"
                name="description"
                value={this.state.description}
                placeholder="Description"
                class="form-control"
                onChange={this.ChangeHandler}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={4}>
              <input
                type="text"
                name="ingredients"
                value={this.state.ingredients}
                class="form-control"
                placeholder="Ingredients"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={3}>
              <input
                type="text"
                name="price"
                value={this.state.price}
                class="form-control"
                placeholder="Price"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={1}>
              <input type="file" name="restaurantDishImage" />
            </Col>
          </Row>
        </Container>
        <br />
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
          Submit
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button
          onClick={() => this.setState({ showForm: false })}
          type="submit"
          class="btn btn-primary"
          style={{
            background: "#D32323",
            color: "#ffffff",
            fontWeight: "bold",
            borderBlockColor: "white",
            border: "1px #D32323",
            MarginLeft: "10px",
          }}
        >
          Close
        </button>
      </form>
    );
  }

  render() {
    return (
      <div
        style={{
          //   marginLeft: "5%",
          marginLeft: "5%",
          //   border: "1px solid black",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
        }}
      >
        <Card border="secondary" style={{ width: "32rem" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.dishname}
            </h3>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col>
                    <img
                      src={
                        "http://" +
                        process.env.REACT_APP_IP +
                        ":3001/" +
                        this.props.data.image
                      }
                      style={{
                        width: "200px",
                        height: "150px",
                      }}
                    />
                  </Col>
                  <Col>
                    <p style={{ marginBottom: "0px" }}>
                      Price : {this.props.data.price}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Ingredients : {this.props.data.ingredients}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Category : {this.props.data.category}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Description : {this.props.data.description}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Restaurant : {this.props.data.restaurantname}
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={() => this.setState({ showForm: true })}
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        border: "1px #D32323",
                      }}
                    >
                      Edit Dish
                    </button>
                    {this.state.showForm ? this.showAddDishForm() : null}
                    &nbsp;
                  </Col>
                </Row>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
