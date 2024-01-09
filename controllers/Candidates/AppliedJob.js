

const AppliedJob = require("../../models/Candidate/AppliedJob");
const respond = require("../../utilis/responseHelper");

const AppliedJobsCandidate = {
    async getAppliedJobsByCandidate(req, res, next) {
        try {
            const candidateId = req.user.id; // Assuming the candidate ID is in the authenticated user object

            const appliedJobs = await AppliedJob.find({ candidateId });

            return respond(res, { appliedJobs });
        } catch (error) {
            console.error(error);
            next(error);
        }

    },
    async getAppliedJobsDetail(req, res, next) {


        try {
            const candidateId = req.user.id; // Assuming the candidate ID is in the authenticated user object

            const appliedJobs = await AppliedJob.find({ candidateId }).populate("jobId");

            return respond(res, { appliedJobs });


        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async applyForJob(req, res, next) {
        try {

            const { jobId } = req.params;
            const candidateId = req.user.id;
            const { employerId } = req.body // Assuming the candidate ID is in the authenticated user object

            // Check if the candidate has already applied for this job
            const existingApplication = await AppliedJob.findOne({ candidateId, jobId });

            if (existingApplication) {
                return respond(res, { error: "You have already applied for this job" }, 301);
            }

            // Create a new applied job entry
            const newAppliedJob = new AppliedJob({
                candidateId,
                jobId,
                employerId,
            });

            const savedAppliedJob = await newAppliedJob.save();

            return respond(res, { appliedJob: savedAppliedJob });
        } catch (error) {
            console.error(error);
            next(error);
        }

    }
}

module.exports = AppliedJobsCandidate;
