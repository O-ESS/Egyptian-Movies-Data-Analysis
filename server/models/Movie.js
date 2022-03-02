const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    Column1 : String,
    Name: String,
    Date: String,
    Category: String,
    Duration: String,
    Classifier_synopsis: String,
    Writers: String,
    Production: String,
    CameraCrew: String,
    Montage: String,
    Decor: String,
    Clothing: String,
    Music: String,
    Directors: String,
    Distributor: String,
    Synopsis: String,
    Leading_actor: String,
    rate:Number,
    users:[mongoose.Schema.Types.Mixed], //Araay of objects [{UserID520:4.2} , {UserID562056:3.5} , {UserID56050:1.2} ]
});

module.exports = mongoose.model("Movie", movieSchema);
