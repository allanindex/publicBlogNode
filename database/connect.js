const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://admin:${process.env.yourPassword}@yourRepo.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
console.log("error to connect" + err)
})
