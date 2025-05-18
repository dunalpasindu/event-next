<p align="center">
  <img src="https://img.icons8.com/color/96/000000/event-accepted-tentatively.png" width="80"/>
</p>

<h1 align="center">EventNext <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"/></a></h1>

<p align="center">
  <b>Modern Academic Event Management Platform</b> <br/>
  <em>Effortless event organization for students & organizers</em>
</p>

---

## 🚀 Features

### 🖥️ Frontend
- ⚡ <b>React + Vite</b> for blazing-fast development
- 🎨 <b>Tailwind CSS</b> for a modern, responsive UI
- 🔀 <b>React Router</b> for smooth navigation
- 📄 <b>Pages:</b>
  - Home
  - Event Registration
  - Sponsor Interest
  - Merchandise
  - Accommodation
  - My Orders
  - My Bookings
  - My Sponsor List

### 🛠️ Backend
- 🟢 <b>Node.js + Express</b> server
- 🍃 <b>MongoDB</b> for data storage
- 🔗 <b>RESTful API</b> endpoints: Sponsors, Orders, Accommodations
- 🧩 Middleware for CORS & JSON parsing

---

## 🏗️ Project Structure

```text
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

---

## ⚡ Quick Start

### 1. Prerequisites
- <img src="https://img.icons8.com/color/24/000000/nodejs.png" width="20"/> [Node.js](https://nodejs.org/) (v16 or later)
- <img src="https://img.icons8.com/color/24/000000/mongodb.png" width="20"/> [MongoDB](https://www.mongodb.com/)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd event-next
```

### 3. Install Dependencies
```bash
cd backend
npm install
cd ../event-next
npm install
```

### 4. Configure Environment Variables
- Create a `.env` file in the `backend` folder:
  ```env
  MONGO_URI=<your-mongodb-connection-string>
  ```

### 5. Run the Project
- <b>Recommended:</b> Use the script to start both servers:
  ```bash
  ./run.bat
  ```
- <b>Or manually:</b>
  ```bash
  # Terminal 1 (backend)
  cd backend
  node server.js

  # Terminal 2 (frontend)
  cd event-next
  npm run dev
  ```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

> This project is designed for both <b>manual</b> and <b>automated</b> testing. It is an <b>academic project</b> suitable for coursework, demos, and learning.

### Manual
- Explore the app: register for events, express sponsor interest, buy merchandise, book accommodation.
- Check MongoDB for data persistence.

### Automated
- Add tests with <b>Jest</b> (backend) and <b>React Testing Library</b> (frontend).
- CI/CD integration planned.

---

## 🤝 Contributing
1. Fork the repo
2. Create a new branch
3. Commit & push your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the <a href="LICENSE.md">MIT License</a>.

<p align="center">
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
  </a>
</p>

---

## 🙏 Acknowledgments

- <img src="https://img.icons8.com/color/24/000000/react-native.png" width="20"/> [React](https://reactjs.org/)  
- <img src="https://img.icons8.com/color/24/000000/vite.png" width="20"/> [Vite](https://vitejs.dev/)  
- <img src="https://img.icons8.com/color/24/000000/tailwindcss.png" width="20"/> [Tailwind CSS](https://tailwindcss.com/)  
- <img src="https://img.icons8.com/color/24/000000/nodejs.png" width="20"/> [Node.js](https://nodejs.org/)  
- <img src="https://img.icons8.com/ios-filled/24/16A085/express-js.png" width="20"/> [Express](https://expressjs.com/)  
- <img src="https://img.icons8.com/color/24/000000/mongodb.png" width="20"/> [MongoDB](https://www.mongodb.com/)
