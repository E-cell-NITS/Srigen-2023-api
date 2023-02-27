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

  /* Check Members only if its a team event. For solo events, go to next middleware*/
  if (!isteamEvent) {
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
