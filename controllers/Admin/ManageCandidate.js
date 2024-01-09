const { Types } = require("mongoose");
const respond = require("../../utilis/responseHelper");
const AppliedJob = require("../../models/Candidate/AppliedJob");



exports.getAllCandidateAppliedJobs = async (req, res, next) => {
    try {
        const appliedJobs = await AppliedJob.aggregate([
            {
                $lookup: {
                    from: 'candidateprofiles',
                    localField: 'candidateId',
                    foreignField: 'userId',
                    as: 'candidate'
                }
            },
            {
                $lookup: {
                    from: 'employers',
                    localField: 'employerId',
                    foreignField: 'userId',
                    as: 'employer'
                }
            },
            {
                $lookup: {
                    from: 'jobpostings',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'Job'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'candidate.userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    'user.password': 0
                }
            }
        ]);

        if (!appliedJobs || appliedJobs.length === 0) {
            // console.log('Applied jobs not found');
            return respond(res, 'Applied jobs not found', 404);
        }
        // if (!appliedJobs || !appliedJobs.length > 0) return respond(res, "error", null)


        return respond(res, { getAllappliedJobs: appliedJobs });
    } catch (error) {
        console.error(error);
        next(error);
    }

}

exports.changeStatusAppliedJobAdmin = async (req, res, next) => {
    try {
        const { appicaionStage, applicationStatus } = req.body;
        const { id } = req.query;

        console.log(applicationStatus, appicaionStage, "statusssssss")

        if(appicaionStage =="undefined" || applicationStatus =="undefined" ) return  respond(res, { error: "value could not be updated" }, 403);

        const updateFields = {}

        if (appicaionStage) {
            updateFields.appicaionStage = appicaionStage;
          }
          if (applicationStatus) {
            updateFields.applicationStatus = applicationStatus;
          }


        const appliedJob = await AppliedJob.findOneAndUpdate(
            { candidateId: id },
            { $set: updateFields },
            { new: true }
        )

        if (!appliedJob || appliedJob.length === 0) {
            // console.log('Applied jobs not found');
            return respond(res, 'Applied job not found', 404);
        }



        return respond(res, { msg: "Job status has been changed" , appliedJob });
    } catch (error) {
        console.error(error);
        next(error);
    }

}