const mongoose=require('mongoose');
const bycrypt=require("bcrypt");
const jwtManager = require('../../../managers/jwtManager');

const login=async (req,res)=>{

    const userModel=mongoose.model("users");

    const{email,password}=req.body;

    const getUser=await userModel.findOne({
        email:email
    });
   
    //if Enter email doesnot exist
    if(!getUser) throw "This Email doesnot exist";

    const comparePassword=await bycrypt.compare(password,getUser.password);

    if(!comparePassword) throw  "Email and Password do not match";
     

    //It will create a accessToken when email and password match or find in existing database
    const accessToken=jwtManager(getUser); //This parameter getUser is accept in jwtManager.js file as user

    console.log(getUser);

    //Success Response
    res.status(200).json({
        status:"Success",
        message:"User LoggedIn Successfully",
        accessToken:accessToken
    })

}

module.exports=login;