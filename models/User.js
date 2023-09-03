const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    EmployeeName:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:false,
    },
    userName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,  //hashed string
        required:true,
    },
    salary:{
        type:Number,
        required:false,
    },
    tasks:{
        // link to table : in form of array -> unique for the task model
        type:[mongoose.Schema.Types.ObjectId],
        // collection : reference
        ref:"Task",
        required:false,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    isCreatedAt:{
        type:Date,
        default:new Date(),
    },
    isDisabled:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    address:{
        type:String,
        required:true,
    },
    aadharNumber:{
        type:String,
        // here we store a image by using bucket or using multer(store the file at folder and make a id of name of using) 
        required:true,
    },
    panCard:{
        type:String,
        // here we store a image by using bucket or using multer(store the file at folder and make a id of name of using) 
        required:true,
    },
    photo:{
        type:String,
        // here we store a image by using bucket or using multer(store the file at folder and make a id of name of using) 
        required:true,
    },
    projects:{
        type:Array
    }

});

module.exports = mongoose.model("User", UserSchema);

// module.exports = {
//     User,
// };