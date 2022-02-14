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
    Leading_actor: String
   
});

module.exports = mongoose.model("Movie", movieSchema);
