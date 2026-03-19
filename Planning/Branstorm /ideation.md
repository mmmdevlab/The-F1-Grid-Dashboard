# Brainstorm Ideas

## 1. Singles Housing Dashboard (Singapore)

### What it is

A centralized dashboard tailored specifically for **single adults in Singapore**, aggregating housing-related information such as:

- Eligibility rules (e.g. age requirements for HDB purchase)
- Available housing options (BTO, resale, rental)
- Grants, policies, and schemes
- Lifestyle layer: things to do, communities, and resources for singles

### Why

Singapore’s housing ecosystem is heavily structured around family units, making it fragmented and difficult for singles to navigate. Information exists, but it is:

- Scattered across multiple government pages
- Not contextualized for single-user journeys
- Lacking lifestyle integration (it’s all policy, no “living experience”)

This project reframes housing from a **single-person perspective**, turning static policy data into a usable, decision-support tool.

### API / Data Sources

- data.gov.sg datasets
  - Housing availability
  - Resale transactions
  - Demographic and planning data
- Potential integrations:
  - URA / HDB public datasets (via data.gov.sg aggregation)

---

## 2. Aggregated Shopping Comparison Platform

### What it is

A **meta-shopping search engine** (similar to Skyscanner, but for e-commerce) that:

- Searches across multiple platforms simultaneously
- Compares prices, availability, and deals
- Redirects users to the best purchasing option

Core experience:

- One search → multiple platforms → unified comparison

### Why

Online shopping is fragmented across platforms like Lazada and Shopee. Users currently:

- Manually search item-by-item across apps
- Cannot easily compare real-time pricing
- Miss out on better deals due to lack of aggregation

This idea creates a **single decision layer**, reducing friction and improving price transparency.

### API / Data Sources

- Lazada Open Platform API
- Shopee Open API
  - Product listings
  - Pricing
  - Seller data

**Technical Note:**

- Requires handling authentication, rate limits, and inconsistent data schemas across platforms
- Potential complexity in normalizing product matching across marketplaces

---

## 3. F1 Dashboard — _F1 The Grid_ (Selected Idea)

### What it is

A **personalized Formula 1 dashboard** that consolidates:

- Current standings
- Race calendar
- Favourite drivers
- A custom “Dream Team” builder

Designed for fans who want a **high-level, curated view** without needing to track every race in detail.

### Why

F1 data is rich but overwhelming:

- Official dashboards focus on live telemetry and deep stats
- Casual fans lack a simple way to “drop in” and understand the current season

This project focuses on:

- **Accessibility** (quick understanding of the season)
- **Personalization** (favourite drivers, custom teams)
- **Engagement** (interactive features like Dream Team)

It also reflects a personal connection to the sport—from the 2011 Singapore Grand Prix to recent seasons—making the product more intentional and user-driven.

### API / Data Sources

- Public F1 APIs (e.g. Ergast API or similar motorsport datasets)
  - Driver standings
  - Constructor standings
  - Race schedules
- Potential enhancements:
  - Historical data integration
  - Driver/team metadata

---

## Summary

- **Singles Housing Dashboard** → Social impact + public data + underserved audience
- **Shopping Aggregator** → Commercial utility + API-heavy integration
- **F1 The Grid** → Passion-driven product + strong UX + manageable scope
