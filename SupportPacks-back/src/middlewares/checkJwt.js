"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
exports.checkJwt = function (req, res, next) {
    //Get the jwt token from the head
    var token = req.headers["authorization"];
    var jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, process.env.jwtSecret || 'd3f4ultS3cr3t');
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        console.log(error);
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).json({ error: error });
        return;
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    var userId = jwtPayload.userId, username = jwtPayload.username;
    var newToken = jwt.sign({ userId: userId, username: username }, process.env.jwtSecret || 'd3f4ultS3cr3t', {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
