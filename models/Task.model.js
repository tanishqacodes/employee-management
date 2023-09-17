var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:"pending",
        // enum to protect the status of the project if database is compromize. => user define data type
        // so, value can be only those defined in enum
        enum:["pending","completed","inProgress","inTesting","isDisabled"]
    },
    assignedTo:{
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
    },
    taskDescription:{
        type:String,
        required:true,
    },
    taskDeadline:{
        type:Date,
        default:new Date(),
    },
    taskPriority:{
        type:String,
        default:"low",
        enum:["low","medium","high"],
    },

});

module.exports = mongoose.model('Task',TaskSchema);