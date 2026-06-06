import { Request, Response, Router } from "express";
import {
  CUSTOM_EVENT,
  EVENT_AREAS,
  EventType,
  getEventTypeByTitle,
  isValidEventType,
} from "../config/eventConfig";
import { Event } from "../models/event";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, area, eventType } = req.body as {
      title?: string;
      area?: string;
      eventType?: string;
    };

    if (!title || !area) {
      return res.status(400).json({ message: "Title and area are required." });
    }

    if (!EVENT_AREAS.includes(area as any)) {
      return res.status(400).json({ message: "Invalid event area." });
    }

    const resolvedEventType = isValidEventType(eventType)
      ? (eventType as EventType)
      : (getEventTypeByTitle(title) ?? CUSTOM_EVENT);

    const event = new Event({
      title,
      area: area as (typeof EVENT_AREAS)[number],
      eventType: resolvedEventType,
      completedAt: new Date(),
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Failed to create Event:", error);
    res.status(500).json({ message: "Unable to create event." });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ completedAt: -1 }).lean();
    res.json(events);
  } catch (error) {
    console.error("Failed to fetch Events:", error);
    res.status(500).json({ message: "Unable to fetch events." });
  }
});

export { router as eventsRouter };
