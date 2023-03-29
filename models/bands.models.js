const db = require("../db/connection");

exports.selectBandById = (id) => {
    return db
        .query(`SELECT * FROM bands WHERE artist_id = $1`, [id])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.selectAllBands = (genre) => {
    const queryValues = [];

    let bandQueryStr = `
    SELECT bands.* , COUNT(songs.artist_id)::INT AS song_count 
    FROM bands
    LEFT JOIN songs 
    ON bands.artist_Id = songs.artist_id `;

    if (genre) {
        bandQueryStr += `WHERE bands.genre = $1 `;
        queryValues.push(genre);
    }

    bandQueryStr += `GROUP BY bands.artist_id`;

    return db.query(bandQueryStr, queryValues).then(({ rows }) => {
        return rows;
    });
};
