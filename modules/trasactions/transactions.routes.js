const express=require("express");

const auth=require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransaction = require("./controllers/getTransaction");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionRoutes=express.Router();




transactionRoutes.use(auth);

//Protexted Routes(Private)

transactionRoutes.post("/addIncome",addIncome);
transactionRoutes.post('/addExpense',addExpense);
transactionRoutes.get('/',getTransaction);
transactionRoutes.delete('/:transaction_id',deleteTransaction);
transactionRoutes.patch('/',editTransaction);

module.exports=transactionRoutes;