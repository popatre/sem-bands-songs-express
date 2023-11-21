const db = require("../connection");

const format = require("pg-format");

const seed = ({ bandsData, songsData, genreData }) => {
    return db
        .query(`DROP TABLE IF EXISTS genres CASCADE;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS bands CASCADE;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS songs CASCADE;`);
        })
        .then(() => {
            return db.query(`
                        CREATE TABLE genres(
                        genre_id SERIAL PRIMARY KEY,
                        genre VARCHAR
                        );
                `);
        })
        .then(() => {
            return db.query(`
                        CREATE TABLE bands(
                        artist_id SERIAL PRIMARY KEY,
                        name VARCHAR,
                        year_formed INT,
                        genre_id INT REFERENCES genres(genre_id)
                        );
                `);
        })
        .then(() => {
            // console.log("created bands table...");
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
        .then((data) => {
            // console.log("inserted bands...");
            const querySongs = format(
                `INSERT INTO genres (genre_id, genre)
                        VALUES %L RETURNING *;`,
                genreData.map((genre) => {
                    return [genre.genre_id, genre.genre];
                })
            );
            return db.query(querySongs);
        })
        .then(() => {
            // console.log("created songs table...");
            const queryBands = format(
                `INSERT INTO bands (name, year_formed, genre_id)
                        VALUES %L RETURNING *;`,
                bandsData.map((band) => {
                    return [band.name, band.year_formed, band.genre_id];
                })
            );
            return db.query(queryBands);
        })
        .then((data) => {
            // console.log("inserted bands...");
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
            // console.log("inserted songs...");
        });
};

module.exports = seed;
