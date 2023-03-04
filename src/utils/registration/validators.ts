import { body } from "express-validator";
import * as Utils from "../../utils";
import { GENDER } from "@prisma/client";

const REGISTER_VALIDATORS = [
  body("teamName").optional().isString().trim(),
  body("eventName").isString().trim(),
  body("members").isArray().isLength({ min: 1 }),
  body("members.*.name").isString().notEmpty().trim(),
  body("members.*.email").isString().notEmpty().isEmail().normalizeEmail(),
  body("members.*.phoneno").isString().notEmpty().isMobilePhone("en-IN"),
  body("members.*.gender").isIn([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]),
  body("eventName").custom(async (eventName) => {
    if (
      !Object.values<string>(Utils.Registration.EventId).includes(eventName)
    ) {
      throw new Error(`${eventName} event does not exist`);
    }
  }),
  body("eventName").custom(async (eventName: Utils.Registration.EventId) => {
    const currentDate = Date.now();
    const endRegistration =
      Utils.Registration.eventInfo[eventName].endRegistration.getTime();
    if (currentDate > endRegistration) {
      throw new Error(`Registration Closed for ${eventName}`);
    }
  }),
];

export { REGISTER_VALIDATORS };
