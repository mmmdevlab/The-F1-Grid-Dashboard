## Project Overview

### Timeline

1 week

---

## Technologies & Tools Used

- JavaScript
- React (Vite)
- React Router DOM
- Tailwind CSS
- Airtable (REST via `fetch()`)
- HTML5 & CSS3

---

# The F1 Grid Dashboard - this section is ok no change required

- **Live App:** _(Add deployed link here)_

> A full React CRUD application giving fans an all-in-one view of the 2026 Formula 1 season.

The F1 Grid Dashboard combines live standings, race schedules, favourite drivers, and a Dream Team builder into a single, interactive interface. Built with React and JavaScript, it turns complex F1 data into a clear and engaging user experience.

> _(Add screenshot here)_

---

## Approach to Development

The project followed a structured, product-driven workflow to ensure clarity in both scope and execution:

- **Initial Brainstorm**  
  Defined multiple project directions based on available APIs and feasibility.  
  _(Add ideation.md link here)_

- **MVP Definition**  
  Scoped features to balance technical requirements with a complete user experience:
  - Standings overview
  - Driver directory
  - Race calendar
  - Watchlist (CRUD)
  - Dream Team builder (CRUD)

- **User Stories**  
  Translated product goals into actionable user flows.  
  _(Add UserStories.md link here)_

- **Wireframing**  
  Designed layout, hierarchy, and component relationships before development.  
  _(Add folder link here)_

This approach ensured that development remained aligned with both **user needs** and **technical constraints**.

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

- **Jolpi (Ergast) API**  
  Provides core Formula 1 data including:

  | Resource  | Endpoint           |
  | --------- | ------------------ |
  | Drivers   | `/drivers`         |
  | Standings | `/driverstandings` |
  | Races     | `/races`           |

- **WeatherAPI**  
  Used to fetch real-time weather conditions for upcoming race locations.

- **OpenF1 API (Future Scope)**  
  Intended for deeper telemetry data such as laps, sessions, and live timing.

---

## CRUD Functionality (Airtable)

Airtable is used as a lightweight backend and is accessed directly via `fetch()` to meet project constraints.

| Table          | Operations              |
| -------------- | ----------------------- |
| **Watchlist**  | `GET`, `POST`, `DELETE` |
| **Dream Team** | `GET`, `POST`, `DELETE` |

### Implementation Notes

- Controlled forms manage all user input
- Data is persisted via Airtable REST endpoints
- UI updates are synced with local state after each operation

---

## Project Structure

- Organized into:

  ```
  src/
  ├── components/ → Reusable UI blocks
  ├── pages/ → Route-level views
  ├── services/ → API abstraction layer
  ├── styles/ → Global and utility styles
  ├── App.jsx
  ├── main.jsx
  ```

---

## State Management

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

## Future Roadmap - this section is ok no change required

- **Teams Page:** Detailed view of all constructors and their history.
- **Historical Profiles:** Explore the legends of F1.
- **Driver Search & Filter:** Find any driver by name or team instantly.
- **Past Race Results:** See completed race outcomes directly on race cards.
- **Social Sharing:** Share your Dream Team lineup on social media.

---
