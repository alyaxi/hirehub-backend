const Interview = require("../../models/Employer/InterviewSchedule");

const scheduleInterview = async (req, res) => {
    try {
      const {
        jobId,
        candidateId,
        scheduledBy,
        scheduledDate,
        location,
        notes,
        status,
      } = req.body;
  
      // Create a new interview instance
      const interview = new Interview({
        jobId,
        candidateId,
        scheduledBy,
        scheduledDate,
        location,
        notes,
        status,
      });
  
      // Save the interview to the database
      const savedInterview = await interview.save();
  
      res.status(201).json(savedInterview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    scheduleInterview,
  };