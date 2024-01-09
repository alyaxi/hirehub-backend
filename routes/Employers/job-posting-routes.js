
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { getJobsByEmployer, addJobByEmployer, updateJobByEmployer, deleteJobByEmployer, getJobsByAll } = require("../../controllers/Employer/JobPosting");
const { jobPostingValidator, updateJobStatusValidator, deleteJobValidator, validateAppliedJob } = require("../../utilis/BodyValidator");
const { getAppliedCandidates, changeStatusAppliedJobEmployer } = require("../../controllers/Employer/ManageCandidates");
const router = express.Router();





router.get("/get-applied-jobs-by-candidate", authMiddleware,checkRole(['employer']), getAppliedCandidates)
router.post("/change-status-applied-jobs-by-candidate", authMiddleware,checkRole(['employer']),validateAppliedJob, changeStatusAppliedJobEmployer)
router.get("/get-jobs-by-employer", authMiddleware,checkRole(['employer']), getJobsByEmployer)
router.post("/add-jobs-by-employer", authMiddleware, checkRole(['employer']), jobPostingValidator, addJobByEmployer)
router.post("/update-jobs-by-employer/:jobId", authMiddleware, checkRole(['employer']), updateJobStatusValidator, updateJobByEmployer)
router.post("/delete-jobs-by-employer/:jobId", authMiddleware, checkRole(['employer']), deleteJobValidator, deleteJobByEmployer)





module.exports = router
