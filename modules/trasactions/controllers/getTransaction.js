const mongoose=require("mongoose");

const getTransaction=async(req,res)=>{

    const transactionModel=mongoose.model("transactions");

    // console.log(req.query);

    const transactions=await transactionModel.find({
        user_id:req.user._id,
        ...req.query,
    })

    

    res.status(200).json({
        status:"Success",
        data:transactions
    })

    

}

module.exports=getTransaction;