const db = require("../connection");

const format = require("pg-format");

const seed = ({ bandsData, songsData }) => {
    return db
        .query(`DROP TABLE IF EXISTS bands CASCADE;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS songs CASCADE;`);
        })
        .then(() => {
            return db.query(`
                        CREATE TABLE bands(
                        artist_id SERIAL PRIMARY KEY,
                        name VARCHAR,
                        year_formed INT,
                        genre VARCHAR
                        );
                `);
        })
        .then(() => {
            console.log("created bands table...");
            return db.query(`
                        CREATE TABLE songs(
                        song_id SERIAL PRIMARY KEY,
                        song_name VARCHAR,
                     duration VARCHAR,
                        released VARCHAR,
                    artist_id INT REFERENCES bands(artist_id) NOT NULL,
                        genre VARCHAR
                        );
                `);
        })
        .then(() => {
            console.log("created songs table...");
            const queryBands = format(
                `INSERT INTO bands (name, year_formed, genre)
                        VALUES %L RETURNING *;`,
                bandsData.map((band) => {
                    return [band.name, band.year_formed, band.genre];
                })
            );
            return db.query(queryBands);
        })
        .then((data) => {
            console.log("inserted bands...");
            const querySongs = format(
                `INSERT INTO songs (song_name, duration, released, artist_id, genre)
                        VALUES %L RETURNING *;`,
                songsData.map((song) => {
                    return [
                        song.song_name,
                        song.duration,
                        song.released,
                        song.artist_id,
                        song.genre,
                    ];
                })
            );
            return db.query(querySongs);
        })
        .then((data) => {
            console.log("inserted songs...");
        });
};

module.exports = seed;
