import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";
import * as Utils from "src/utils";

const router = express.Router();

router.post(
  "/",
  Utils.Registration.REGISTER_VALIDATORS,
  Middlewares.Validator.validate,
  Middlewares.Registration.checkMembers,
  Middlewares.Registration.checkIsTeamEvent,
  Controllers.Registration.create
);

export default router;
