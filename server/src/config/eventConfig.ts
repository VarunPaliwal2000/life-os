export const EVENT_AREAS = [
  "Health",
  "Content",
  "Music",
  "Career",
  "Finance",
  "Personal Growth",
] as const;

export type EventArea = (typeof EVENT_AREAS)[number];

const healthEventTypes = [
  "GYM_COMPLETED",
  "DIET_FOLLOWED",
  "WATER_TARGET_HIT",
] as const;
const careerEventTypes = [
  "DSA_PROGRESS",
  "JS_PROGRESS",
  "PROJECT_PROGRESS",
] as const;
const musicEventTypes = ["SONG_WRITING", "RECORDING_SESSION"] as const;
const contentEventTypes = ["CONTENT_READY"] as const;
const customEventTypes = ["CUSTOM_EVENT"] as const;

export const EVENT_TYPE_CATEGORIES = {
  Health: healthEventTypes,
  Career: careerEventTypes,
  Music: musicEventTypes,
  Content: contentEventTypes,
} as const;

export const EVENT_TYPE_VALUES = [
  ...healthEventTypes,
  ...careerEventTypes,
  ...musicEventTypes,
  ...contentEventTypes,
  ...customEventTypes,
] as const;

export type EventType = (typeof EVENT_TYPE_VALUES)[number];

export const EVENT_TYPE_TITLE_MAP = {
  GYM_COMPLETED: "Gym Completed",
  DIET_FOLLOWED: "Diet Followed",
  WATER_TARGET_HIT: "Water Target Hit",
  DSA_PROGRESS: "DSA Completed",
  JS_PROGRESS: "JS Learning Completed",
  PROJECT_PROGRESS: "Project Progress",
  SONG_WRITING: "Song Writing Progressed",
  RECORDING_SESSION: "Recording Session",
  CONTENT_READY: "Next Day Content Ready",
  CUSTOM_EVENT: "Custom Event",
} as const;

export const SUCCESS_RULES = {
  Content: ["CONTENT_READY"] as const,
  Music: ["SONG_WRITING", "RECORDING_SESSION"] as const,
  Health: ["GYM_COMPLETED", "DIET_FOLLOWED", "WATER_TARGET_HIT"] as const,
  Career: ["DSA_PROGRESS", "JS_PROGRESS", "PROJECT_PROGRESS"] as const,
} as const;

export const QUICK_ADD_EVENTS = [
  { eventType: "GYM_COMPLETED", title: "Gym Completed", area: "Health" },
  { eventType: "DIET_FOLLOWED", title: "Diet Followed", area: "Health" },
  { eventType: "WATER_TARGET_HIT", title: "Water Target Hit", area: "Health" },
  { eventType: "DSA_PROGRESS", title: "DSA Completed", area: "Career" },
  { eventType: "JS_PROGRESS", title: "JS Learning Completed", area: "Career" },
  { eventType: "PROJECT_PROGRESS", title: "Project Progress", area: "Career" },
  {
    eventType: "SONG_WRITING",
    title: "Song Writing Progressed",
    area: "Music",
  },
  { eventType: "RECORDING_SESSION", title: "Recording Session", area: "Music" },
  {
    eventType: "CONTENT_READY",
    title: "Next Day Content Ready",
    area: "Content",
  },
] as const;

export type QuickAddEvent = (typeof QUICK_ADD_EVENTS)[number];

export const CUSTOM_EVENT = "CUSTOM_EVENT" as const;

export function isValidEventType(value: unknown): value is EventType {
  return (
    typeof value === "string" &&
    (EVENT_TYPE_VALUES as readonly string[]).includes(value)
  );
}

export function getEventTypeByTitle(title: string): EventType | null {
  const normalized = title.trim().toLowerCase();

  for (const eventType of EVENT_TYPE_VALUES) {
    const expectedTitle = EVENT_TYPE_TITLE_MAP[eventType] as string;
    if (expectedTitle.toLowerCase() === normalized) {
      return eventType;
    }
  }

  return null;
}

export function getEventTitle(eventType: EventType): string {
  return EVENT_TYPE_TITLE_MAP[eventType] ?? "Unknown Event";
}

export function isSuccessEventType(eventType: EventType): boolean {
  return (
    SUCCESS_RULES.Content.includes(
      eventType as (typeof SUCCESS_RULES.Content)[number],
    ) ||
    SUCCESS_RULES.Music.includes(
      eventType as (typeof SUCCESS_RULES.Music)[number],
    ) ||
    SUCCESS_RULES.Health.includes(
      eventType as (typeof SUCCESS_RULES.Health)[number],
    ) ||
    SUCCESS_RULES.Career.includes(
      eventType as (typeof SUCCESS_RULES.Career)[number],
    )
  );
}
