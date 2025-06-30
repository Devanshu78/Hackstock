import { Event } from "../../models/eventSchema.js";
import eventValidator from "../../Validator/event-validator.js";
import { scheduleEvent } from "../../utils/cronService.js";

const option = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
};

const eventCleanUp = async () => {
  try {
    const now = new Date();
    const events = await Event.find();

    events.map(async (event) =>
      event.endTime < now && event.isActive == "true"
        ? await Event.updateOne({ _id: event._id }, { isActive: false })
        : null
    );
  } catch (error) {
    console.log("cleaup error :: ", error.message);
    return error.message;
  }
};

export const initializeScheduledEvents = async () => {
  try {
    const now = new Date();
    eventCleanUp();

    const upcomingEvent = await Event.findOne({
      $or: [
        { startTime: { $gte: now } },
        {
          startTime: { $lte: now },
          endTime: { $gte: now },
        },
      ],
    }).sort({ eventDate: 1, startTime: 1 });
    if (!upcomingEvent) {
      console.log("No upcoming events found");
      return;
    }
    console.log("Scheduling event:", upcomingEvent._id);
    scheduleEvent(upcomingEvent);
  } catch (err) {
    console.log("controller error", err.message);
    return;
  }
};

export const createEvent = async (req, res) => {
  try {
    const { data, error } = eventValidator.safeParse(req.body);
    if (error) {
      console.log(error.errors[0].message);
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }
    const { eventDate, startTime, endTime } = data;
    const fullStart = new Date(`${eventDate}T${startTime}`);
    const fullEnd = new Date(`${eventDate}T${endTime}`);

    const event = await Event.create({
      eventDate,
      startTime: fullStart,
      endTime: fullEnd,
    });
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Failed to create event",
      });
    }
    scheduleEvent(event);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: {
        ...event._doc,
        eventDate: event.eventDate.toLocaleDateString("en-IN"),
        startTime: event.startTime.toLocaleTimeString("en-IN", option),
        endTime: event.endTime.toLocaleTimeString("en-IN", option),
      },
    });
  } catch (error) {
    if (error?.keyPattern?.eventDate) {
      return res.status(400).json({
        success: false,
        message: "Event date already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEvent = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find().sort({ eventDate: -1, startTime: 1 });
    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active events found",
      });
    }

    const formattedEvent = events.map((event) => {
      const eventDate = event.eventDate.toLocaleDateString("en-IN");
      const startTime = event.startTime.toLocaleTimeString("en-IN", option);
      const endTime = event.endTime.toLocaleTimeString("en-IN", option);
      return {
        ...event._doc,
        eventDate,
        startTime,
        endTime,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const eventForUser = async (req, res) => {
  try {
    const event = await Event.findOne({
      $or: [
        { startTime: { $gte: new Date() } },
        {
          startTime: { $lte: new Date() },
          endTime: { $gte: new Date() },
        },
      ],
    });
    if (!event) {
      return res.status(404).json({ message: "No active events found" });
    }

    const formattedEvent = {
      ...event._doc,
      eventDate: event.eventDate.toLocaleDateString("en-IN"),
      startTime: event.startTime.toLocaleTimeString("en-IN", option),
      endTime: event.endTime.toLocaleTimeString("en-IN", option),
    };

    return res.status(200).json({ data: formattedEvent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
