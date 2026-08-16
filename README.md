# Venues & Weather App

Search any city to see its top local attractions alongside a 7-day weather forecast, presented as flippable cards behind an animated circle-reveal intro.

Originally a webpack-based project; rebuilt on [Astro](https://astro.build) and configured for deployment on [Vercel](https://vercel.com).

## Features

- City search with a 7-day weather forecast (condition, high/low, sunrise/sunset)
- Top 8 local attractions for the searched city
- Flippable cards, expandable panels, and SVG shape animations
- Close button to reset back to the initial search screen

## Data sources

- **Weather & geocoding**: [Open-Meteo](https://open-meteo.com) (free, no API key required)
- **Attractions**: [Foursquare](https://foursquare.com) Places API

## Getting started

```bash
npm install
npm run dev
```

| Command           | Action                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the local dev server                   |
| `npm run build`   | Build the production site to `dist/`         |
| `npm run preview` | Preview the production build locally         |

## Deployment

Configured with `@astrojs/vercel` — import the repo into Vercel and it builds with no extra setup.

## Tech stack

Astro, Sass, and [Snap.svg](http://snapsvg.io) for the vector shape animations.
