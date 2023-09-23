var express = require("express");
var router = express.Router();
var ProjectController = require("../controller/Project.Controller");
var AuthenticationMiddleware = require("../middleware/Authentication.middleware");

router.post("/create",AuthenticationMiddleware.autheticate,ProjectController.create
    //todo
);

// fetch all project

router.get("/getAllProjects",AuthenticationMiddleware.autheticate,ProjectController.getAllProject);

// id : wise Project details

router.get("/getProjectById/:projectId",AuthenticationMiddleware.autheticate ,ProjectController.getProjectById);

// get prject by user id
router.get("/getProjectByUser",AuthenticationMiddleware.autheticate,ProjectController.getProjectByUser);

router.post("/assignProjectToUser",AuthenticationMiddleware.autheticate,ProjectController.assignProjectToUser);

router.delete("/deleteProjectById/:projectId",AuthenticationMiddleware.autheticate,ProjectController.deleteProjectById);

router.put("/updateProjectById/:projectId",AuthenticationMiddleware.autheticate,ProjectController.updateProjectById);

module.exports = router;