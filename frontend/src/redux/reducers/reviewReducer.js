import {GET_CUSTOMER_REVIEW, GET_RESTAURANT_REVIEW,POST_CUSTOMER_REVIEW } from "../constants/action-types";

const initialState = {
    reviews : [],
    newReview: null,
    getAllReviews: null
  };

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case POST_CUSTOMER_REVIEW:
            console.log("inside Customer POST review reducer", action.payload);
            let reviewsArr = state.reviews;
            reviewsArr.push(action.payload.review);
            console.log("New Review array", reviewsArr)
            return Object.assign({}, state, {
                reviews: reviewsArr,
                newReview : action.payload.success
         });
         case GET_CUSTOMER_REVIEW:
            console.log("inside Customer GET all reviews reducer", action.payload);
            return Object.assign({}, state, {
                reviews: action.payload,
                getAllReviews : true
         }); 

         case GET_RESTAURANT_REVIEW:
            console.log("inside Restaurant GET all reviews reducer", action.payload);
            return Object.assign({}, state, {
                reviews: action.payload,
                getAllReviews : true
         }); 
         default:
            return state;
        }
    }