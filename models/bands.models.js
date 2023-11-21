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
    SELECT bands.*, genres.genre  
    FROM bands 
    LEFT JOIN genres 
    ON bands.genre_id = genres.genre_id `;

    if (genre) {
        bandQueryStr += `WHERE genres.genre = $1 `;
        queryValues.push(genre);
    }

    // bandQueryStr += `GROUP BY bands.artist_id`;

    return db.query(bandQueryStr, queryValues).then(({ rows }) => {
        console.log(rows, "****");
        return rows;
    });
};
