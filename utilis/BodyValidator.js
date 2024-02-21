const { body, validationResult } = require("express-validator");
const respond = require("./responseHelper");



const updateEmployerInformationValidator = [
  body('companyName').optional().isString().withMessage('Company name must be a string'),
  body('noOfEmployes').optional().isString().withMessage('Number of employees must be a number'),
  // body('logo').notEmpty().withMessage('Logo must be provided'),
  // body('welcomeVideo').optional().withMessage('Welcome video must be a string'),
  body('phoneNo').optional().isNumeric().withMessage('Phone number must be a number'),
  body('companyIndustry').optional().isString().withMessage('Company industry must be string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  // Add more validations for other fields...

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  },
];

const resetPasswordValidator = [
  body('password').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .custom((value, { req }) => value !== req.body.password)
    .withMessage('New password must be different from the current password'),



  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  },
];


const updateJobStatusValidator = [
  body('jobStatus')
    .notEmpty()
    .withMessage('Job status is required')
    .isString()
    .withMessage('Job status must be a string')
    .isIn(['Open', 'Closed', 'Republished'])
    .withMessage('Invalid job status. Must be one of: open, closed, republished'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  },
];


// Body validator for soft deleting a job
const deleteJobValidator = [
  body('isDeleted')
    .notEmpty()
    .withMessage('isDeleted field is required')
    .isBoolean()
    .withMessage('isDeleted must be a boolean'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  },
];



// Validation middleware using express-validator
const validateInterview = [
  // Validate jobId
  body('jobId').isEmpty('field required').withMessage('Invalid jobId'),

  // Validate candidateId
  body('candidateId').isEmpty('field required').withMessage('Invalid candidateId'),

  // Validate scheduledBy
  body('scheduledBy').isEmpty("field required").withMessage('Invalid scheduledBy'),

  // Validate scheduledDate
  // body('scheduledDate').isISO8601().toDate().withMessage('Invalid scheduledDate'),

  // Validate location
  body('location').optional().isString().withMessage('Invalid location'),

  // Validate notes
  body('notes').optional().isString().withMessage('Invalid notes'),

  // Validate status
  body('status').optional().isIn(['Scheduled', 'Completed', 'Canceled']).withMessage('Invalid status'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const createCandidateProfileValidator = [

  body('personalInformationData').isObject().optional(),
  body('personalInformationData.profilePicture').isString().optional(),
  body('personalInformationData.careerLevel').isString().optional(),
  body('personalInformationData.city').isString().optional(),
  body('personalInformationData.country').isString().optional(),
  body('personalInformationData.dob').isString().optional(),
  body('personalInformationData.experience').isString().optional(),
  body('personalInformationData.gender').isString().optional(),
  body('personalInformationData.phoneNo').isString().optional(),
  body('personalInformationData.profileCompletion').isString().optional(),
  body('personalInformationData.state').isString().optional(),
  body('personalInformationData.statusLine').isString().optional(),
  body('personalInformationData.zipCode').isString().optional(),
  body('personalInformationData.accountStatus').isIn(["Active", "Disabled", "OnHold"]).optional(),
  body('personalInformationData.isVerified').isBoolean().optional(),
  body('personalInformationData.isDeleted').isBoolean().optional(),

  // Validation for summery object
  body('summery').isObject().optional(),
  body('summery.text').isString().optional(),
  body('summery.isDeleted').isBoolean().optional(),

  // Validation for projectsData array
  body('projectsData').isArray().optional(),
  body('projectsData.*.id').isString().optional(),
  body('projectsData.*.associated').isString().optional(),
  body('projectsData.*.currentlyInProcess').isBoolean().optional(),
  body('projectsData.*.name').isString().optional(),
  body('projectsData.*.projectUrl').isString().optional(),
  body('projectsData.*.description').isString().optional(),
  body('projectsData.*.projectImage').isString().optional(),
  body('projectsData.*.startDate').isString().optional(),
  body('projectsData.*.endDate').isString().optional(),
  body('projectsData.*.isDeleted').isBoolean().optional(),

  // Validation for experiencesData array
  body('experiencesData').isArray().optional(),
  body('experiencesData.*.id').isString().optional(),
  body('experiencesData.*.title').isString().optional(),
  body('experiencesData.*.company').isString().optional(),
  body('experiencesData.*.industry').isString().optional(),
  body('experiencesData.*.directlyManageTeam').isString().optional(),
  body('experiencesData.*.noOfPeople').isString().optional(),
  body('experiencesData.*.salary').isString().optional(),
  body('experiencesData.*.selectedCountry').isString().optional(),
  body('experiencesData.*.selectedCity').isString().optional(),
  body('experiencesData.*.startDate').isString().optional(),
  body('experiencesData.*.agreeTerms').isString().optional(),
  body('experiencesData.*.description').isString().optional(),
  body('experiencesData.*.isDeleted').isBoolean().optional(),

  // Validation for educationsData array
  body('educationsData').isArray().optional(),
  body('educationsData.*.id').isString().optional(),
  body('educationsData.*.organization').isString().optional(),
  body('educationsData.*.degree').isString().optional(),
  body('educationsData.*.fieldOfStudy').isString().optional(),
  body('educationsData.*.startDate').isString().optional(),
  body('educationsData.*.endDate').isString().optional(),
  body('educationsData.*.selectedCountry').isString().optional(),
  body('educationsData.*.grade').isString().optional(),
  body('educationsData.*.isDeleted').isBoolean().optional(),

  // Validation for skillsData array
  body('skillsData').isArray().optional(),
  body('skillsData.*.id').isString().optional(),
  body('skillsData.*.title').isString().optional(),
  body('skillsData.*.experience').isString().optional(),
  body('skillsData.*.isDeleted').isBoolean().optional(),

  // Validation for languagesData array
  body('languagesData').isArray().optional(),
  body('languagesData.*.id').isInt().optional(),
  body('languagesData.*.title').isString().optional(),
  body('languagesData.*.proficiency').isString().optional(),
  body('languagesData.*.isDeleted').isBoolean().optional(),

  // Validation for jobPreference object
  body('jobPreference').isObject().optional(),
  body('jobPreference.desiredJobTitle').isArray().optional(),
  body('jobPreference.desiredSalary').isNumeric().optional(),
  body('jobPreference.relocation').isObject().optional(),
  body('jobPreference.relocation.anywhere').isBoolean().optional(),
  body('jobPreference.relocation.onlyNearMe').isObject().optional(),
  body('jobPreference.relocation.onlyNearMe.locations').isArray().optional(),
  body('jobPreference.skills').isArray().optional(),
  body('jobPreference.onlyNearMeonlyNearMe').isString().optional(),
  body('jobPreference.isDeleted').isBoolean().optional(),

  // Validation for resume and introVideo
  body('resume').isString().optional(),
  body('introVideo').isString().optional(),

  // Validation for resumePrivacySetting object
  body('resumePrivacySetting').isString().isIn(['Private', 'Public']).optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.array() },
        400
      );
    }
    next();
  },
];


const validateAppliedJob = [
  body('applicationStatus').optional().isIn(["new", "attempted to contact", "connected", "on hold", "qualified", "unqualified", "not interested"]).withMessage('Invalid applicationStatus'),
  body('appicaionStage').optional().isIn(["new application", "screening", "hire", "selection"]).withMessage('Invalid appicaionStage'),
  body('meetAllRequirment').optional().isBoolean().withMessage('Invalid meet all requirment'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  }
];


const validateJobPosting = [
  body('positionTitle').isString().notEmpty().withMessage('Invalid positionTitle'),
  body('jobType').isString().notEmpty().withMessage('Invalid jobType'),
  body('noOfOpenings').isInt({ min: 1 }).withMessage('Invalid noOfOpenings'),
  body('expirationDate').isISO8601().toDate().withMessage('Invalid expirationDate'),
  body('jobLocation').isString().notEmpty().withMessage('Invalid jobLocation'),
  body('jdFile').optional().isString().withMessage('Invalid jdFile'),
  body('salary.type').isIn(['range', 'single']).withMessage('Invalid salary type'),
  body('aboutPosition').isString().notEmpty().withMessage('Invalid aboutPosition'),
  body('benefits.*').isString().optional().withMessage('Invalid benefit'),
  body('qualification').isString().notEmpty().withMessage('Invalid qualification'),
  body('responsibilities').isString().notEmpty().withMessage('Invalid responsibilities'),
  body('skills').isString().notEmpty().withMessage('Invalid skills'),
  body('industry').isString().notEmpty().withMessage('Invalid industry'),
  body('JobShift').optional().isString().withMessage('Invalid JobShift'),
  body('department').isString().notEmpty().withMessage('Invalid department'),
  body('gender').isString().notEmpty().withMessage('Invalid gender'),
  body('minimumEducation').isString().notEmpty().withMessage('Invalid minimumEducation'),
  body('careerLevel').isString().notEmpty().withMessage('Invalid careerLevel'),
  body('experience').isString().notEmpty().withMessage('Invalid experience'),
  body('jobMode').optional().isString().withMessage('Invalid jobMode'),
  body('isDeleted').optional().isBoolean().withMessage('Invalid isDeleted'),
  body('careerLevel').optional().isString().withMessage('Invalid careerLevel'),
  body('jobStatus').optional().isIn(['Open', 'Closed', 'Republished']).withMessage('Invalid jobStatus'),
  body('candidateId').optional().isMongoId().withMessage('Invalid candidateId'),
  body('applicationCount').optional().isInt({ min: 0 }).withMessage('Invalid applicationCount'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(
        res,
        { msg: 'Validation error', error: errors.errors[0].msg },
        400
      );
    }
    next();
  },
];







module.exports = {validateInterview, validateJobPosting, updateEmployerInformationValidator, validateAppliedJob, resetPasswordValidator, deleteJobValidator, updateJobStatusValidator, createCandidateProfileValidator };
