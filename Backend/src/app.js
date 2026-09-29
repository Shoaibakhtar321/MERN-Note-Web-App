const express = require("express");
const cors = require("cors");
const Note = require("./models/note.model");
const app = express();
const noteRoute = require("./routes/note.routes");

app.use(express.json());
app.use(cors());
app.use("/api", noteRoute);

module.exports = app;
