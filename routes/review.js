const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");

//REVIEWS
//Post Route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

//DELETE Review Route
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync());

module.exports = router;