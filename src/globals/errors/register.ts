import * as Utils from "../../utils";

const teamNameTaken = Utils.Response.error(
  "Team name is taken for this event",
  406
);

const emailAlreadyRegistered = Utils.Response.error(
  "Email is already registered for this event",
  406
);

const invalidEventName = Utils.Response.error("Invalid Event Name", 400);

const registrationClosed = Utils.Response.error(
  "Registration closed for this event",
  405
);

const invalidTeamSize = Utils.Response.error(
  "Invalid Team size for this event",
  406
);

const teamNameRequired = Utils.Response.error("Team Name is required", 406);

export {
  teamNameTaken,
  emailAlreadyRegistered,
  invalidEventName,
  registrationClosed,
  invalidTeamSize,
  teamNameRequired,
};
