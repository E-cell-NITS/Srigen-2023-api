enum EventId {
  PITCHPLEASE = "Pitch Please",
  SELLIT = "Sell It",
  SPEAKERSESSION = "Speaker Session",
}

type EventDetails = {
  isTeamEvent: boolean;
  minTeamMembers?: number;
  maxTeamMembers?: number;
  eventType: "competition" | "speaker";
  posterImage: string;
  endRegistration: Date;
};

type eventInfo = { [key in EventId]: EventDetails };

const eventInfo: eventInfo = {
  [EventId.PITCHPLEASE]: {
    isTeamEvent: true,
    minTeamMembers: 1,
    maxTeamMembers: 4,
    eventType: "competition",
    posterImage: "pic.png",
    /* 11PM 31 March 2023 */
    endRegistration: new Date(2023, 3, 31, 22),
  },
  [EventId.SELLIT]: {
    isTeamEvent: true,
    minTeamMembers: 1,
    maxTeamMembers: 4,
    eventType: "competition",
    posterImage: "pic.png",
    /* 11PM 31 March 2023 */
    endRegistration: new Date(2023, 3, 31, 22),
  },
  [EventId.SPEAKERSESSION]: {
    isTeamEvent: false,
    eventType: "speaker",
    posterImage: "pic.png",
    /* 11PM 31 March 2023 */
    endRegistration: new Date(2023, 3, 31, 22),
  },
};

export { eventInfo, EventId };
