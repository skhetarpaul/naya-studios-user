const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
    img: 
      { 
        type: String
      },
    contentImage :{
        type: String
    }

});
module.exports = UploadImage = mongoose.model("uploads", UploadSchema);