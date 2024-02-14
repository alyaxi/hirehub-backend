const Interview = require("../../models/Employer/InterviewSchedule");
const respond = require("../../utilis/responseHelper");


// const scheduleInterview = async (req, res) => {
//   try {
//     const {
//       jobId,
//       candidateId,
//       scheduledDate,
//       location,
//       description,
//       attachments,
//       startTime,
//       endTime
//     } = req.body;
//     const employerId = req.user.id
//     // Create a new interview instance
//     const interview = new Interview({
//       jobId,
//       candidateId,
//       scheduledBy: employerId,
//       scheduledDate,
//       location,
//       description,
//       attachments,
//       startTime,
//       endTime
//     });

//     // Save the interview to the database
//     const savedInterview = await interview.save();

//     respond(res, { savedInterview });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

const getScheduleInterview = async (req, res, next) => {
  try {
    const candidateId = req.user.id;

    // Fetch scheduled interviews for the employer
    const interviews = await Interview.find({ candidateId: candidateId });

    respond(res, { interviews });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const UpdateScheduleInterview = async (req, res, next) => {
  try {
    const candidateId = req.user.id;
    const { jobId, approvalInvite } = req.body;

    // Fetch scheduled interviews for the candidate
    const existingInterview = await Interview.findOne({ candidateId: candidateId, jobId: jobId });

    if (!existingInterview) {
      return res.status(404).json({ error: 'Interview not found for the specified candidate and job.' });
    }

    // Update the interview details
    existingInterview.approvalInvite = approvalInvite;

    // Save the updated interview
    const updatedInterview = await existingInterview.save();

    // Respond with the updated interview
    res.json({ updatedInterview });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getScheduleInterview,
  UpdateScheduleInterview
};