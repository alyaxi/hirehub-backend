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

const jobPostingValidator = [
  body('position').notEmpty().withMessage('Position is required'),
  body('noOfOpening').isNumeric().withMessage('Number of openings must be a number'),
  body('expirationDate').isISO8601().withMessage('Invalid expiration date format'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('package').optional().isNumeric().withMessage('Package must be a number'),
  body('location').optional().isString().withMessage('Location must be a string'),
  body('jobStatus').optional().isIn(['open', 'closed', 'republished']).withMessage('Invalid job status'),
  body('jobType').optional().isIn(['fullTime', 'partTime', 'temporary', 'contract', 'internship', 'commission', 'newGrad']).withMessage('Invalid job type'),
  body('JobShift').optional().isIn(['morning', 'daytime', 'evening', 'night', 'flexible', 'remote', 'on-call', 'rotational', 'other']).withMessage('Invalid JobShift'),
  body('careerLevel').optional().isIn(['entry', 'mid', 'senior', 'executive']).withMessage('Invalid career level'),
  body('minimumQualification').optional().isString().withMessage('Minimum qualification must be a string'),
  body('noOfHiring').optional().isNumeric().withMessage('Number of hiring must be a number'),
  body('payRange.min').optional().isNumeric().withMessage('Minimum pay must be a number'),
  body('payRange.max').optional().isNumeric().withMessage('Maximum pay must be a number'),
  body('payRange.hourlyRate').optional().isNumeric().withMessage('Hourly rate must be a number'),
  body('companyOverview').optional().isString().withMessage('Company overview must be a string'),
  body('coreValues').optional().isString().withMessage('Core values must be a string'),
  body('jobDescription').optional().isString().withMessage('Job description must be a string'),
  body('jdFile').optional().isString().withMessage('JD file must be a string'),
  body('impactOfPosition').optional().isString().withMessage('Impact of position must be a string'),
  body('responsibilities').optional().isString().withMessage('Responsibilities must be a string'),
  body('positionGrowth').optional().isString().withMessage('Position growth must be a string'),
  body('competencies').optional().isString().withMessage('Competencies must be a string'),
  body('requirements').optional().isString().withMessage('Requirements must be a string'),
  body('kpis').optional().isString().withMessage('KPIs must be a string'),
  body('benefits').optional().isString().withMessage('Benefits must be a string'),
  body('postedDate').optional().isISO8601().withMessage('Invalid posted date format'),
  body('AppliedBefore').optional().isISO8601().withMessage('Invalid AppliedBefore date format'),
  body('industry').optional().isString().withMessage('Industry must be a string'),
  body('gender').optional().isIn(['Male', 'Female', 'No Preference']).withMessage('Invalid gender'),
  body('experience').optional().isNumeric().withMessage('Experience must be a number'),
  body('department').optional().isString().withMessage('Department must be a string'),
  body('jobMode').optional().isIn(['onsite', 'remote', 'hybrid']).withMessage('Invalid job mode'),

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





module.exports = { updateEmployerInformationValidator, validateAppliedJob, resetPasswordValidator, deleteJobValidator, jobPostingValidator, updateJobStatusValidator, createCandidateProfileValidator };
