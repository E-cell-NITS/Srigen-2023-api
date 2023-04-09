import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Errors from "../../globals/errors";
import prisma from "../../utils/prisma";

const get: Interfaces.Controllers.Async = async (req, res, next) => {
  const event = req.query.event as string;
  if (!Object.values<string>(Utils.Registration.EventId).includes(event)) {
    return next(Errors.Register.invalidEventName);
  }
  const eventInfo =
    Utils.Registration.eventInfo[event as Utils.Registration.EventId];
  let csv = "";
  if (eventInfo.isTeamEvent && eventInfo.maxTeamMembers) {
    csv += "Team Name,";
    for (let i = 1; i <= eventInfo.maxTeamMembers; i++) {
      csv += "Member " + i + " Name,";
      csv += "Member " + i + " Email,";
      csv += "Member " + i + " Gender,";
      csv += "Member " + i + " Phno,";
    }
    csv += "\n";
  } else {
    csv += "Name,";
    csv += "Email,";
    csv += "Gender,";
    csv += "Phno,";
    csv += "\n";
  }

  const resp = await prisma.registration.findMany({
    where: {
      eventName: event,
    },
    select: {
      teamName: true,
      TeamMembers: {
        select: {
          name: true,
          email: true,
          gender: true,
          phoneno: true,
        },
      },
    },
  });
  for (const entry of resp) {
    if (eventInfo.isTeamEvent) {
      csv += entry.teamName + ",";
    }
    for (const memberinfo of entry.TeamMembers) {
      csv += '"' + memberinfo.name + '"' + ",";
      csv += '"' + memberinfo.email + '"' + ",";
      csv += '"' + memberinfo.gender + '"' + ",";
      csv += '"' + memberinfo.phoneno + '"' + ",";
    }
    csv += "\n";
  }
  if (req.query.download === "true") {
    const buffer = Buffer.from(csv, "utf-8");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${event}.csv`);
    res.setHeader("Content-Length", buffer.length);
    res.write(buffer);
    return res.end();
  }
  return res.json(Utils.Response.success(csv));
};

export { get };
