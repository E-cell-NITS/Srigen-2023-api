import { validationResult } from "express-validator";
import * as Interfaces from "../interfaces";
import * as Utils from "../utils";

const validate: Interfaces.Middlewares.Async = async (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = Utils.Response.error(
      errors.array()[0].msg + ": " + errors.array()[0].param,
      400
    );
    return next(errorResponse);
  }
  return next();
};

export { validate };
