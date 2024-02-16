const mongoose = require("mongoose");

const ManageQuestionnaireSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting', // Assuming there's a PostedJob model
    
  },
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

module.exports = mongoose.model("ManageQuestionnaireSchema", ManageQuestionnaireSchema);
