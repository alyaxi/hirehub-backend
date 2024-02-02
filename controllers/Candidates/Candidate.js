
const CandidateProfile = require("../../models/Candidate/Candidate");
const respond = require("../../utilis/responseHelper");

const ManageCandidateProfile = {
    async getCandidate(req, res, next) {
        try {
            let candidateId = req.user.id;

            console.log(candidateId);
            if (!candidateId) throw new Error('Invalid Candidate');
            // Get the user from database
            const candidate = await CandidateProfile.findOne({ userId: candidateId }).populate({ path: "userId", select: "-password" });
            if (candidate == null || !candidate) {

                return respond(res, "No data found", 404);
            }


            return respond(res, { candidate });
            // res.status(200).json({ employers });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async updateCandidateInfo(req, res, next) {
        try {
            const candidateId = req.user.id;

            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });

            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }

            const updatedUserData = { ...existingUserData.toObject(), ...req.body };

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                updatedUserData,
                { new: true } 
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }

            return respond(res, { updatedProfile, msg: "Information has been updated" });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
}

    module.exports = ManageCandidateProfile;
