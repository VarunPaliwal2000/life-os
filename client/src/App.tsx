import { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  CUSTOM_EVENT,
  EVENT_AREAS,
  getEventTypeByTitle,
  isValidEventType,
  QUICK_ADD_EVENTS,
  SUCCESS_RULES,
  type EventType,
  type QuickAddEvent,
} from "./config/eventConfig";

interface EventItem {
  _id: string;
  eventType?: string;
  title: string;
  area: string;
  completedAt: string;
}

function Home() {
  return (
    <section className="page">
      <h1>Life OS</h1>
      <p>
        Welcome to the Life OS frontend. This starter app is built with React,
        TypeScript, SCSS, and React Router.
      </p>
    </section>
  );
}

function EventPage() {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("Health");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resolveEventType(item: EventItem): EventType {
    const rawType = item.eventType;
    if (isValidEventType(rawType)) {
      return rawType;
    }
    return getEventTypeByTitle(item.title) ?? CUSTOM_EVENT;
  }

  async function fetchEvents() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const eventType = getEventTypeByTitle(title) ?? CUSTOM_EVENT;
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, area, eventType }),
      });

      if (!response.ok) {
        throw new Error("Failed to save event");
      }

      setTitle("");
      setArea("Health");
      await fetchEvents();
    } catch (err) {
      setError("Failed to save event.");
    }
  }

  async function quickAddEvent(eventConfig: QuickAddEvent) {
    setError(null);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventConfig),
      });

      if (!response.ok) {
        throw new Error("Failed to save quick event");
      }

      await fetchEvents();
    } catch (err) {
      setError("Failed to save quick event.");
    }
  }

  function isToday(date: Date) {
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

  const todayEvents = events.filter((item) =>
    isToday(new Date(item.completedAt)),
  );

  const todayGroups: Record<string, EventItem[]> = {
    Health: [],
    Career: [],
    Music: [],
    Content: [],
  };

  for (const eventItem of todayEvents) {
    if (todayGroups[eventItem.area]) {
      todayGroups[eventItem.area].push(eventItem);
    }
  }

  const todayEventTypes = new Set<EventType>(
    todayEvents.map((item) => resolveEventType(item)),
  );

  const contentPoint = SUCCESS_RULES.Content.some((type) =>
    todayEventTypes.has(type),
  )
    ? 1
    : 0;
  const musicPoint = SUCCESS_RULES.Music.some((type) =>
    todayEventTypes.has(type),
  )
    ? 1
    : 0;
  const healthPoint = SUCCESS_RULES.Health.some((type) =>
    todayEventTypes.has(type),
  )
    ? 1
    : 0;
  const careerPoint = SUCCESS_RULES.Career.some((type) =>
    todayEventTypes.has(type),
  )
    ? 1
    : 0;

  const score = contentPoint + musicPoint + healthPoint + careerPoint;
  const percentage = Math.round((score / 6) * 100);
  const successfulDay =
    contentPoint > 0 && musicPoint > 0 && healthPoint > 0 && careerPoint > 0;

  return (
    <section className="page">
      <h1>Add Event</h1>
      <form onSubmit={saveEvent}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="area">Area</label>
          <select
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {EVENT_AREAS.map((eventArea) => (
              <option key={eventArea} value={eventArea}>
                {eventArea}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Save Event</button>
      </form>

      <section>
        <h2>Quick Add Events</h2>
        {(["Health", "Career", "Music", "Content"] as const).map((areaName) => (
          <div key={areaName}>
            <h3>{areaName}</h3>
            {QUICK_ADD_EVENTS.filter((item) => item.area === areaName).map(
              (item) => (
                <button
                  key={item.eventType}
                  type="button"
                  onClick={() => quickAddEvent(item)}
                >
                  {item.title}
                </button>
              ),
            )}
          </div>
        ))}
      </section>

      <section>
        <h2>Today</h2>
        <div>
          <h3>Health</h3>
          {todayGroups.Health.length === 0 ? (
            <p>No health events today.</p>
          ) : (
            <ul>
              {todayGroups.Health.map((item) => (
                <li key={item._id}>✅ {item.title}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Career</h3>
          {todayGroups.Career.length === 0 ? (
            <p>No career events today.</p>
          ) : (
            <ul>
              {todayGroups.Career.map((item) => (
                <li key={item._id}>✅ {item.title}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Music</h3>
          {todayGroups.Music.length === 0 ? (
            <p>No music events today.</p>
          ) : (
            <ul>
              {todayGroups.Music.map((item) => (
                <li key={item._id}>✅ {item.title}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Content</h3>
          {todayGroups.Content.length === 0 ? (
            <p>No content events today.</p>
          ) : (
            <ul>
              {todayGroups.Content.map((item) => (
                <li key={item._id}>✅ {item.title}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <h2>Day Score</h2>
        <p>{percentage}%</p>
        <p>Successful Day: {successfulDay ? "YES" : "NO"}</p>
      </section>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Recent Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((item) => (
            <li key={item._id}>
              <strong>{item.title}</strong> — {item.area} at{" "}
              {new Date(item.completedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <p>
        This monorepo keeps the frontend and backend separate while using
        TypeScript in both places.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
