const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { getAllEmployersWithPayments, changeStatusEmployer, deleteEmployerByID, ViewEmployerById } = require("../../controllers/Admin/ManageEmployers");
const { getAllCandidateAppliedJobs, changeStatusAppliedJobAdmin } = require("../../controllers/Admin/ManageCandidate");
const { validateAppliedJob } = require("../../utilis/BodyValidator");
const { getJobsByAll } = require("../../controllers/Employer/JobPosting");

router.get('/admin/manage-employers', authMiddleware ,  checkRole(['admin']), getAllEmployersWithPayments);
router.post('/admin/change-status-employers', authMiddleware ,  checkRole(['admin']), changeStatusEmployer);
router.post('/admin/delete-employers', authMiddleware ,  checkRole(['admin']), deleteEmployerByID);
router.get('/admin/view-employer-by-id', authMiddleware ,  checkRole(['admin']), ViewEmployerById);
router.get('/admin/manage-candidates', authMiddleware ,  checkRole(['admin']), getAllCandidateAppliedJobs);
router.post('/admin/change-manage-candidates-status', authMiddleware ,  checkRole(['admin']),validateAppliedJob, changeStatusAppliedJobAdmin);
router.get("/admin/get-jobs-by-all", authMiddleware,checkRole(['admin']), getJobsByAll)



module.exports = router;