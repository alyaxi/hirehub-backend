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
    .isIn(['open', 'closed', 'republished'])
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

const createCandidateProfileValidator = [
  // User ID validation


  // Personal Information validation
  body('personalInformation')
    .isObject()
    .withMessage('Personal Information should be an object'),

  body('personalInformation.avatar').optional().isString().withMessage('Avatar should be a string'),
  body('personalInformation.name').optional().isString().withMessage('Name should be a string'),
  body('personalInformation.lastName').optional().isString().withMessage('Last Name should be a string'),
  body('personalInformation.email').optional().isEmail().withMessage('Invalid email address'),
  body('personalInformation.mobile').optional().isString().withMessage('Mobile should be a string'),
  body('personalInformation.dateOfBirth').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('personalInformation.gender').optional().isString().withMessage('Gender should be a string'),
  body('personalInformation.nationality').optional().isString().withMessage('Nationality should be a string'),
  body('personalInformation.city').optional().isString().withMessage('City should be a string'),
  body('personalInformation.area').optional().isString().withMessage('Area should be a string'),
  body('personalInformation.careerLevel').optional().isString().withMessage('Career Level should be a string'),
  body('personalInformation.experience').optional().isString().withMessage('Experience should be a string'),
  body('personalInformation.expectedSalary').optional().isNumeric().withMessage('Expected Salary should be a number'),
  body('personalInformation.zipCode').optional().isString().withMessage('Zip Code should be a string'),
  body('personalInformation.accountStatus').optional().isString().withMessage('Account Status should be a string'),
  body('personalInformation.isVerified').optional().isBoolean().withMessage('Is Verified should be a boolean'),
  body('personalInformation.isDeleted').optional().isBoolean().withMessage('Is Deleted should be a boolean'),

  // Summary validation
  body('summary')
    .isObject()
    .withMessage('Summary should be an object'),

  body('summary.description').optional().isString().withMessage('Summary description should be a string'),
  body('summary.isDeleted').optional().isBoolean().withMessage('Summary Is Deleted should be a boolean'),

  // Projects validation
  body('projects')
    .isArray()
    .withMessage('Projects should be an array'),

  body('projects')
    .isArray()
    .withMessage('Projects should be an array'),

  // Experience validation
  body('experience')
    .isArray()
    .withMessage('Experience should be an array')
    .optional(),

  // Education validation
  body('education')
    .isArray()
    .withMessage('Education should be an array')
    .optional(),

  // Skills validation
  body('skills')
    .isArray()
    .withMessage('Skills should be an array')
    .optional(),

  // Languages validation
  body('languages')
    .isArray()
    .withMessage('Languages should be an array')
    .optional(),

  // JobPreference validation
  body('jobPreference')
    .isObject()
    .withMessage('JobPreference should be an object')
    .optional(),

  body('jobPreference.desiredJobTitle').optional().isArray().withMessage('Desired Job Title should be a string'),
  body('jobPreference.desiredSalary').optional().isNumeric().withMessage('Desired Salary should be a number'),
  body('jobPreference.skills').optional().isArray().withMessage('Skills should be an array'),
  body('jobPreference.relocation')
    .isObject()
    .withMessage('Relocation should be an object')
    .optional(),

  body('jobPreference.relocation.anywhere').optional().isBoolean().withMessage('Relocation Anywhere should be a boolean'),
  body('jobPreference.relocation.onlyNearMe.locations')
    .isArray()
    .withMessage('Relocation Only Near Me Locations should be an array'),

  // ResumePrivacySetting validation
  body('resumePrivacySetting')
    .isString()
    .withMessage('Resume Privacy Setting should be a string')
    .optional()
    .isIn(['Private', 'Public'])
    .withMessage('Invalid Resume Privacy Setting'),


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







module.exports = {validateJobPosting, updateEmployerInformationValidator, validateAppliedJob, resetPasswordValidator, deleteJobValidator, updateJobStatusValidator, createCandidateProfileValidator };
