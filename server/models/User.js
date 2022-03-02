const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    password : String,
    email : String,
    rates:[mongoose.Schema.Types.Mixed],  //Araay of objects [{MovieID520:4.2} , {MovieID562056:3.5} , {MovieID56050:1.2} ]
});

module.exports = mongoose.model("User", userSchema);
