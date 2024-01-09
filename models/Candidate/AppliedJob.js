const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CandidateProfile",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosting", 
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ["new", "attempted to contact", "connected", "on hold", "qualified", "unqualified", "not interested"],
    default: "new",
  },
  appicaionStage: {
    type: String,
    enum: ["new application", "screening", "hire", "selection"],
    default: "new application",

  },
  meetAllRequirment: {
    type: Boolean,
    default: false,
  },
  jobQuestionsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobQuestions", // Assuming you have a JobQuestions model
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer", // Assuming you have an Employer model
  },
});

module.exports = mongoose.model("AppliedJob", appliedJobSchema);
