import cron from "node-cron";
import { io } from "../app.js";
import { Event } from "../models/eventSchema.js";

export const scheduledTasks = new Map();

export function scheduleEvent(event) {
  const { _id, startTime, endTime } = event;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const notifyDate = new Date(startDate.getTime() - 10 * 1000);

  const notifyJob = cron.schedule(dateToCron(notifyDate), () => {
    console.log("🔔 Emitting notify event");
    io.emit("notify", {
      message: `Event is starting in 10 seconds`,
      eventId: _id,
    });
  });

  const startJobFn = async () => {
    console.log("🔔 Emitting event start");
    await Event.updateOne({ _id }, { isActive: true });
    io.emit("event-start", {
      eventId: _id,
      message: `Event started`,
      data: event,
    });
  };

  const startJob = cron.schedule(dateToCron(startDate), startJobFn);

  const now = new Date();
  if (now >= startDate && now < endDate) {
    console.log("⚡ Event is already ongoing, triggering start manually...");
    startJob.stop();
    notifyJob.stop();
    startJobFn();
  } else {
    startJob.start();
    notifyJob.start();
  }

  const endJob = cron.schedule(dateToCron(endDate), async () => {
    console.log("🔔 Emitting event end");
    const data = await Event.updateOne({ _id }, { isActive: false });
    io.emit("event-end", { eventId: _id, message: `Event ended` });
  });

  scheduledTasks.set(_id.toString(), { notifyJob, startJob, endJob });
}

function dateToCron(date) {
  const min = date.getMinutes();
  const hr = date.getHours();
  const day = date.getDate();
  const mon = date.getMonth() + 1;
  const dow = "*";
  return `${min} ${hr} ${day} ${mon} ${dow}`;
}
