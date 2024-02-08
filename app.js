const express = require("express");
const { getBandById } = require("./controllers/bands.controller");
const { getAllSongs } = require("./controllers/songs.controller");
const app = express();

app.get("/api/songs", getAllSongs);
app.get("/api/bands/:id", getBandById);

module.exports = app;
