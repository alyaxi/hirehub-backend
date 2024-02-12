
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
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")
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
            const profilePicture = req?.files && req.files["profilePicture"] && req.files['profilePicture'][0]
                ? `${link}/${req.files['profilePicture'][0].originalname}`
                : '';

            console.log({ profilePicture })

            const introVideo = req?.files && req.files["introVideo"] && req.files['introVideo'][0]
                ? `${req?.protocol}://${req?.get("host")}/${req?.files['introVideo'][0]?.originalname}`
                : '';

            const projectImage = req?.files && req.files["projectImage"] && req.files['projectImage'][0]
                ? `${req?.protocol}://${req?.get("host")}/${req?.files['projectImage'][0]?.originalname}`
                : '';

            // console.log({ profilePicture, projectImage, file: req.files })
            // console.log({ projectsData: req.body.projectsData })


            // Find existing user data
            // console.log({ projectImage })
            console.log(req.body, "bodyyyyyyyy")
            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });
            // console.log(existingUserData, "existingUserData")

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
                projectsData: req?.body?.projectsData?.map(project => ({
                    ...existingUserData.projectsData,
                    ...project,
                    // projectImage: projectImage 
                })),
                jobPreference:req?.body

                // projectsData: req.body.projectsData

                // projectsData: {projectImage, ...req?.body?.projectsData, }

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

            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async addProjects(req, res, next) {
        try {
            const candidateId = req.user.id;
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")
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

            const projectImage = req?.files && req.files["projectImage"] && req.files['projectImage'][0]
                ? `${req?.protocol}://${req?.get("host")}/${req?.files['projectImage'][0]?.originalname}`
                : '';

            console.log({ projectImage, file: req.files })
            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });


            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }


            // const updatedUserData = {

            //     projectsData: {
            //         ...req?.body?.projectsData[0],
            //         projectImage: projectImage
            //     }
            // }
            console.log({ updatedUserData: req?.body?.projectsData })

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                { projectsData: req?.body?.projectsData },
                { new: true }
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }
            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async addExperiennce(req, res, next) {
        try {
            const candidateId = req.user.id;
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")

            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });

            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }

            const experiencesData = {
                ...req?.body?.experiencesData,
            }

            console.log(experiencesData, "bodyyyy")

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                { $push: { experiencesData: experiencesData } },
                { new: true }
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }
            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async addEducation(req, res, next) {
        try {
            const candidateId = req.user.id;
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")

            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });

            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }

            // const updatedUserData = {

            //     educationsData: {
            //         ...req?.body?.educationsData,
            //     }
            // }

            const educationsData = {
                ...req?.body?.educationsData,
            }

            // console.log({ updatedUserData })
            console.log(educationsData, "bodyyyy")

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                { $push: { educationsData: educationsData } },
                { new: true }
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }
            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async addSkills(req, res, next) {
        try {
            const candidateId = req.user.id;
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")

            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });


            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }



            const updatedUserData = {

                skillsData: {
                    ...req?.body?.skillsData,
                }
            }
            console.log({ updatedUserData })

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                { $push: { skillsData: req?.body?.skillsData } },
                { new: true }
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }
            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async addlanguage(req, res, next) {
        try {
            const candidateId = req.user.id;
            // console.log(JSON.parse(JSON.stringify(req.body)), "bodyyyyyyyy")

            let existingUserData = await CandidateProfile.findOne({ userId: candidateId });


            if (!existingUserData) {
                return respond(res, { error: "Candidate profile not found" }, 404);
            }



            const updatedUserData = {

                languagesData: {
                    ...req?.body?.languagesData,
                }
            }

            console.log({ updatedUserData })

            const updatedProfile = await CandidateProfile.findOneAndUpdate(
                { userId: candidateId },
                { $push: { languagesData: req?.body?.languagesData } },
                { new: true }
            );

            if (!updatedProfile) {
                return respond(res, { error: "Failed to update candidate profile" }, 500);
            }
            return respond(res, { candidate: updatedProfile, msg: "Information has been updated" });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },

}

module.exports = ManageCandidateProfile;
