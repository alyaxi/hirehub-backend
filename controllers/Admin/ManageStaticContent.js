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
      const { title, description } = req.body;
      // Create a new FAQ
      const existingFAQ = await ManageFAQS.findOne();
      console.log(existingFAQ, "existingFAQ")

      if (existingFAQ) {
        // If it exists, update it
        const newFAQ = await ManageFAQS.findOneAndUpdate({ title, description });
        res.json({ newFAQ });
      } else {
        // If it doesn't exist, create a new one
        const newFAQ = await ManageFAQS.create({ title, description });
        res.json({ newFAQ });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  CreateTerm: async (req, res, next) => {
    try {
      // Create a new Term
      const { title, description } = req.body;
      // Create a new FAQ
      const existingFAQ = await ManageTerms.findOne();
      console.log(existingFAQ, "existingFAQ")

      if (existingFAQ) {
        // If it exists, update it
        const newTerm = await ManageTerms.findOneAndUpdate({ title, description });
        res.json({ newTerm });
      } else {
        // If it doesn't exist, create a new one
        const newTerm = await ManageTerms.create({ title, description });
        res.json({ newTerm });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Add Update and Delete controllers as needed

};

module.exports = ManageStaticContent;
