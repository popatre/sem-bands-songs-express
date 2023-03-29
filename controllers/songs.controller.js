const { selectSongsByArtistId } = require("../models/songs.models");

exports.getSongsByArtistId = (req, res, next) => {
    const { id } = req.params;
    selectSongsByArtistId(id)
        .then((songs) => {
            res.status(200).send({ songs });
        })
        .catch(next);
};
