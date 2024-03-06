const mongoose = require('mongoose');

const ManageEmail = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting', // Assuming there's a PostedJob model
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidateProfile', // Assuming there's a CandidateProfile model
    required: true,
  },
  text:String,
  subject:String,
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer', 
    required: true,
  },
  scheduledDate: {
    type: String,
    // required: true,
  },
  attachments: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model('ManageEmail', ManageEmail);

module.exports = Interview;
