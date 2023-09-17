var express = require('express');
var router = express.Router();
const TaskController = require("../controller/Task.Controller");
const AuthenticationMiddleware = require("../middleware/Authentication.middleware");

router.post("/create",AuthenticationMiddleware.autheticate , TaskController.create);

router.get("/getTaskById/:taskId",AuthenticationMiddleware.autheticate,TaskController.getTaskById);

router.get("/getTasksByProject/:projectId",AuthenticationMiddleware.autheticate, TaskController.getTaskByProjectId);

router.put("/updateTaskById/:taskId",AuthenticationMiddleware.autheticate,TaskController.updateTaskById);

router.delete("/deleteTaskById/:taskId",AuthenticationMiddleware.autheticate,TaskController.deleteTaskById);

module.exports = router;