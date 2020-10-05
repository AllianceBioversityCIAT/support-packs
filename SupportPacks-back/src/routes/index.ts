import { Router, Request, Response } from "express";
import auth from "./AuthRoute";
import sp from "./SPRoute";

const routes = Router();

routes.use("/auth", auth);
routes.use("/sp", sp);

export default routes;