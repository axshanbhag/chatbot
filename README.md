## Overview

A web-based chatbot with a React UI and an Express backend that sends requests to an LLM via the DeepSeek API from HuggingFace.

## Features

- Responsive chat interface built with React, including message bubbles, loading indicators, and error handling.
- Node.js/Express backend that exposes a REST API for sending user prompts and returning AI-generated replies.

## Project Structure

- `backend/`: Express server, route handlers for `/api/chat`, and utility code for calling external LLM APIs using keys from environment variables.
- `frontend/`: React application code (components, hooks, and styling) that renders the chatbot UI and communicates with the backend via HTTP.
- `public/`: Static HTML template and public assets used by the React build.
- `src/`: Main React entry point and core UI components, including the top-level `App` component.

## Prerequisites

- Node.js and npm installed (LTS version recommended) for both frontend and backend.
- Accounts and API keys for any external model providers used by the backend, configured via environment variables.

## Setup and Installation

1. Clone the repository and navigate to the project root.
2. Install dependencies in the root (and in the frontend or backend subfolders if they maintain separate `package.json` files) using `npm install`.
3. Create a `.env` file in the backend directory and define the required variables 

## Running the Application

- Development: Use `npm start` in the project root to start the React development server; if the backend runs separately, start it with `npm start` or `npm run dev` inside the `backend` folder.
- Testing: Run `npm test` to execute the available tests in watch mode for the React app.
- Run locally: Start the app in development mode with `npm run dev`, then open the shown localhost URL in your browser to use the chatbot.

## Usage

- Open the application in a browser (default: `http://localhost:3000`) and type a message into the chat input field.
- The frontend sends the message to the backend, which forwards the prompt to the configured LLM API and returns a generated reply that is rendered as a chatbot response.
