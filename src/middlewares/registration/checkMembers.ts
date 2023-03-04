import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Utils from "../../utils";

const checkMembers: Interfaces.Middlewares.Async = async (req, _res, next) => {
  const { eventName, members, teamName } = req.body;

  const isteamEvent =
    Utils.Registration.eventInfo[eventName as Utils.Registration.EventId]
      .isTeamEvent;
  const minMembers =
    Utils.Registration.eventInfo[eventName as Utils.Registration.EventId]
      .minTeamMembers;
  const maxMembers =
    Utils.Registration.eventInfo[eventName as Utils.Registration.EventId]
      .maxTeamMembers;

  /* For solo events, set teamName to null and make check if members array length is 1 */
  if (!isteamEvent) {
    /* If solo event, set teamName to null */
    req.body.teamName = null;
    /* Solo Event can have exactly 1 member */
    if (members.length !== 1) {
      return next(Errors.Register.invalidTeamSize);
    }
    return next();
  }

  if (isteamEvent && !teamName) {
    return next(Errors.Register.teamNameRequired);
  }

  if (
    maxMembers &&
    minMembers &&
    members.length <= maxMembers &&
    members.length >= minMembers
  ) {
    return next();
  }
  return next(Errors.Register.invalidTeamSize);
};

export default checkMembers;
