
const express = require("express");
const router = express.Router();
const multer = require('multer');
const authMiddleware = require("../../middleware/authMiddleware");
const { GetEmployerById, updateEmployerInformation } = require("../../controllers/Employer/EmployerController");
const { updateEmployerInformationValidator, validateInterview } = require("../../utilis/BodyValidator");
const checkRole = require("../../middleware/CheckRole");
const multerConfig = require("../../middleware/multerConfig");
const { scheduleInterview, getScheduleInterview } = require("../../controllers/Employer/Interview");
const ManageQuestionnaire = require("../../controllers/Employer/ManageQuestionnaire");




const upload = multer(multerConfig)
const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'welcomeVideo', maxCount: 1 }])

router.get("/get-employer-by-id", authMiddleware, checkRole(["employer"]), GetEmployerById)
router.post("/update-employer-by-id", authMiddleware, checkRole(["employer"]), updateEmployerInformationValidator, cpUpload, updateEmployerInformation)
router.post('/schedule-interview',authMiddleware, checkRole(["employer"]), scheduleInterview);
router.get('/get-schedule-interview',authMiddleware, checkRole(["employer"]), getScheduleInterview);
router.get('/get-manage-questionairre',authMiddleware, checkRole(["employer"]), ManageQuestionnaire.getQuestionnaires);
router.post('/manage-questionairre',authMiddleware, checkRole(["employer"]), ManageQuestionnaire.createQuestionnaire);
router.put('/update-manage-questionairre/:id',authMiddleware, checkRole(["employer"]), ManageQuestionnaire.updateQuestionnaire);
router.delete('/delete-manage-questionairre/:id',authMiddleware, checkRole(["employer"]), ManageQuestionnaire.deleteQuestionnaire);

module.exports = router