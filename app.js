const express = require("express");
const { getBandById, getAllBands } = require("./controllers/bands.controller");
const { getSongsByArtistId } = require("./controllers/songs.controller");
const app = express();

app.get("/api/bands/:id", getBandById);
app.get("/api/bands", getAllBands);
app.get("/api/bands/:id/songs", getSongsByArtistId);

module.exports = app;
