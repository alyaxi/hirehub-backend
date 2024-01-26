
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const AppliedJobsCandidate = require("../../controllers/Candidates/AppliedJob");
const router = express.Router();





router.get("/get-applied-jobs", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.getAppliedJobsByCandidate)
router.get("/get-applied-job-details", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.getAppliedJobsDetail)
router.post("/apply-for-job/:jobId", authMiddleware,checkRole(['candidate']), AppliedJobsCandidate.applyForJob)





module.exports = router
