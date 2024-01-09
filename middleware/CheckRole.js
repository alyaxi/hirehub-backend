const respond = require("../utilis/responseHelper");

// checkRole.js
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      // Check if the request body contains properties that are not allowed for the current role
      if (
        (allowedRoles.includes("employer") ||
          allowedRoles.includes("candidate")) &&
        (req.body.isVerified || req.body.accountStatus)
      ) {
        return respond(
          res,
          {
            error: `Update of "isVerified" and "accountStatus" is not allowed`,
          },
          402
        );
      }
      next();
    } else {
      return respond(
        res,
        { error: `You are not authorized to perform this action` },
        401
      );
    }
  };
};

module.exports = checkRole;
