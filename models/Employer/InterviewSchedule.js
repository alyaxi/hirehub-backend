const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostedJob', // Assuming there's a PostedJob model
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidateProfile', // Assuming there's a CandidateProfile model
    required: true,
  },
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model for the person scheduling the interview
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  location: String, // Interview location (if applicable)
  notes: String, // Additional notes about the interview
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
