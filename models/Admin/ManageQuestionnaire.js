const mongoose = require("mongoose");

const ManageFAQS = new mongoose.Schema({
  position: {
   type: String,
  },
  question: {
    type: String,
   },
   Date: {
    type: Date,
    default: Date.now,
   }
});

module.exports = mongoose.model("ManageFAQS", ManageFAQS);
