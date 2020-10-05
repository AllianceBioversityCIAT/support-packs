import { Router } from "express";
// import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";

const router = Router();


// test route
// router.get("/test", AuthController.test);

// Login route
router.post("/login", AuthController.login);
// Change password
router.post("/change-password", [checkJwt], AuthController.changePassword);

// Validate token
router.get("/validate-token", [checkJwt], AuthController.validateToken);


export default router;