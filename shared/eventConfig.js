"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOM_EVENT = exports.QUICK_ADD_EVENTS = exports.SUCCESS_RULES = exports.EVENT_TYPE_TITLE_MAP = exports.EVENT_TYPE_VALUES = exports.EVENT_TYPE_CATEGORIES = exports.EVENT_AREAS = void 0;
exports.isValidEventType = isValidEventType;
exports.getEventTypeByTitle = getEventTypeByTitle;
exports.getEventTitle = getEventTitle;
exports.isSuccessEventType = isSuccessEventType;
exports.EVENT_AREAS = [
    "Health",
    "Content",
    "Music",
    "Career",
    "Finance",
    "Personal Growth",
];
const healthEventTypes = [
    "GYM_COMPLETED",
    "DIET_FOLLOWED",
    "WATER_TARGET_HIT",
];
const careerEventTypes = [
    "DSA_PROGRESS",
    "JS_PROGRESS",
    "PROJECT_PROGRESS",
];
const musicEventTypes = [
    "SONG_WRITING",
    "RECORDING_SESSION",
];
const contentEventTypes = ["CONTENT_READY"];
const customEventTypes = ["CUSTOM_EVENT"];
exports.EVENT_TYPE_CATEGORIES = {
    Health: healthEventTypes,
    Career: careerEventTypes,
    Music: musicEventTypes,
    Content: contentEventTypes,
};
exports.EVENT_TYPE_VALUES = [
    ...healthEventTypes,
    ...careerEventTypes,
    ...musicEventTypes,
    ...contentEventTypes,
    ...customEventTypes,
];
exports.EVENT_TYPE_TITLE_MAP = {
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
};
exports.SUCCESS_RULES = {
    Content: ["CONTENT_READY"],
    Music: ["SONG_WRITING", "RECORDING_SESSION"],
    Health: ["GYM_COMPLETED", "DIET_FOLLOWED", "WATER_TARGET_HIT"],
    Career: ["DSA_PROGRESS", "JS_PROGRESS", "PROJECT_PROGRESS"],
};
exports.QUICK_ADD_EVENTS = [
    { eventType: "GYM_COMPLETED", title: "Gym Completed", area: "Health" },
    { eventType: "DIET_FOLLOWED", title: "Diet Followed", area: "Health" },
    { eventType: "WATER_TARGET_HIT", title: "Water Target Hit", area: "Health" },
    { eventType: "DSA_PROGRESS", title: "DSA Completed", area: "Career" },
    { eventType: "JS_PROGRESS", title: "JS Learning Completed", area: "Career" },
    { eventType: "PROJECT_PROGRESS", title: "Project Progress", area: "Career" },
    { eventType: "SONG_WRITING", title: "Song Writing Progressed", area: "Music" },
    { eventType: "RECORDING_SESSION", title: "Recording Session", area: "Music" },
    { eventType: "CONTENT_READY", title: "Next Day Content Ready", area: "Content" },
];
exports.CUSTOM_EVENT = "CUSTOM_EVENT";
function isValidEventType(value) {
    return typeof value === "string" && exports.EVENT_TYPE_VALUES.includes(value);
}
function getEventTypeByTitle(title) {
    const normalized = title.trim().toLowerCase();
    for (const eventType of exports.EVENT_TYPE_VALUES) {
        const expectedTitle = exports.EVENT_TYPE_TITLE_MAP[eventType];
        if (expectedTitle.toLowerCase() === normalized) {
            return eventType;
        }
    }
    return null;
}
function getEventTitle(eventType) {
    return exports.EVENT_TYPE_TITLE_MAP[eventType] ?? "Unknown Event";
}
function isSuccessEventType(eventType) {
    return (exports.SUCCESS_RULES.Content.includes(eventType) ||
        exports.SUCCESS_RULES.Music.includes(eventType) ||
        exports.SUCCESS_RULES.Health.includes(eventType) ||
        exports.SUCCESS_RULES.Career.includes(eventType));
}
