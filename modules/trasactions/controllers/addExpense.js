const mongoose=require("mongoose");
const validator=require("validator");

const addExpense=async(req,res)=>{

    const userModel=mongoose.model("users");
    const transactionsModel=mongoose.model("transactions");

    const{amount,remarks}=req.body;

    if(!amount) throw "Amount is Required";
    if(!remarks) throw "Remakrs is required";

    if(remarks.length<5) throw "Remarks must be five chracter long!";

   
    // console.log(validator.isNumeric(amount.toString()));

    if(!validator.isNumeric(amount.toString())) throw "Amount must be a valid Number .";

    if(amount<0) throw "Amount must not be negative";


    //transaction model ma aik new document create huwa hai new transaction ka uss user ka jo authorization k baad transaction routes takk agya tha
    await transactionsModel.create({
        user_id:req.user._id,
        amount:amount,
        remarks:remarks,
        transaction_type:"expense",

    })

   //Oss hi user ka jis ny transaction ki hai oss ka user model ma existing balance with new transaction amount balance update ker diya hai
    await userModel.updateOne({
        _id:req.user._id,

    },{
        $inc:{
            balance:amount*-1,
        }
    },{
        runValidators:true
    })


    res.status(200).json({
        status:"Success",
        message:"Expanse added Successfull"
    })

}

module.exports=addExpense;