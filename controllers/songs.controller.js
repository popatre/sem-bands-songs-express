const { selectAllSongs } = require("../models/songs.models");

exports.getAllSongs = async (req, res) => {
    const songs = await selectAllSongs();

    res.status(200).send({ songs });
};
