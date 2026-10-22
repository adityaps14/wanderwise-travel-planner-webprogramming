# WanderWise — Intelligent Travel Planning System

A responsive MCA web-programming project built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Extract this folder.
2. Open the folder in VS Code.
3. Open `index.html` with the Live Server extension, or open `index.html` directly in a browser.
4. Keep the `assets` folder beside `index.html`; the site uses relative paths such as `assets/hero.jpg`.

## Features
- Responsive travel homepage and sticky navigation
- Destination cards and travel experience sections with bundled images
- Budget/day/style trip planner with JavaScript-generated sample itinerary
- Save/favourite interactions, toast messages and demo travel assistant
- Accessible labels, responsive navigation and mobile layouts

## Important project scope
The current planner and assistant are front-end demonstrations using JavaScript rules. No real generative AI, live flight/hotel booking, payment, map, or weather API is connected. Do not present demo prices as live offers.

## Publish with GitHub Pages
1. Create a new **public** repository on GitHub, e.g. `wanderwise-travel-planner`.
2. Upload the contents of this folder (make sure `index.html` is at the repository root, not buried in another folder).
3. In GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Wait for the Pages deployment to finish; GitHub will show the public website URL in Settings → Pages.

The local URL `http://127.0.0.1:5501/index.html` is only available on your computer and cannot be published from that URL.


## Neon UI and destination guide update

This updated build uses a dark navy / cyan / electric-blue / violet visual system with warm yellow call-to-action buttons. Destination photography is bundled locally under `assets/`, so destination cards do not depend on third-party image hosts.

### Interactive destination details
- Click a popular destination card to open its destination guide.
- The guide includes a short overview, travel vibe, suggested stay, tags, and sample places/experiences.
- Click **Plan a Trip Here** to pass the destination and suggested travel style into the planner.
- AI deal cards also open destination information.
- Adventure experience cards prefill the planner with a relevant style and destination.
- Close the guide with the close button, click outside the dialog, or press Escape.

### Prototype note
Place descriptions and suggested experiences are informational demo content. The planner's itinerary and budget are JavaScript prototype estimates, not live booking prices or verified real-time recommendations. Check current official local guidance before travel.

### Run
Open `index.html` directly or use VS Code Live Server. No build step or npm installation is required.
