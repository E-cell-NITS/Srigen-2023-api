import { body } from "express-validator";
import { GENDER } from "@prisma/client";

const REGISTER_VALIDATORS = [
  body("teamName").optional().isString().trim(),
  body("eventName").isString().trim(),
  body("members").isArray().isLength({ min: 1 }),
  body("members.*.name").isString().notEmpty().trim(),
  body("members.*.email").isString().notEmpty().isEmail().normalizeEmail(),
  body("members.*.phoneno").isString().notEmpty().isMobilePhone("en-IN"),
  body("members.*.gender").isIn([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]),
];

export { REGISTER_VALIDATORS };
