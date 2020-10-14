var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function () {
  //Customer Login
  it("should login customer", function (done) {
    server
      .post("/login")
      .send({
        username: "prachaljpatel@gmail.com",
        password: "12345",
        userType: "customer",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Restaurant sign up
  it("Should sign up Restaurant", function (done) {
    server
      .post("/signup")
      .send({
        name: "Chipotle",
        email: "chipotle@gmail.com",
        password: "chipotle",
        location: "Santa Clara",
        userType: "restaurant",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Get Single Event
  it("Should get single event", function (done) {
    server
      .get("/customerEvents/getSingleEvent")
      .query({ eventid: "3" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Get review
  it("Should get review ", function (done) {
    server
      .get("/reviews/getCustomerReviews")
      .query({ CID: "43", RID: "11" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Change order status
  it("Should change order status", function (done) {
    server
      .post("/restaurantOrders/changeOrderStatusRestaurant")
      .send({
        orderid: "16",
        status: "Delivered",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});
