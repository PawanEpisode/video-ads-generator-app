# Video Ads Generator Frontend

A React-based frontend for the Video Ads Generator application that transforms product URLs into compelling video advertisements.

## Features

- URL input and processing
- Video preview using react-player
- Modern UI with Tailwind CSS
- Integration with AI-powered backend services

## Tech Stack

- React/Next.js
- Tailwind CSS
- react-player for video playback
- Axios for API calls

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Install required packages:

```bash
npm install react-player axios @heroicons/react
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
frontend/
├── components/     # Reusable UI components
├── pages/         # Next.js pages
├── public/        # Static assets
├── styles/        # Global styles
└── utils/         # Utility functions
```

## API Integration

The frontend communicates with the FastAPI backend running on port 8000. The main endpoints are:

- POST /api/analyze-url - Analyze product URL
- POST /api/generate-video - Generate video from analyzed content
- GET /api/video-status - Check video generation status

## Development

- Use `npm run dev` for development
- Use `npm run build` for production build
- Use `npm run start` to run production build
