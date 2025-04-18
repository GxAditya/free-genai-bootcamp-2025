# Hindi LearnScape - Language Learning Application

Hindi LearnScape is a comprehensive platform designed to help you learn the Hindi language through various interactive activities and tools.

## Features

- **Dashboard**: Track your learning progress with statistics and visualizations
- **Words**: Browse and study Hindi vocabulary
- **Word Groups**: Organize words into thematic groups
- **Study Activities**: Interactive learning activities to practice your skills
- **Study Sessions**: Track your study history and progress

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Flask, SQLite
- **Languages**: Python, TypeScript

## Getting Started

### Prerequisites

- [Python](https://www.python.org/downloads/) (3.8+)
- [Node.js](https://nodejs.org/) (16+) or [Bun](https://bun.sh/) (recommended)

### Running the Application (Automatic)

The easiest way to run the application is using the provided start script:

#### Windows

```
start_app.bat
```

#### macOS/Linux

```
python start_app.py
```

This will:
1. Set up a Python virtual environment and install backend dependencies
2. Install frontend dependencies if needed
3. Start both the backend and frontend development servers
4. Open your browser to the application

### Running Manually

#### Backend (Flask)

```bash
cd backend-flask
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The backend will run on http://localhost:5000

#### Frontend (React/Vite)

```bash
cd frontend
# Using npm
npm install
npm run dev
# Using Bun (faster)
bun install
bun run dev
```

The frontend will run on http://localhost:8080

## Development

The frontend and backend are connected through a proxy configuration in the Vite development server.
API requests from the frontend are automatically forwarded to the Flask backend.

### API Services

The frontend includes typed API services for all backend endpoints in the `src/services` directory:

- `wordsApi`: Vocabulary management
- `groupsApi`: Word group management
- `activitiesApi`: Study activities
- `sessionsApi`: Study sessions tracking
- `dashboardApi`: Dashboard statistics and data

Use these services with the `useApi` hook for easy data fetching in your components.

## License

This project is licensed under the MIT License.
