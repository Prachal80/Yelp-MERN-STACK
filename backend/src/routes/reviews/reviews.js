var express = require("express");
var app = express();
const router = express.Router();
const Review = require("../../../models/reviews");
const { checkCustomerAuth, auth } = require("../../../Utils/passport");
const { checkRestaurantAuth } = require("../../../Utils/passport");
auth();

//Get All reviews customerside
router.get("/getCustomerReviews",checkCustomerAuth, (req, res) => {

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
router.get("/getRestaurantReviews",checkRestaurantAuth, (req, res) => {
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
  "/addReviewCustomer",checkCustomerAuth,

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

    newReview.save()
    .then(review=>{
      if (review) 
      {
        console.log("Review saved in DB: ", review);
        res.status(200).send({ success: true, review: review });
      }      
       else {
            console.log("Order not saved");
            res.status(400).send({ success: false , review:null});
          }
    });
   
  }
);

module.exports = router;
