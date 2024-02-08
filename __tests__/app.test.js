const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/songs", () => {
    test("Status: 200 - responds with all songs", () => {
        return request(app)
            .get("/api/songs")
            .expect(200)
            .then((data) => {
                expect(data.body.songs).toHaveLength(8);
                data.body.songs.forEach((song) => {
                    expect(song).toMatchObject({
                        song_id: expect.any(Number),
                        song_name: expect.any(String),
                        duration: expect.any(String),
                        released: expect.any(String),
                        artist_id: expect.any(Number),
                        genre: expect.any(String),
                    });
                });
            });
    });
});

describe("/api/bands/:id", () => {
    test("Status: 200 - responds with band object for requested id", () => {
        const bandId = 1;
        return request(app)
            .get(`/api/bands/${bandId}`)
            .expect(200)
            .then(({ body: { band } }) => {
                expect(band.artist_id).toBe(1);
                expect(band.name).toBe("Weezer");
                expect(band.year_formed).toBe(1992);
                expect(band.genre).toBe("rock");

                expect(band).toMatchObject({
                    artist_id: bandId,
                    name: "Weezer",
                    year_formed: 1992,
                    genre: "rock",
                });
                expect(band).toEqual(
                    expect.objectContaining({
                        artist_id: 1,
                        name: expect.any(String),
                        year_formed: expect.any(Number),
                        genre: expect.any(String),
                    })
                );
            });
    });
});
