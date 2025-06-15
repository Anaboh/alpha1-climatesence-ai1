# ClimateSenseAI

This repository contains a Perplexity-style AI summarization app with React frontend, Express backend, Supabase integration, and Redis caching.

## Setup

1. Copy `.env.example` to `.env` and fill in your API keys.
2. Run `docker-compose up --build` to start the app locally.
3. The app will be available at `http://localhost:3000`.

## Deployment

- Connect this repo to Render or any Docker-compatible cloud.
- Set environment variables in your cloud dashboard.
- Enable auto-deploy on push to main branch.

## Features

- React frontend with Perplexity UI components
- Express backend with Supabase and Perplexity API integration
- Redis caching for performance
- Dockerized for easy deployment
- GitHub Actions CI/CD workflow included
