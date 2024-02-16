const mongoose = require("mongoose");

const ManageTerms = new mongoose.Schema({
  title: {
   type: String,
  },
  description: {
    type: String,
   },
   Date: {
    type: Date,
    default: Date.now,
   }
});

module.exports = mongoose.model("ManageTerms", ManageTerms);
