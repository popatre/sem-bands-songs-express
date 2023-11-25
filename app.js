const express = require("express");
const { getBandById, getAllBands } = require("./controllers/bands.controller");
const {
    getSongsByArtistId,
    checkIfBandsExists,
    checkIfGenreExists,
} = require("./controllers/songs.controller");

const app = express();

app.get("/api/bands/:id", getBandById);
app.get("/api/bands", checkIfGenreExists, getAllBands);
app.get("/api/bands/:id/songs", checkIfBandsExists, getSongsByArtistId);

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err.code === "22P02") {
        res.status(400).send({ msg: "bad request" });
    } else if (err.code === "23052") {
        res.status(404).send({ msg: "not found" });
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.log(err.code);
    res.status(500).send({ msg: "server down" });
});

module.exports = app;
