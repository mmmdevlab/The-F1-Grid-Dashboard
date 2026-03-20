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

# The F1 Grid Dashboard - this section is ok no change required

- **Live App:** _(Add deployed link here)_

> A full React CRUD application giving fans an all-in-one view of the 2026 Formula 1 season.

The F1 Grid Dashboard combines race standings, schedules, favourite drivers, and a Dream Team builder into a single, interactive interface. Built with React and JavaScript, it turns complex F1 data into a clear and engaging user experience.

![alt text][logo]

[logo]: (update link here) "The F1 Grid Logo"

---

## Approach to Development

The project followed a structured, product-driven workflow to ensure clarity in both scope and execution:

- **Initial Brainstorm**  
  Ideated and defined multiple project directions based on available APIs and feasibility.
  _(Add ideation.md link here)_

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
  _(Add UserStories.md link here)_

- **Wireframing**  
  Designed layout, hierarchy, and component relationships before development.
  _(Add folder link here)_

---

## MVP Technical Requirements Mapping

- **React Requirements**
  - ≥ 5 components
  - ≥ 4 props
  - ≥ 2 useState hooks
  - ≥ 2 routes (React Router)
  - ≥ 1 lifted state (enabling CRUD functionality)

- **API Integration**
  - External APIs are used to fetch and display real-world F1 data

- **CRUD Functionality**
  - Implemented using Airtable via REST API (`fetch()`)

- **Deployment**
  - Application is deployed and publicly accessible

---

## Modular & Reusable Components

The application follows a **single-responsibility component architecture**, where each component is focused, reusable, and driven by props.

| Component              | Responsibility                                                                    |
| ---------------------- | --------------------------------------------------------------------------------- |
| **NavBar**             | Provides global navigation across routes.                                         |
| **HeroSection**        | Highlights the next race with countdown and live weather conditions.              |
| **DriverCard**         | Displays driver details (number, team, points) with favourite toggle interaction. |
| **StandingsList**      | Reusable list component for ranking data (drivers/constructors).                  |
| **RaceCard**           | Displays race details (circuit, location, date) with watchlist interaction.       |
| **FavoriteDriverCard** | Summarises a selected favourite driver on the main dashboard.                     |
| **WatchlistForm**      | Controlled form for managing watchlist entries.                                   |
| **DreamTeamBuilder**   | Controlled form for creating and persisting custom team selections.               |

This modular structure improves **scalability**, **maintainability**, and **code reuse**.

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

- **Jolpi (Ergast) API**

| Resource  | Endpoint           |
| --------- | ------------------ |
| Drivers   | `/drivers`         |
| Standings | `/driverstandings` |
| Races     | `/races`           |

- **WeatherAPI**  
  Used to fetch real-time weather conditions for upcoming race locations.

- **OpenF1 API (Future Scope)**  
  Intended for deeper telemetry data such as car details, laps, sessions, and live timing.

---

## Bruno API Collection

The project uses [Bruno](https://www.usebruno.com/) for API collection management, with the following structure:

```
Bruno/
├── Airtable-CRUD/
│   ├── WatchList/
│   │   ├── GET  — All to Watchlist Logs
│   │   ├── POST — Add to Watchlist
│   │   └── DEL  — Remove from Watchlist
│   ├── DreamTeam/
│   │   ├── GET   — DreamTeam
│   │   ├── POST  — create-DreamTeam
│   │   ├── DEL   — delete-DreamTeam
│   │   ├── PUT   — overwrite-DreamTeam
│   │   └── PATCH — update-DreamTeam
│   └── FavouriteDriver/
│       ├── GET  — All Favorites Logs
│       ├── DEL  — Remove from Favorite
│       └── POST — Add to Favorite
├── Jolpi-F1-Core/
│   ├── 01-Dashboard-Home
│   ├── 02-Drivers-Directory
│   ├── 03-Race-Calendar
│   └── 04-Dream-Team-Builder
├── Weather/
└── Archive/
```

---

## CRUD Functionality (Airtable)

Airtable is used as a lightweight backend and is accessed directly via `fetch()` to manage user-specific data across two tables.

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

### Implementation Notes

- Controlled forms manage all user input
- Data is persisted via Airtable REST endpoints
- UI updates are synced with local state after each operation

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

## State Management

Global state for the Watchlist and Dream Team is managed in App.jsx using `useState`.
This state is "lifted" to allow data synchronization across the Dashboard and specialized pages.
Fetching is handled via `useEffect` within the services/ layer to ensure a clean separation of concerns.

---

## Component Architecture

### Core Components

- **App** — Root container managing global state and routing
- **Navbar** — Navigation layer
- **HomePage** — Dashboard overview
- **Standings** — Ranking display
- **DriversList** — Driver directory
- **DriverCard** — Individual driver unit
- **RaceCalendar** — Race schedule view
- **Watchlist** — User-managed race list
- **DreamTeam** — Custom team builder

---

## Styling Approach

- Clean, dashboard-style UI
- Strong visual hierarchy for quick scanning
- Card-based layout for modular content blocks

### Visual Direction

- Light theme with F1-inspired accents
- Team-based color highlights
- Consistent spacing and typography system

---

## Future Roadmap

- **Teams Page:** Detailed view of all constructors and their history.
- **F1 Legends:** Explore the Hall of Fame Historical Profiles of F1.
- **Driver Search & Filter:** Find any driver by name or team instantly.
- **Past Race Results:** See completed race outcomes directly on race cards.
- **Social Sharing:** Share your Dream Team lineup on social media.
- **OpenF1 API Integration:** Deeper telemetry — car details, laps, sessions, and live timing.

---
