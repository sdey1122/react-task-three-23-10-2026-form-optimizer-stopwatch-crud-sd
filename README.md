# Assignment 3 — React + Express Student CRUD

This repository contains both app folders:

- `frontend/`: React + TypeScript + MUI + Axios + React Router + Yup client-side validation
- `backend/`: Express + MongoDB/Mongoose Student CRUD API + Joi request validation

## Run locally

Prerequisites: Node.js and MongoDB running locally.

### Backend

```bash
cd backend
npm install
# .env is included as a local starter. Edit MONGO_URI if needed.
npm run dev
```

Backend URL: `http://localhost:4891`

### Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

The frontend's local `.env` uses `VITE_API_URL=/api`; Vite proxies `/api` to `http://localhost:4891`.

## Deploy one GitHub repo to two platforms

Push the whole `Assignment-3` folder to ONE GitHub repository. Do not commit `.env` files; `.gitignore` excludes them.

### Backend on Render

Create a Render **Web Service** connected to this same repository:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variable: `MONGO_URI` = your MongoDB Atlas connection string
- Environment variable: `FRONTEND_URL` = your deployed Vercel frontend origin (e.g. `https://assignment-3.vercel.app`)

Render supplies `PORT` automatically.

### Frontend on Vercel

Create a Vercel **Project** connected to the same repository:

- Root Directory: `frontend`
- Framework: Vite (auto-detected)
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable: `VITE_API_URL` = `https://YOUR-RENDER-BACKEND.onrender.com/api`

Deploy/redeploy the frontend after setting `VITE_API_URL`. Redeploy the backend after setting `FRONTEND_URL`.

## API endpoints

- `GET /api/students`
- `GET /api/students/:id`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`

Student fields: `name`, `email`, `age`, `course`.

## Validation

- Frontend Yup schema: `frontend/src/services/validation/student.validation.ts`. It validates required name, valid email format, integer age from 1–120, and non-empty course, then displays field-level errors in the form.
- Backend Joi middleware: `backend/app/middleware/validation/student.validation.js`. It validates POST and PUT request bodies and responds with HTTP 400 plus validation messages for invalid fields.
- Mongoose model validation remains enabled as a final database-level safeguard.
