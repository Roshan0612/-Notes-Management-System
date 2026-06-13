const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running"
  });
});

app.use("/api/notes", noteRoutes);

module.exports = app;