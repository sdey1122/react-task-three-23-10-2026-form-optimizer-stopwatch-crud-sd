require("dotenv").config();
const express = require("express");
const connectDB = require("./app/config/db");

const app = express();

// Allow the deployed frontend and local Vite dev server to call this API.
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    origin &&
    (allowedOrigins.includes(origin) || origin === "http://localhost:5173")
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Student CRUD API is running" });
});

app.use("/api/students", require("./app/routes/student.route"));

const PORT = process.env.PORT || 4891;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Student API server running at http://localhost:${PORT}`);
  });
}

startServer();
