
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { updateCandidateInfo, getCandidate } = require("../../controllers/Candidates/Candidate");
const { createCandidateProfileValidator } = require("../../utilis/BodyValidator");
const router = express.Router();





router.get("/get-candidate", authMiddleware,checkRole(['candidate']), getCandidate)
router.post("/update-candidate", authMiddleware, checkRole(['candidate']),createCandidateProfileValidator, updateCandidateInfo)
// router.post("/update-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), updateJobByEmployer)
// router.post("/delete-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), deleteJobByEmployer)





module.exports = router
