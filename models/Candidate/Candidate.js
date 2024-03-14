const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User model
    required: true,
  },
  personalInformationData: {
    profilePicture: String,
    careerLevel: String,
    city: String,
    country: String,
    dob: String,
    experience: String,
    gender: String,
    phoneNo: String,
    profileCompletion: String,
    state: String,
    statusLine: String,
    zipCode: String,
    expectedSalary: String,
    accountStatus: {
      type: String,
      enum: ["Active", "Disabled", "OnHold"],
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  summery: {
    text: String,
  },
  projectsData: [
    {
      id: String,
      associated: String,
      currentlyInProcess: Boolean,
      name: String,
      projectUrl: String,
      description: String,
      projectImage: String,
      startDate: String,
      endDate: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  experiencesData: [
    {
      id: String,
      title: String,
      company: String,
      industry: String,
      directlyManageTeam: String,
      noOfPeople: String,
      salary: String,
      selectedCountry: String,
      selectedState: String,
      selectedCity: String,
      startDate: String,
      endDate: String,
      agreeTerms: String,
      currentlyInProcess: Boolean,
      description: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  educationsData: [
    {
      id: String,
      organization: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      selectedCountry: String,
      selectedState: String,
      selectedCity: String,
      currentlyInProcess: Boolean,
      grade: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  skillsData: [
    {
      id: String,
      title: String,
      experience: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  languagesData: [
    {
      id: Number,
      title: String,
      proficiency: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  jobPreference: {
    desiredJobTitle: [String],
    desiredSalary: String,
    relocation: {
      anywhere: Boolean,
      onlyNearMe: {
        locations: [String],
      },
    },
    skills: [String],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  resume: String,
  introVideo: String,
  resumePrivacySetting: {
    type: String,
    enum: ["Private", "Public"],
  },
});
const CandidateProfile = mongoose.model(
  "CandidateProfile",
  candidateProfileSchema
);

module.exports = CandidateProfile;
