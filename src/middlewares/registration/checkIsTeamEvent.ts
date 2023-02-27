import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const checkIsTeamEvent: Interfaces.Middlewares.Async = async (
  req,
  _res,
  next
) => {
  const { eventName, members } = req.body;
  const isTeamEvent =
    Utils.Registration.eventInfo[eventName as Utils.Registration.EventId]
      .isTeamEvent;
  if (!isTeamEvent && members.length > 1) {
    return next(Utils.Response.error("Invalid Team size for this event", 400));
  }

  return next();
};

export default checkIsTeamEvent;
