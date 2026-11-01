# Student CRUD API

Express + MongoDB backend for Assignment 3 (React + TypeScript + MUI + Axios).

## Setup
1. Install Node.js and ensure MongoDB is running (local MongoDB or Atlas).
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGO_URI` to your MongoDB connection string.
4. Run `npm run dev`.

Default server: `http://localhost:4891`

## Student fields
- `name` (string, required)
- `email` (string, required; stored lowercase)
- `age` (number, required; 1–120)
- `course` (string, required)

## Endpoints
- `GET /api/students` — list all students
- `GET /api/students/:id` — fetch one student
- `POST /api/students` — create student
- `PUT /api/students/:id` — update student
- `DELETE /api/students/:id` — delete student

All endpoints return JSON. Create/update responses include the student in `data`; list returns an array in `data`.

## Deploying on Render
1. Push this backend folder to a GitHub repository.
2. Create a Render Web Service with Root Directory `student-crud-backend` (or blank if this is the repo root), Build Command `npm install`, and Start Command `npm start`.
3. Set `MONGO_URI` to your MongoDB Atlas connection string.
4. After deploying the frontend, set `FRONTEND_URL` to its Render URL (for example `https://assignment3-frontend.onrender.com`).
5. Redeploy the backend.

## Joi validation

POST and PUT student requests pass through Joi validation middleware. Name and course cannot be blank, email must be valid, and age must be an integer between 1 and 120. Invalid requests return HTTP 400 with validation messages.
