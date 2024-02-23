const Interview = require("../../models/Employer/InterviewSchedule");
const respond = require("../../utilis/responseHelper");


const getScheduleInterviewAdmin = async (req, res, next) => {
  try {
    const {candidateId, jobId} = req.body
    console.log(candidateId, jobId, "bodyyyyyyyyyyyy")
    const interviews = await Interview.find({ $and: [{ candidateId: { $gte: candidateId } }, { jobId: jobId }] });

    respond(res, { interviews });
  } catch (error) {
    console.error(error);
    next(error);
  }
};



module.exports = {
    getScheduleInterviewAdmin,
 
};