
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { updateCandidateInfo, getCandidate, addProjects, addExperiennce, addSkills, addlanguage, addEducation } = require("../../controllers/Candidates/Candidate");
const { createCandidateProfileValidator } = require("../../utilis/BodyValidator");
const router = express.Router();
const multer = require('multer');
const multerConfig = require("../../middleware/multerConfig");


const upload = multer(multerConfig)
const cpUpload = upload.fields([{ name: 'profilePicture', maxCount: 1 },
 { name: 'introVideo', maxCount: 1 },
  { name: 'projectImage', maxCount: 1 }, 
{ name: 'projectImageFile', maxCount: 1 }])


router.get("/get-candidate", authMiddleware,checkRole(['candidate']), getCandidate)
router.post("/update-candidate", authMiddleware, checkRole(['candidate']),createCandidateProfileValidator,cpUpload, updateCandidateInfo)
router.post("/add-projects", authMiddleware, checkRole(['candidate']),cpUpload, addProjects)
router.post("/add-experience", authMiddleware, checkRole(['candidate']), addExperiennce)
router.post("/add-skills", authMiddleware, checkRole(['candidate']), addSkills)
router.post("/add-education", authMiddleware, checkRole(['candidate']), addEducation)
router.post("/add-language", authMiddleware, checkRole(['candidate']), addlanguage)
// router.post("/update-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), updateJobByEmployer)
// router.post("/delete-jobs-by-employer/:jobId", authMiddleware, checkRole(['candidate']), deleteJobByEmployer)





module.exports = router
