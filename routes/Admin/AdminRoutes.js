const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const checkRole = require("../../middleware/CheckRole");
const { getAllEmployersWithPayments, changeStatusEmployer, deleteEmployerByID, ViewEmployerById } = require("../../controllers/Admin/ManageEmployers");
const { getAllCandidateAppliedJobs, changeStatusAppliedJobAdmin } = require("../../controllers/Admin/ManageCandidate");
const { validateAppliedJob } = require("../../utilis/BodyValidator");
const { getJobsByAll } = require("../../controllers/Employer/JobPosting");
const { getScheduleInterviewAdmin } = require("../../controllers/Admin/InterviewsByadmin");
const ManageStaticContent = require("../../controllers/Admin/ManageStaticContent");

router.get('/admin/manage-employers', authMiddleware ,  checkRole(['admin']), getAllEmployersWithPayments);
router.post('/admin/change-status-employers', authMiddleware ,  checkRole(['admin']), changeStatusEmployer);
router.post('/admin/delete-employers', authMiddleware ,  checkRole(['admin']), deleteEmployerByID);
router.get('/admin/view-employer-by-id', authMiddleware ,  checkRole(['admin']), ViewEmployerById);
router.get('/admin/manage-candidates', authMiddleware ,  checkRole(['admin']), getAllCandidateAppliedJobs);
router.post('/admin/change-manage-candidates-status', authMiddleware ,  checkRole(['admin']),validateAppliedJob, changeStatusAppliedJobAdmin);
router.get("/admin/get-jobs-by-all", authMiddleware,checkRole(['admin']), getJobsByAll)
router.post("/admin/view-interviews", authMiddleware,checkRole(['admin']), getScheduleInterviewAdmin)


//Manage Static Content
router.post("/admin/create-faqs", authMiddleware,checkRole(['admin']), ManageStaticContent.CreateFAQ)
router.post("/admin/create-manage-terms", authMiddleware,checkRole(['admin']), ManageStaticContent.CreateTerm)
router.get("/admin/view-manage-terms", authMiddleware,checkRole(['admin']), ManageStaticContent.ManageTerms)
router.get("/admin/view-faqs", authMiddleware,checkRole(['admin']), ManageStaticContent.ManageFaqs)



module.exports = router;