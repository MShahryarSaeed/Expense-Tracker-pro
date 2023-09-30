// Import necessary modules and set up error handling for asynchronous functions
require("express-async-errors");
const express = require("express");
const cors=require("cors");
const PORT = 3000;
// import errorHandler
const errorHandler = require("./handlers/errorHandler");
//import mongoose
const mongoose=require("mongoose");

// Import Routes
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/trasactions/transactions.routes");

// Create an Express application
const app = express();
app.use(cors());



// Load environment variables from the .env file
require("dotenv").config();

//-------------------- Connection to mongoDB with enviromental variablesy-------------------------------------------------------
mongoose.connect(process.env.mongo_connection,{}).then(()=>{
    console.log("Connected to MongoDB successfully");
})
.catch(()=>{
  console.log("Connection to MongoDB Failed");
});

// Enable parsing of JSON request bodies
app.use(express.json());

// Models initization
require("./models/users.model");
require("./models/transaction.model");



// Routes
app.use("/api/users",userRoutes);
app.use("/api/transactions",transactionRoutes);

//End Of All Routes...

app.all('*',(req,res,next)=>{

  res.status(404).json({
    status:"failed",
    message:"Not Found!",
  });

})



// Import and use the error handling middleware (Import After all the Routes)
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is Started Successfully at http://localhost:${PORT}`);
});
