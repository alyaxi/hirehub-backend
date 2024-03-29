const JobPosting = require("../../models/Employer/JobPosting");
const respond = require("../../utilis/responseHelper");
const { Types } = require("mongoose")

exports.getJobsByAll = async (req, res, next) => {
    try { // Assuming the employer ID is in the authenticated user object

        // const jobs = await JobPosting.findOne({ employerId: employerId }).populate("employerId")
        const jobs = await JobPosting.aggregate([{
            $lookup: {
                from: "employers",
                localField: "employerId",
                foreignField: "userId",
                as: "employer"
            }
        }])


        respond(res, { jobs });
    } catch (error) {
        console.error(error); 
        next(error);
    }
};

exports.getJobsByEmployer = async (req, res, next) => {
    try {
        const employerId = req.user.id; // Assuming the employer ID is in the authenticated user object

        // const jobs = await JobPosting.findOne({ employerId: employerId }).populate("employerId")
        const jobs = await JobPosting.aggregate([
            {
                $match: { employerId: new Types.ObjectId(employerId) }
            },
            {
                $lookup: {
                    from: "employers",
                    localField: "employerId",
                    foreignField: "userId",
                    as: "employerId"
                }
            }

        ])


        respond(res, { jobs });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.addJobByEmployer = async (req, res, next) => {

    try {
        const employerId = req.user.id;

        // Now, you can use the employerId in your job creation logic
        const newJob = new JobPosting({
            ...req.body,
            employerId: new Types.ObjectId(employerId), // Assuming employerId is a valid ObjectId
        });

        const savedJob = await newJob.save();
        respond(res, { msg: 'Job created successfully', job: savedJob });
    } catch (error) {
        console.error(error);
        next(error);
    }


};

exports.updateJobByEmployer = async (req, res, next) => {
    try {
        const employerId = req.user.id; // Assuming the employer ID is in the authenticated user object
        const jobId = req.params.jobId;
        const { jobStatus } = req.body;

        // console.log(employerId);
        console.log(jobId);

        const updatedJob = await JobPosting.findOneAndUpdate(
            { _id: jobId },
            { $set: { jobStatus } },
            { new: true }



        );

        if (!updatedJob) {
            return respond(res, { error: "Job not found or unauthorized" }, 404);
        }

        respond(res, { msg: "Status has been updated" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteJobByEmployer = async (req, res, next) => {
    try {
        const employerId = req.user.id; // Assuming the employer ID is in the authenticated user object
        const jobId = req.params.jobId;
        const { isDeleted } = req.body


        const deletedJob = await JobPosting.findByIdAndUpdate(
            { _id: jobId },
            { $set: { isDeleted } },
            { new: true });

        if (!deletedJob) {
            return respond(res, { error: "Job not found or unauthorized" }, 404);
        }

        respond(res, { deletedJob });
    } catch (error) {
        console.error(error);
        next(error);
    }
};