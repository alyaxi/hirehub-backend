
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const AppliedJobsCandidate = require("../../controllers/Candidates/AppliedJob");
const { getJobsByAll } = require("../../controllers/Employer/JobPosting");
const router = express.Router();





router.get("/get-applied-jobs", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.getAppliedJobsByCandidate)
router.get("/get-applied-job-details", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.getAppliedJobsDetail)
router.post("/apply-for-job/:jobId", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.applyForJob)
router.get("/get-all-jobs", authMiddleware,checkRole(['candidate']), getJobsByAll)






module.exports = router
