# EventNext

EventNext is a comprehensive event management platform designed to simplify the process of organizing and managing events. This project includes both a frontend built with React and a backend powered by Node.js and Express, with MongoDB as the database. The platform supports features like event registration, sponsor interest management, merchandise sales, and accommodation bookings.

## Features

### Frontend
- Built with React and Vite for fast development and performance.
- Tailwind CSS for modern and responsive UI design.
- React Router for seamless navigation between pages.
- Pages include:
  - Home
  - Event Registration
  - Sponsor Interest
  - Merchandise
  - Accommodation
  - My Orders
  - My Bookings
  - My Sponsor List

### Backend
- Built with Node.js and Express.
- MongoDB for data storage.
- RESTful API endpoints for:
  - Sponsors
  - Orders
  - Accommodations
- Middleware for CORS and JSON parsing.

## Project Structure

```
EventNext/
├── backend/                # Backend server files
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── event-next/            # Frontend files
│   ├── src/               # React source files
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
├── run.bat                # Script to run both backend and frontend
└── README.md              # Project documentation
```

## Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd event-next
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../event-next
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     ```

4. Run the project:
   - Use the `run.bat` file to start both the backend and frontend simultaneously.
   - Alternatively, you can start them manually:
     ```bash
     # In one terminal (backend)
     cd backend
     node server.js

     # In another terminal (frontend)
     cd event-next
     npm run dev
     ```

5. Open the application in your browser at `http://localhost:5173`.

## Testing

This project is designed for both manual and automated testing.

### Manual Testing
- Navigate through the application to test features like event registration, sponsor interest, merchandise purchase, and accommodation booking.
- Verify data persistence by checking the MongoDB database.

### Automated Testing
- Add automated tests using tools like Jest for the backend and React Testing Library for the frontend.
- Future plans include integrating CI/CD pipelines for automated testing.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
