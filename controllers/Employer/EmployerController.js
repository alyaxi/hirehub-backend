const Employer = require("../../models/Employer/Employer");
const {
  updateEmployerInformationValidator,
} = require("../../utilis/BodyValidator");
const respond = require("../../utilis/responseHelper");

const ManageEmployerProfile = {
  async GetEmployerById(req, res, next) {
    try {
      let employerId = req.user.id;
      let employer = await Employer.findOne({ userId: employerId })
        .populate({
          path: "userId",
          select: "-password ", // Exclude the 'password' field
        })
        .populate("payments");
      // if (!employer) return res.status(401).send("No user found");
      if (!employer) return respond(res, { error: "No user found" }, 404);

      console.log(employer);
      return respond(res, { employer });
      // res.status(200).json({ employer });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async updateEmployerInformation(req, res, next) {
    try {
      const protocol = req.protocol;
      const host = req.get('host');

      let link;

      if (host === 'localhost:4000' && protocol === 'http') {
        link = 'http://localhost:4000';
      } else if (host === '167.99.148.81' && protocol === 'http') {
        link = 'http://167.99.148.81/server';
      } else {
        // Default link if conditions are not met
        link = 'default-link';
      }
      let employerId = req.user.id;
      // await updateEmployerInformationValidator(req,res,next);
      let { companyName, noOfEmployes, phoneNo, companyIndustry, description } = req.body;
      console.log(req.files, "filesssssssssss")
      const logoFile = req.files["logo"] ? `${link}/${req.files['logo'][0].originalname}` : "";
      const welcomeVideoFile = req.files["welcomeVideo"] ? `${req?.protocol}://${req?.get("host")}/${req?.files['welcomeVideo'][0]?.originalname}` : ""
      const updatedUserData = {
        companyName,
        noOfEmployes,
        phoneNo,
        companyIndustry,
        description,
        logo: logoFile,
        welcomeVideo: welcomeVideoFile
      }
      console.log({ updatedUserData });
      let employerFind = await Employer.findOne({
        userId: employerId,
      }).select("-password");
      // if (!employer) return res.status(401).send("No user found");
      if (!employerFind) return respond(res, { error: "No user found" }, 404);
      const employer = await Employer.findOneAndUpdate(
        { userId: employerId },
        { $set: updatedUserData },
        { new: true }
      ).select("-password");
      console.log({ employer });
      return respond(res, { employer, msg: "Information has been updated" });

      // res.status(200).json({ employer });
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = ManageEmployerProfile;
