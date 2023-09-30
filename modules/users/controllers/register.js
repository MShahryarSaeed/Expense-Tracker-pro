const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../managers/jwtManager');
const emailManager = require('../../../managers/emailManager');

const register = async (req, res) => {

    const userModel = mongoose.model('users');

    const { name, email, password, confirm_password, balance } = req.body;

    // Validations
    if (!name) throw "The Name is Required";
    if (!email) throw "Email must be Provided";
    if (!password) throw "Pasword must be Provided";
    if (password.length < 8) throw "Password must be at 8 character long!";
    if (password !== confirm_password) throw "Password and confirm Password doest not Match.";

    const getDuplicateEmail = await userModel.findOne({
        email: email,
    });

    if (getDuplicateEmail) throw "This email is Already Exists!";

    //Encrypt Password (Hashing the Password)
    const hashPassword = await bcrypt.hash(password, 12);



    const createdUser = await userModel.create({
        name: name,
        email: email,
        password: hashPassword,
        balance: balance,
    });

    const accessToken = jwtManager(createdUser);


      await emailManager(createdUser.email,"Welcome to Expense Tracker PRO.We hope you can manage your expenses easily from our platform","<h1></h1>Welcome to Expense Tracker PRO</h1>","Welcome to Expense Tracker PRO! ");


    res.status(201).json({
        status: "User Register Successfully",
        accessToken: accessToken
    });

}

module.exports = register;