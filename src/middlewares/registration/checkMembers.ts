import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const checkMembers: Interfaces.Middlewares.Async = async (req, _res, next) => {
  const { eventName, members } = req.body;

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
      return next(
        Utils.Response.error("Invalid Team size for this event", 400)
      );
    }
    return next();
  }

  if (
    maxMembers &&
    minMembers &&
    members.length <= maxMembers &&
    members.length >= minMembers
  ) {
    return next();
  }
  return next(Utils.Response.error("Invalid Team size for this event", 400));
};

export default checkMembers;
