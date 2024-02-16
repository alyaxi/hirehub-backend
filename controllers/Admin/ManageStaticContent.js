// manageStaticContentController.js
const ManageFAQS = require("../../models/Admin/ManageFAQS");
const ManageTerms = require("../../models/Admin/ManageTerms");
const respond = require("../../utilis/responseHelper");


const ManageStaticContent = {
  ManageFaqs: async (req, res, next) => {
    try {
      // Fetch all FAQs from the database
      const faqs = await ManageFAQS.findOne();
      respond(res, { faqs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  ManageTerms: async (req, res, next) => {
    try {
      // Fetch all Terms from the database
      const terms = await ManageTerms.findOne();
      respond(res, { terms });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  CreateFAQ: async (req, res, next) => {
    try {
      // Create a new FAQ
      const { title, description } = req.body;
      const newFAQ = await ManageFAQS.findOneAndUpdate({ title, description });
      respond(res, { newFAQ });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  CreateTerm: async (req, res, next) => {
    try {
      // Create a new Term
      const { title, description } = req.body;
      const newTerm = await ManageTerms.findOneAndUpdate({ title, description });
      respond(res, { newTerm });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Add Update and Delete controllers as needed

};

module.exports = ManageStaticContent;
