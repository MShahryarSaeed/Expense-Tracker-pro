const mongoose=require("mongoose");

const userDashboard=async(req,res)=>{

    const userModel=mongoose.model("users");
    const transactionModel=mongoose.model("transactions");

    // console.log(req.user);
    const user=req.user;

    const getUser=await userModel.findOne({
        _id:user._id,
        // _id:req.user._id
    }).select("-password");

    const transactions=await transactionModel.find({
        user_id:user._id,
    }).sort("-createdAt").limit(5);

    res.status(200).json({
        status:"Success userDashboard",
        data: getUser,
        transactions:transactions
    })
}

module.exports=userDashboard;