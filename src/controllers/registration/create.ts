import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Utils from "../../utils";
import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";

const create: Interfaces.Controllers.Async = async (req, res, next) => {
  const { teamName, eventName, members } = req.body;
  for (let i = 0; i < members.length; i++) {
    members[i].eventName = eventName;
  }
  if (teamName) {
    /* If its a team event, check if a registration already exists in this event with the same teamname */
    const entryExist = await prisma.registration.findFirst({
      where: {
        teamName: teamName,
        eventName: eventName,
      },
    });
    if (entryExist) {
      return next(Errors.Register.teamNameTaken);
    }
  }

  try {
    const registration = await prisma.registration.create({
      data: {
        teamName: teamName,
        eventName: eventName,
        TeamMembers: {
          create: members,
        },
      },
    });
    if (!registration) {
      return next(Errors.System.serverError);
    }
    return res.json(Utils.Response.success(registration));
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return next(Errors.Register.emailAlreadyRegistered);
    }
    return next(error);
  }
};

export { create };
