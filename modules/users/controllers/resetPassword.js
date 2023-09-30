const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
    const userModel = mongoose.model("users");

    const { email, reset_code, new_password } = req.body;

    // Validations
    if (!email) throw "Email is Required";
    if (!reset_code) throw "Reset Code is Required";
    if (!new_password) throw "New Password is Required";
    if (new_password.length < 8) throw "New Password must be 8 characters long!";

    const getUserWithResetCode = await userModel.findOne({
        email: email,
        rest_code: reset_code,
    });

    if (!getUserWithResetCode) throw "Reset Code does not Match!";

    const hashPassword = await bcrypt.hash(new_password, 12);

    await userModel.updateOne(
        {
            email: email
        },
        {
            $set: {
                password: hashPassword,
                rest_code:""
            }
        },
        {
            runValidators: true
        }
    );

    await emailManager(email,"your Password is reseted Successfully,if you don't done that please contact Us","your Password is reseted Successfully,if you don't done that please contact Us","Password Reset Successfully");

    res.status(200).json({
        status: "Success",
        message: "Password reset successfully",
    });
}

module.exports = resetPassword;
