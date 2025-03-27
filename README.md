# Cryptocurrency Portfolio Tracker

A Next.js application for tracking cryptocurrency portfolio holdings.

## Features

- View cryptocurrency portfolio holdings in a table format
- Add new cryptocurrency holdings
- Real-time updates using Redux state management
- SQLite database for persistent storage

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ya-portfolio-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

Build the application:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `/src/pages` - Next.js pages and API routes
- `/src/store` - Redux store configuration and slices
- `/src/lib` - Database utilities and types
- `/src/styles` - Global styles and Tailwind CSS configuration

## Technologies Used

- Next.js
- React
- Redux Toolkit
- SQLite3
- TypeScript
- Tailwind CSS 