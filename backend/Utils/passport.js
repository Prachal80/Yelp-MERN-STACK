"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant");

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    // console.log("inside passport")
    passport.use("customer", new JwtStrategy(opts, (jwt_payload, callback) => {
        // console.log("jwt payload", jwt_payload);
        const CID = jwt_payload.CID;
        Students.findById(CID, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                // console.log('results', results);
                callback(null, results);
            }
            else {
                callback(null, false);
            }
        });
    }))
    passport.use("restaurant", new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt payload", jwt_payload);
        const RID = jwt_payload.RID;
        Restaurant.findById(RID, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                callback(null, results);
            }
            else {
                callback(null, false);
            }
        });
    }))
}

exports.auth = auth;
exports.checkCustomerAuth = passport.authenticate("customer", { session: false });
exports.checkRestaurantAuth = passport.authenticate("restaurant", { session: false });