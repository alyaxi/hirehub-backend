const CandidateProfile = require("../../models/Candidate/Candidate");
const Employer = require("../../models/Employer/Employer");
const Payment = require("../../models/Payment/Payment");
const User = require("../../models/User/Users");
const respond = require("../../utilis/responseHelper");

const ManageEmployerController = {
  getAllEmployersWithPayments: async (req, res, next) => {
    console.log(req.user);
    try {
      const Employers = await Employer.find()
        .populate({
          path: "userId payments",
          select: "-password", // Exclude the password field
        })
        .exec();

      if (!Employers) {
        return respond(res,{ error: "Employers not found" },404);
      }

      // Extracting employers from payments
      const employers = Employers.map((employee) => employee);

      respond(res, { employers });

      // res.json({ employers });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  },
  changeStatusEmployer: async (req, res, next) => {
    try {
      const {  status, isVerified } = req.body;
      const { id } = req.query;

      console.log(status, "statussssss")
      console.log(isVerified, "statussssss")
      if(!status =="undefined" || !isVerified =="undefined") return  respond(res, { error: "value could not be updated" }, 400);
      

      const updateFields = {};
      if (status) {
        updateFields.accountStatus = status;
      }
      if (isVerified) {
        updateFields.isVerified = isVerified;
      }
      const employer = await Employer.findOneAndUpdate(
        { _id: id },
        { $set: updateFields },
        { new: true }
      );

      // if (!employer) {
      //   return res.status(404).json({ error: "Employer not found" });
      // }
      if (!employer) return respond(res, { error: "Employer not found" }, 404);

      respond(res, { msg: "Employer status has been changed" }, 200);
      // res.status(200).json({ message: "Employer status changed" });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  },
  deleteEmployerByID: async (req, res, next) => {
    console.log(req.user);
    try {
      const { employerId, isDeleted } = req.body;
      const employer = await Employer.findOneAndUpdate(
        { userId: employerId },
        { $set: { isDeleted: isDeleted } },
        { new: true }
      );

      // if (!employer) {
      //   return res.status(404).json({ error: "Employer not found" });
      // }
      if (!employer) return respond(res, { error: "Employer not found" }, 404);

      respond(res, { msg: "Employer status has been deleted" });
      // res.status(200).json({ message: "Employer deleted" });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  },

  ViewEmployerById: async (req, res, next) => {
    console.log(req.user);
    try {
      const { id } = req.query;
      const employer = await Employer.findOne({ _id: id }).populate({
        path: "userId payments",
        select: "-password", // Exclude the password field
      })
      .exec();

      // if (!employer) {
      //   return res.status(404).json({ error: "Employer not found" });
      // }
      if (!employer) return respond(res, { error: "Employer not found" }, 404);

      console.log(employer, "employererere");

      respond(res, { employer });

      // res.status(200).json({ employer });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  },
};

module.exports = ManageEmployerController;
