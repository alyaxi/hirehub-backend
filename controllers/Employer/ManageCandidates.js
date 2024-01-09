const { Types } = require("mongoose");
const AppliedJob = require("../../models/Candidate/AppliedJob");
const respond = require("../../utilis/responseHelper");


exports.getAppliedCandidates = async (req, res, next) => {
    try {
        const employerId = req.user.id; 

        const appliedJobs = await AppliedJob.aggregate([
            {
                $match: { employerId: new Types.ObjectId(employerId) }
            },
            {
                $lookup: {
                    from: "candidateprofiles",
                    localField: "candidateId",
                    foreignField: "userId",
                    as: "candidate"
                }
            },
            {
                $lookup: {
                    from: "employers",
                    localField: "employerId",
                    foreignField: "userId",
                    as: "employer"
                }
            },
            {
                $lookup: {
                    from: "jobpostings",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "Job"
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

        ])
        if (!appliedJobs || appliedJobs.length === 0) {
            
            return respond(res, 'Applied jobs not found', 404);
          }

        return respond(res, { appliedJobs });
    } catch (error) {
        console.error(error);
        next(error);
    }

}

exports.changeStatusAppliedJobEmployer = async (req, res, next) => {
    try {
        const { appicaionStage, applicationStatus, meetAllRequirment } = req.body;
        const { id } = req.query;
        console.log({id})
        console.log(applicationStatus, appicaionStage, "statusssssss")
        if(appicaionStage =="undefined" || applicationStatus =="undefined" || meetAllRequirment == "undefined") return  respond(res, { error: "value could not be updated" }, 403);

        const updateFields = {}

        if(meetAllRequirment) {
            updateFields.meetAllRequirment = meetAllRequirment
        }
        if (appicaionStage) {
            updateFields.appicaionStage = appicaionStage;
          }
          if (applicationStatus) {
            updateFields.applicationStatus = applicationStatus;
          }


        const appliedJob = await AppliedJob.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: true }
        )


        console.log(appliedJob, "apliedJobsssssssssss")

        if (!appliedJob || appliedJob.length === 0) {
            // console.log('Applied jobs not found');
            return respond(res, 'Applied job not found', 404);
        }



        return respond(res, { msg: "Job status has been changed" ,appliedJob  });
    } catch (error) {
        console.error(error);
        next(error);
    }

}
