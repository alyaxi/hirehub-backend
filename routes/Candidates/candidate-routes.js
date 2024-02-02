
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { updateCandidateInfo, getCandidate } = require("../../controllers/Candidates/Candidate");
const { createCandidateProfileValidator } = require("../../utilis/BodyValidator");
const router = express.Router();
const multer = require('multer');
const multerConfig = require("../../middleware/multerConfig");


const upload = multer(multerConfig)
const cpUpload = upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'introVideo', maxCount: 1 }, { name: 'projectImage', maxCount: 1 }])


router.get("/get-candidate", authMiddleware,checkRole(['candidate']), getCandidate)
router.post("/update-candidate", authMiddleware, checkRole(['candidate']),createCandidateProfileValidator,cpUpload, updateCandidateInfo)
// router.post("/update-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), updateJobByEmployer)
// router.post("/delete-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), deleteJobByEmployer)





module.exports = router
