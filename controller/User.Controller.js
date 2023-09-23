var UserModel = require("../models/User.model");
var TaskModel = require("../models/Task.model");

const UserController = {
    myTask : async (req,res)=>{
        let checkIfUserExists = await UserModel.findOne({_id : req.user.id , isDeleted : false});
        console.log("my task : ",checkIfUserExists);
        if(!checkIfUserExists){
            return res.status(400).send("User does not exists");
        }
        let tasks = checkIfUserExists.tasks;
        return res.status(200).json({
            status : "success",
            tasks : tasks,
        });
    }
}

module.exports = UserController;
