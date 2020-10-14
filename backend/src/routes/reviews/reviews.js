var express = require("express");
var app = express();
const router = express.Router();

var executeQuery = require("../../database/mysql");

//Get All reviews customerside
router.get("/getCustomerReviews", (req, res) => {
  let query =
    "select * from reviews where customerid= ? and restaurantid=? order by reviewdate desc";
  let args = [req.query.CID, req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) {
      console.log("-------Restaurant Reviews not found-------");
      res.status(404).send({ success: false, customerReviews: null });
    } else {
      res.status(200).send({ success: true, customerReviews: result });
    }
  });
});

//Get All reviews restaurantside
router.get("/getRestaurantReviews", (req, res) => {
  console.log("req data ", req.query);
  let query =
    "select * from reviews where restaurantid= ? order by reviewdate desc";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Customer Reviews not found-------");
    else {
      console.log(
        "result----------------++++++++++++++++++++++++++++++ ",
        result
      );
      res.send({ success: true, restaurantReviews: result });
    }
  });
});

//Post reviews from customer
router.post(
  "/addReviewCustomer",

  function (req, res) {
    console.log("Inside review Customer side");

    console.log("CID", req.body.CID);
    console.log("RID", req.body.RID);
    console.log("%%%%%%%", req.body);

    let query =
      "insert into reviews (customerid, restaurantid, customername, restaurantname, review, rating, reviewdate) values (?,?,?,?,?,?,?)";

    let args = [
      req.body.CID,
      req.body.RID,
      req.body.customername,
      req.body.restaurantname,
      req.body.review,
      req.body.rating,
      req.body.reviewdate,
    ];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        res.send({ success: true, CustomerAddReview: result });
      }
    });
  }
);

module.exports = router;
