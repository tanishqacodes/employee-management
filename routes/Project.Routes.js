var express = require("express");
var router = express.Router();
var ProjectController = require("../controller/Project.Controller");
var AuthenticationMiddleware = require("../middleware/Authentication.middleware");

router.post("/create",AuthenticationMiddleware.autheticate,ProjectController.create
    //todo
);

// fetch all project

router.get("/getAllProjects",AuthenticationMiddleware.autheticate,ProjectController.getALlProject);

// id : wise Project details

router.get("/getProjectById/:projectId",AuthenticationMiddleware.autheticate ,ProjectController.getProjectById);

// get prject by user id
router.get("/getProjectByUserId/:userId",AuthenticationMiddleware.autheticate,ProjectController.getProjectByUserId);

router.post("/assignProjectToUser",AuthenticationMiddleware.autheticate,ProjectController.assignProjectToUser);



module.exports = router;