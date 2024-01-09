const {Request, Response, NextFunction}  =  require("express");
const respond = require("../utilis/responseHelper");
// const {CustomError } =  require("../../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err ) {
    return res.status(err.statusCode).send({
      status: false,
      message: err?.message,
      data: null,
    });
  }
  return respond(
    res,
    {
      error: `Something went wrong`,
    },
    404
  );
};

module.exports = errorHandler