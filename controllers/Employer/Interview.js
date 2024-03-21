const Interview = require("../../models/Employer/InterviewSchedule");
const respond = require("../../utilis/responseHelper");

const scheduleInterview = async (req, res, next) => {
  try {
    const {
      jobId,
      candidateId,
      scheduledDate,
      location,
      description,
      attachments,
      startTime,
      endTime
    } = req.body;
    const employerId = req.user.id
    // Create a new interview instance
    const interview = new Interview({
      jobId,
      candidateId,
      scheduledBy: employerId,
      scheduledDate,
      location,
      description,
      attachments,
      startTime,
      endTime
    });

    // Save the interview to the database
    const savedInterview = await interview.save();

    respond(res, { savedInterview });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getScheduleInterview = async (req, res, next) => {
  try {
    const employerId = req.user.id;

    // Fetch scheduled interviews for the employer
    const savedInterviews = await Interview.find({ scheduledBy: employerId });

    respond(res, { savedInterviews });
  } catch (error) {
    console.error(error);
    next(error);
  }
};



module.exports = {
  scheduleInterview,
  getScheduleInterview
};