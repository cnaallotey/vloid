# Vloid Waitlist Landing Page

Vloid is an AI-first voice agent campaign platform that automates follow-up calls, feedback collection, renewal reminders, and dispute checks, returning structured and filterable results to your team.

This repository contains the Next.js waitlist landing page designed to capture early-access signups and collect preliminary campaign data (e.g. planned use cases, expected call volume).

---

## 🎨 Design System

The user interface is designed to reflect the visual aesthetics of the **[Google Antigravity](https://antigravity.google)** developer site:
- **Typography**: Uses **Google Sans Flex** via Google Fonts with variable font variations, tight headings, and negative tracking.
- **Grids & Canvases**: Built with faint blueprint layout grids (`.antigravity-grid`) and technical crosshair decorations (`+`) at panel border intersections.
- **Console Panels**: Section widgets (such as the Campaign Preview Card and structured Results Table) are designed as flat, minimal developer tool consoles.
- **Color Scheme**: Clean grayscale canvas (`#FFFFFF` background, `#F8F9FC` container panels, `#121317` headings) accented by Google's premium developer blue (`#3279F9`).

---

## 🛠️ Stack & Dependencies

- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies

Install the packages using `npm`:
```bash
npm install
```

### 2. Start the Development Server

Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the page.

### 3. Build for Production

Compile, optimize, and typecheck the production build:
```bash
npm run build
```

---

## 🔌 API Integration

Waitlist signups are posted to the local route handler at `/api/waitlist` (`app/api/waitlist/route.ts`).
- Submissions are cleaned, validated, checked against a honeypot field (`_gotcha`), and dispatched server-side to the FormDrop backend inbox.
- Submission data is segmented by copy variant (A/B testing) to track signup conversion effectiveness.
