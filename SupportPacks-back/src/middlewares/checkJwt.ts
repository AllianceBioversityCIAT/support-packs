import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.jwtSecret || 'd3f4ultS3cr3t');
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log(error)
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json({error});
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, process.env.jwtSecret || 'd3f4ultS3cr3t', {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};