const { selectSongsByArtistId } = require("../models/songs.models");
const { checkExists } = require("../utils/utils");

exports.getSongsByArtistId = (req, res, next) => {
    const { id } = req.params;

    const pendingSongsByArtist = selectSongsByArtistId(id);
    // const pendingDoesArtistExist = checkExists("bands", "artist_id", id);

    Promise.all([pendingSongsByArtist])
        .then(([songs, doesExist]) => {
            res.status(200).send({ songs });
        })
        .catch((err) => {
            next(err);
        });
};

exports.checkIfBandsExists = (req, res, next) => {
    return checkExists("bands", "artist_id", req.params.id)
        .then(() => {
            next();
        })
        .catch(next);
};

exports.checkIfGenreExists = (req, res, next) => {
    const { genre } = req.query;

    if (!genre) next();

    return checkExists("genres", "genre", genre)
        .then(() => {
            next();
        })
        .catch(next);
};
