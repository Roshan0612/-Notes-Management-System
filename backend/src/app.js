const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const noteRoutes = require("./routes/note.routes");

const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");

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

app.use(notFound);

app.use(errorHandler);

module.exports = app;