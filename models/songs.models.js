const db = require("../db/connection");

exports.selectSongsByArtistId = (id) => {
    return db
        .query(`SELECT * FROM songs where artist_id = $1`, [id])
        .then(({ rows }) => {
            return rows;
        });
};
