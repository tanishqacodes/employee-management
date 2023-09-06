var mongoose = require("mongoose");

var ProjectSchema = mongoose.Schema({
    projectName : {
        type:String,
        required:true,
    },
    projectDescription : {
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default : new Date(),
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    tasks:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Task",
    },
    projectMembers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
    },
    updatedAt:{
        type:Date,
        default:new Date(),
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports = mongoose.model('Project',ProjectSchema);
 