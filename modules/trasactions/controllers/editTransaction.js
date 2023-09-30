const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {

    const transactionModel = mongoose.model("transactions");
    const userModel=mongoose.model("users");
    const { transaction_id, remarks, amount, transaction_type } = req.body;

    if (!transaction_id) throw "Transaction Id is Required";

    if (!validator.isMongoId(transaction_id.toString())) throw "Please Provide a valid Id!";

    const getTransaction = await transactionModel.findOne({
        _id: transaction_id,
    });

    if (!getTransaction) throw "Transaction not Found";


    await transactionModel.updateOne(
        {
            _id: transaction_id,
        },
        {
            remarks: remarks,
            // amount: amount,
            // transaction_type:transaction_type,
        },
        {
            runValidators: true
        }
    )

    res.status(200).json({
        status: "Edit transaction",
    })

}

module.exports = editTransaction;