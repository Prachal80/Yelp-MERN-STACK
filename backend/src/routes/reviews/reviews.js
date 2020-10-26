var express = require("express");
var app = express();
const router = express.Router();
const Review = require("../../../models/reviews");


//Get All reviews customerside
router.get("/getCustomerReviews", (req, res) => {

  Review.find({restaurantid:req.query.RID, customerid: req.query.CID})
  .then(reviews=>{
    if(reviews){
      console.log("reviews in customerside", reviews);
      res.status(200).send({success: true, customerReviews : reviews});
    }
    else{
      console.log("order make error", orders);
      res.status(400).send({success: false, customerReviews : null});
    }
})
});

//Get All reviews restaurantside
router.get("/getRestaurantReviews", (req, res) => {
  console.log("req data ", req.query);

  Review.find({restaurantid:req.query.RID})
  .then(reviews=>{
    if(reviews){
      console.log("reviews in customerside", reviews);
      res.status(200).send({success: true, restaurantReviews : reviews});
    }
    else{
      console.log("order make error", orders);
      res.status(400).send({success: false, restaurantReviews : null});
    }
})
});

//Post reviews from customer
router.post(
  "/addReviewCustomer",

  function (req, res) {
    console.log("Inside review Customer side");
    console.log("CID", req.body.CID);
    console.log("RID", req.body.RID);
    console.log("%%%%%%%", req.body);
    var newReview = new Review({
    rating: req.body.rating,
    review: req.body.review,
    reviewdate: req.body.reviewdate,
    customerid: req.body.CID,
    customername: req.body.customername,
    restaurantid: req.body.RID,
    restaurantname: req.body.restaurantname,
    })

    newReview.save((err)=>{
        if (err) {
            res.status(400).send({ success: false});
          } else {
            res.status(200).send({ success: true});
          }
    });
  }
);

module.exports = router;
