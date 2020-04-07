const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MakerSchema = new Schema({
  noOfProjects: {
    type: Number,
    required: true,
    minimum: 1,
    maximum: 10,
    description: "Value must be in range 1 to 10"
  },
  material: {
    type: String,
    enum: ["Wood", "Metal", "Glass", "Plastic", "Concrete", "Other"],
    required: true
  },
  location: {
    type: String,
    required: true
  }
});
module.exports = Maker = mongoose.model("makers", MakerSchema);