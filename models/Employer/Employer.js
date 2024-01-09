const mongoose = require("mongoose");
const JobPosting = require("./JobPosting");

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },

  noOfEmployes: {
    type: String,
  },
  logo: {
    type: String,
  },
  welcomeVideo: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  companyIndustry: {
    type: String,
  },
  description: {
    type: String,
  },
  followers: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  accountStatus: {
    type: String,
    enum: ["Active", "Deactive", "On Hold"],
    default: "Active",
    
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],

});

module.exports = mongoose.model("Employer", employerSchema);
