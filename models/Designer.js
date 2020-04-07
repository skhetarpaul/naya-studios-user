const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignerSchema = new Schema({
  timeDevoted: {
    type: Number,
    required: true,
    // minimum: 1,   
    // maximum: 10,
    description: "Value must be a number"
  },
  type: {
    type: String,
    enum: ["Furniture Designer", "Architect", "Interior Designer", "Industrial Designer", "Design Maker", "Other"],
    required: true
  },
  education: {
    type: String,
    required: true
  }
});
module.exports = Designer = mongoose.model("designers", DesignerSchema);