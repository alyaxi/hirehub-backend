
const express = require("express");
const router = express.Router();
const multer = require('multer');
const authMiddleware = require("../../middleware/authMiddleware");
const { GetEmployerById, updateEmployerInformation } = require("../../controllers/Employer/EmployerController");
const { updateEmployerInformationValidator } = require("../../utilis/BodyValidator");
const checkRole = require("../../middleware/CheckRole");
const multerConfig = require("../../middleware/multerConfig");



const upload = multer(multerConfig)
const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'welcomeVideo', maxCount: 1 }])

router.get("/get-employer-by-id", authMiddleware, checkRole(["employer"]), GetEmployerById)
router.post("/update-employer-by-id", authMiddleware, checkRole(["employer"]), updateEmployerInformationValidator, cpUpload, updateEmployerInformation)


module.exports = router