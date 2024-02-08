const db = require("../db/connection");

exports.selectAllSongs = async () => {
    const { rows } = await db.query(`SELECT * FROM songs;`);
    return rows;
};
