const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {

  const userModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is Required !";

  const getUser = await userModel.findOne({
    email: email
  });

  if (!getUser) throw "This Email doest not exist in the System";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await userModel.updateOne(
    {
      email: email
    },
    {
      rest_code: resetCode
    }, {
    runValidators: true
  });




  await emailManager(email, "Your Passsword reset Code is " + resetCode, "Your Passsword reset Code is " + resetCode, "Reset Your Password-Expense Tracker PRO! ")




  res.status(200).json({
    status: "Reset Code sent to email Successfully",
  })
}

module.exports = forgotPassword;