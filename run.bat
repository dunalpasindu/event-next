@echo off

echo Starting backend and frontend...

:: Navigate to the backend folder and start the server
start cmd /k "cd backend && npm install && node server.js"

:: Navigate to the frontend folder and start the development server
start cmd /k "cd event-next && npm install && npm run dev"

echo Both backend and frontend are running.
pause