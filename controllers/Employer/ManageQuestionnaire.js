const ManageQuestionnaireSchema = require("../../models/Employer/ManageQuestionnaireSchema");
const respond = require("../../utilis/responseHelper");



const ManageQuestionnaire = {
  getQuestionnaires: async (req, res, next) => {
    try {
      const employerId = req.user.id;

      const questionnaires = await ManageQuestionnaireSchema.find({ employerId });

      respond(res, { questionnaires });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },




  createQuestionnaire: async (req, res, next) => {
    try {
      const employerId = req.user.id;

      // Create a new Questionnaire
      const { position, question } = req.body;
      const questionnaire = await ManageQuestionnaireSchema.create({ position, question, employerId });

      respond(res, { questionnaire });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  deleteQuestionnaire: async (req, res, next) => {
    try {
      // Find and delete the questionnaire
      const deletedQuestionnaire = await ManageQuestionnaireSchema.findByIdAndDelete(req.params.id);

      respond(res, { deletedQuestionnaire });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateQuestionnaire: async (req, res, next) => {
    try {
      const employerId = req.user.id;
      const questionnaireId = req.params.id;

      // Update questionnaire
      const { position, question } = req.body;
      const updatedQuestionnaire = await ManageQuestionnaireSchema.findOneAndUpdate(
        { _id: questionnaireId, employerId },
        { position, question },
        { new: true }
      );

      if (!updatedQuestionnaire) {
        return respondError(res, 404, 'Questionnaire not found');
      }

      respond(res, { updatedQuestionnaire });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};

module.exports = ManageQuestionnaire;
