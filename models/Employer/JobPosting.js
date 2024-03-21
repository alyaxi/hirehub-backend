// models/JobPosting.js

const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    positionTitle: {
        type: String,
        required: true,
      },
    jobType: {
        type: String,
        required: true,
    },
    noOfOpenings: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    postedDate: {
        type: String,
    },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobLocation: {
        type: String,
        required: true,
    },
    jdFile: {
        type: String, 
      },
    salary: {
        type: {
            type: String,
            enum: ['range', "single"],
            required: true,
        },
        value: {
            type: String,
        },
        rate: {
            type: String,
            required: true,
        },
    },
    aboutPosition: {
        type: String,
        required: true,
    },
    benefits: [
        {
            type: String,
        },
    ],
    qualification: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    jobShift: {
        type: String,
        required: true
      },
    department: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    minimumEducation: {
        type: String,
        required: true,
    },
    careerLevel: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    jobMode: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    careerLevel: {
        type: String,
    },
    jobStatus: {
        type: String,
        enum: ['Open', 'Closed', 'Republished'],
        default: 'Open',
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CandidateProfile',
        // required: true,
    },
    applicationCount: {
        type: Number,
        default: 0,
      },

});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
