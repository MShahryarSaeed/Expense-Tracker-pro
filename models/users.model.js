const mongoose=require('mongoose');

const usersSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Please Provide Full name"]
    },
    email:{
        type:String,
        required:[true,"Email must be Provided"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    balance:{
        type:Number,
        required:[true,"Balance is Required"],
        default:0
    },
     rest_code:{
        type:Number,
    },
    
},
{

        timestamps:true
    
})

const userModel=mongoose.model("users",usersSchema);

module.exports=userModel;