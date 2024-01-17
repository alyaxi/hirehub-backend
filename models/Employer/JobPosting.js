const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicationCount: {
    type: Number,
    default: 0,
  },
  noOfOpening: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
  },
  package: {
    type: Number,
  },
  location: {
    type: String,
  },
  jobStatus: {
    type: String,
    enum: ['open', 'closed', 'republished'],
    default: 'open',
  },
  jobType: {
    type: String,
    enum: ['fullTime', 'partTime', 'temporary', 'contract', 'internship', 'commission', 'newGrad'],
  },
  JobShift: {
    type: String,
    enum: [
      'morning',
      'daytime',
      'evening',
      'night',
      'flexible',
      'remote',
      'on-call',
      'rotational',
      'other',
    ]
  },
  careerLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'executive']
  },
  minimumQualification: {
    type: String,
  },
  noOfHiring: {
    type: Number,
  },

  payRange: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    hourlyRate: {
      type: Number,
    },
  },
  companyOverview: {
    type: String,
  },
  coreValues: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  jdFile: {
    type: String, // File path or storage reference
  },
  impactOfPosition: {
    type: String,
  },
  responsibilities: {
    type: String,
  },
  positionGrowth: {
    type: String,
  },
  competencies: {
    type: String,
  },
  requirements: {
    type: String,
  },
  kpis: {
    type: String,
  },
  benefits: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  AppliedBefore: {
    type: Date,
  },
  industry: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "No Prefrence"]
  },
  experience: {
    type: Number,
  },
  department: {
    type: String,

  },
  jobMode: {
    type: String,
    enum: ["onsite", "remote", "hybrid"]
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidateProfile',
    // required: true,
  },

});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
