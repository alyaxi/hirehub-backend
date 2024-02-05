
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
            console.log(req.body, "bodyyyyyyyy")
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

            // Process file uploads
            const profilePicture = req.files["profilePicture"] ? `${link}/${req.files['profilePicture'][0].originalname}` : '';
            const introVideo = req.files["introVideo"] ? `${req?.protocol}://${req?.get("host")}/${req?.files['introVideo'][0]?.originalname}` : '';
            const projectImage = req.files["projectImage"] ? `${req?.protocol}://${req?.get("host")}/${req?.files['projectImage'][0]?.originalname}` : '';

            // Find existing user data
            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });

            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }
            // Merge existing data with new data
            const updatedUserData = {
                ...existingUserData ? existingUserData.toObject() : {},
                ...req.body,
                personalInformationData: {
                    ...existingUserData?.personalInformationData ? existingUserData.personalInformationData.toObject() : {},
                    ...req.body?.personalInformationData,
                    profilePicture: profilePicture || (existingUserData?.personalInformationData?.profilePicture || ''),
                },
                introVideo: introVideo || existingUserData.introVideo,
                projectsData: req.body.projectsData?.map(project => ({
                    ...existingUserData.projectsData.id(project.id) ? existingUserData.projectsData.id(project.id).toObject() : {},
                    ...project,
                    projectImage: projectImage || existingUserData.projectsData.id(project.id)?.projectImage,
                })),

            };

            // Update candidate profile
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
    }
}

module.exports = ManageCandidateProfile;
