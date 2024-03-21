const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
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
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer', 
    required: true,
  },
  scheduledDate: {
    type: String,
    // required: true,
  },
  attachments: String,
  location: String, 
  description: String, 
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled',
  },
  approvalInvite: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending',
  },
  startTime: {
    type:String,
  },
  endTime: {
    type:String,
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
