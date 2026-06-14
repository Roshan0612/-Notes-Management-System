# Notes Management System

A full-stack notes application built using React, Node.js, Express, and MongoDB.

The application allows users to create, update, delete, search, and manage notes in a simple and responsive interface.

---

## Features

* Create multiple notes
* View all saved notes
* Edit existing notes
* Delete notes
* Search notes by title or content
* View single note details
* Pin important notes
* Add tags to notes
* Responsive UI for desktop and mobile
* Proper validation and error handling

---

## Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## Project Structure

### Backend

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── .gitignore
```

### Frontend

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

## Installation

### Clone the repository

```bash
git clone git clone https://github.com/yourusername/notes-management-system.git
```

---

# Backend Setup

Move into backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Move into frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Get all notes

```http
GET /api/notes
```

### Get single note

```http
GET /api/notes/:id
```

### Create note

```http
POST /api/notes
```

### Update note

```http
PUT /api/notes/:id
```

### Delete note

```http
DELETE /api/notes/:id
```

### Search notes

```http
GET /api/notes?search=react
```

---

## Validation

* Title field is required
* Proper error messages are returned for invalid requests
* Backend handles invalid note IDs and server errors

---

## Notes

* Notes are sorted by latest updated date
* Search works on both title and content
* MongoDB Atlas was used for database storage

---

## Future Improvements

* User authentication
* Rich text editor
* Auto-save drafts
* Note categories
* Dark mode

---

## Author

Roshan Gawade
