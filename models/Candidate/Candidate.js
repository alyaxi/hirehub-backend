const mongoose = require('mongoose');

const candidateProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model
    required: true,
  },
  personalInformation: {
    avatar: String,
    lastName: String,
    mobile: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    city: String,
    area: String,
    careerLevel: String,
    experience: String,
    expectedSalary: Number,
    zipCode: String,
    accountStatus: String,
    isVerified: Boolean,
    isDeleted: Boolean,
  },
  summary: {
    description: String,
    isDeleted: Boolean,
  },
  projects: [
    {
      uploadImage: String,
      name: String,
      projectUrl: String,
      startDate: Date,
      endDate: Date,
      currentlyInProcess: Boolean,
      associated: String,
      description: String,
      isDeleted: Boolean,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      industry: String,
      directlyManagedTeam: {
        answer: Boolean,
        noOfPeoples: Number,
      },
      salary: Number,
      location: String,
      city: String,
      startDate: Date,
      currentlyWorking: Boolean,
      description: String,
      isDeleted: Boolean,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      location: String,
      grade: String,
      isDeleted: Boolean,
    },
  ],
  skills: [
    {
      addNewSkills: String,
      experienceSkill: Number,
      isDeleted: Boolean,
    },
  ],
  languages: [
    {
      addNewLanguage: String,
      proficiency: String,
    },
  ],
  jobPreference: {
    desiredJobTitle: [String],
    desiredSalary: Number,
    skills: [String],
    relocation: {
      anywhere: Boolean,
      onlyNearMe: {
        locations: [String],
      },
    },
  },
  resume: String,
  introVideo: String,
  resumePrivacySetting: {
    type: String,
    enum: ['Private', 'Public'],
  },
});

const CandidateProfile = mongoose.model('CandidateProfile', candidateProfileSchema);

module.exports = CandidateProfile;
