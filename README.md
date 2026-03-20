## Project Overview

### Timeline

1 week

---

## Technologies & Tools Used

- JavaScript
- React (Vite + Bun)
- React Router DOM
- Tailwind CSS
- Airtable (REST via fetch())
- Bruno (API collection management)
- HTML5 & CSS3

---

# The F1 Grid Dashboard

**Live App:** _(Add deployed link here)_

> A full React CRUD application giving fans an all-in-one view of the 2026 Formula 1 season.

The F1 Grid Dashboard combines race standings, schedules, favourite drivers, and a Dream Team builder into a single, interactive interface. Built with React and JavaScript, it turns complex F1 data into a clear and engaging user experience.

![The F1 Grid Logo][logo]

[logo]: Planning/F1-Grid-Logo.svg

---

## Approach to Development

The project followed a structured, product-driven workflow to ensure clarity in both scope and execution:

- **Initial Brainstorm**  
  Ideated and defined multiple project directions based on available APIs and feasibility.
  [Read ideation Doc](./Planning/UserStories.md)

- **MVP Definition**  
  Scoped features to balance technical requirements with a complete user experience:
  - Standings overview
  - Driver directory
    - Driver Cards
    - Favourite Driver Section
  - Race calendar
    - Race Cards for each location (Race Schedule)
    - Watchlist (CRUD)
  - Dream Team builder (CRUD)

- **User Stories**  
  Translated product goals into actionable user flows.
  [Read User Stories](./Planning/UserStories.md)

- **Wireframing**  
  Designed layout, hierarchy, and component relationships before development.
  [View initial Wireframes](./Planning/Wireframe/)

---

## Project Structure

```
src/
├── assets/     # Images, SVGs, and brand assets
├── components/ # Reusable UI atoms (Cards, Buttons, Lists)
├── pages/      # Route-level views (Home, Drivers, DreamTeam, Races)
├── services/   # API abstraction (airtable.js, jolpi.js, weather.js)
├── styles/     # Tailwind and global CSS (App.css, index.css)
├── utils/      # Helper functions (date formatting, team colors)
├── App.jsx     # Routing and global state
└── main.jsx    # Entry point
```

---

## API Integration

The application integrates multiple APIs to provide dynamic, real-time content:

| Resource              | Source         | Purpose                                    |
| --------------------- | -------------- | ------------------------------------------ |
| Driver/Team Standings | Jolpi (Ergast) | Current championship rankings              |
| Race Schedule         | Jolpi (Ergast) | Full 2026 season calendar                  |
| Driver Directory      | Jolpi (Ergast) | Driver profiles and details                |
| Weather Forecast      | WeatherAPI     | Live conditions for the next race location |
| Watchlist             | Airtable       | User-specific race watchlist (CRUD)        |
| Dream Team            | Airtable       | User-specific team builder (CRUD)          |
| Favourite Driver      | Airtable       | User-saved favourite driver (CRUD)         |

**Jolpi (Ergast) Endpoints**

| Resource  | Endpoint           |
| --------- | ------------------ |
| Drivers   | `/drivers`         |
| Standings | `/driverstandings` |
| Races     | `/races`           |

**WeatherAPI** — Fetches real-time weather conditions for upcoming race locations.

**OpenF1 API (Future Scope)** — Intended for deeper telemetry: car details, laps, sessions, and live timing.

---

## CRUD Functionality (Airtable)

Airtable is used as a lightweight backend, accessed directly via `fetch()` to manage user-specific data.

**Watchlist**

| Operation | HTTP Method | Action                    |
| --------- | ----------- | ------------------------- |
| Read      | `GET`       | Fetch all watchlist items |
| Create    | `POST`      | Add a race to watchlist   |
| Delete    | `DELETE`    | Remove from watchlist     |

**Dream Team**

| Operation      | HTTP Method | Action                        |
| -------------- | ----------- | ----------------------------- |
| Read           | `GET`       | Fetch saved team              |
| Create         | `POST`      | Create a new dream team entry |
| Delete         | `DELETE`    | Remove a team entry           |
| Full Replace   | `PUT`       | Overwrite the entire team     |
| Partial Update | `PATCH`     | Update specific team fields   |

**Favourite Driver**

| Operation | HTTP Method | Action                  |
| --------- | ----------- | ----------------------- |
| Read      | `GET`       | Fetch saved favourite   |
| Create    | `POST`      | Save a favourite driver |
| Delete    | `DELETE`    | Remove favourite driver |

---

## State Management

Global state for the Watchlist, Dream Team, and Favourite Drivers is managed in `App.jsx` using `useState`. This state is lifted to allow data synchronisation across the Dashboard and specialised pages. Fetching is handled via `useEffect` within the `services/` layer to ensure a clean separation of concerns.

---

## Modular & Reusable Components

The application follows a **single-responsibility component architecture**, where each component is focused, reusable, and driven by props.

| Component               | Page(s) Used        | Responsibility                                                                                                                            |
| ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **NavBar**              | All                 | Global navigation with active route highlighting.                                                                                         |
| **HeroSection**         | Overview            | Displays next race name, countdown timer, and live weather conditions.                                                                    |
| **WatchlistPanel**      | Overview, Races     | Shows user's saved watchlist races with flag and date. Supports remove (×).                                                               |
| **StandingsList**       | Overview            | Reusable ranked list for Top 5 Driver Standings.                                                                                          |
| **FavouriteDriverCard** | Overview, Drivers   | Summarises a saved favourite driver — name, flag, points, position.                                                                       |
| **DriverCard**          | Drivers, Dream Team | Core driver unit — team colour background, code, number, photo, points, position. Accepts an action button (Add to Favourites / Remove).  |
| **DreamTeamForm**       | Dream Team          | Controlled form with dropdowns for Primary Driver, Secondary Driver, Favourite Team, and Favourite Track.                                 |
| **DreamTeamLogs**       | Dream Team          | Displays a log of saved Dream Team entries with a delete (×) action.                                                                      |
| **TeamCard**            | Dream Team          | Displays chosen constructor — team logo, car image, and team colour accent.                                                               |
| **TrackCard**           | Dream Team          | Displays chosen circuit — country flag, circuit name, and race date range.                                                                |
| **RaceCard**            | Races               | Displays circuit map silhouette, country name, circuit name, date, and Add to Watchlist button. Past races show "View Standings" instead. |
| **WatchlistRaceCard**   | Races               | Expanded watchlist entry — flag, name, date, live countdown, and remove (×).                                                              |

### Component Tree

```
App
├── NavBar
├── HomePage (Overview)
│   ├── HeroSection
│   │   └── [countdown timer + weather data]
│   ├── WatchlistPanel
│   │   └── WatchlistRaceCard
│   ├── StandingsList
│   └── FavouriteDriverCard
├── DriversPage
│   ├── FavouriteDriversSection
│   │   └── DriverCard [remove mode]
│   └── AllDriversSection
│       └── DriverCard [add mode]
├── DreamTeamPage
│   ├── DreamTeamForm (Left-top)
│   ├── DreamTeamLogs (Left-bottom)
│   │   └── [log entry + delete]
│   └── DreamTeamPreview (Right)
│       ├── DriverCard [primary + secondary]
│       ├── TeamCard
│       └── TrackCard
└── RacesPage
    ├── WatchlistSection
    │   └── WatchlistRaceCard [remove mode]
    └── ScheduleSection
        └── RaceCard [add mode]
```

---

## Styling Approach

- Clean, dashboard-style UI
- Strong visual hierarchy for quick scanning
- Card-based layout for modular content blocks
- Light theme with F1-inspired accents
- Team-based colour highlights and consistent spacing

---

## Future Roadmap

- **Teams Page:** Detailed view of all constructors and their history.
- **F1 Legends:** Explore Hall of Fame historical driver profiles.
- **Driver Search & Filter:** Find any driver by name or team instantly.
- **Past Race Results:** See completed race outcomes directly on race cards.
- **Social Sharing:** Share your Dream Team lineup on social media.
- **OpenF1 API Integration:** Deeper telemetry — car details, laps, sessions, and live timing.

---
