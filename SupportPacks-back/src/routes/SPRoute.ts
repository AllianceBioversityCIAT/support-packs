import { Router } from "express";
// import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import SPController from "../controllers/SPController";

const router = Router();

// guidelines
router.get("/guidelines/:app_id", SPController.getGuidelines);

// categories
router.get("/categories/:app_id", SPController.getCategories);

// regions
router.get("/regions", SPController.getRegions);

// roles
router.get("/roles/:app_id", SPController.getRoles);

// stages
router.get("/stages/:app_id", SPController.getStages);



// set downloads
router.post('/download', SPController.downloadManager);




// person

//  get
router.post("/person/info", SPController.getPersonInfo);
// create
router.post("/person/create", [checkJwt], SPController.createPerson);



// guidelines by : role, stage and category
router.post("/guidelines/byRSC", SPController.getGuidelinesByRoleStageCategory);
router.get("/guidelines-all/:userId?", SPController.getAllGuidelines);

// importance level
router.post("/importance-level", SPController.getImportanceLevel);

export default router;