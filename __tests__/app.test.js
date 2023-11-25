const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/bands/:id", () => {
    test("Status: 200 - responds with band object by id", () => {
        return request(app)
            .get("/api/bands/1")
            .expect(200)
            .then(({ body: { band } }) => {
                expect(band.artist_id).toBe(1);
                expect(band.name).toBe("Weezer");
                expect(band.year_formed).toBe(1992);
            });
    });
});

describe("/api/bands", () => {
    test("Status: 200 - responds with  all bands", () => {
        return request(app)
            .get("/api/bands")
            .expect(200)
            .then(({ body: { bands } }) => {
                expect(bands).toHaveLength(6);
                bands.forEach((band) => {
                    expect(band).toMatchObject({
                        artist_id: expect.any(Number),
                        name: expect.any(String),
                        year_formed: expect.any(Number),
                        genre: expect.any(String),
                    });
                });
            });
    });
    test("Status: 200 - responds with bands matching genre query", () => {
        return request(app)
            .get("/api/bands?genre=pop")
            .expect(200)
            .then(({ body: { bands } }) => {
                expect(bands).toHaveLength(3);
                bands.forEach((band) => {
                    expect(band).toMatchObject({
                        artist_id: expect.any(Number),
                        name: expect.any(String),
                        year_formed: expect.any(Number),
                        genre: "pop",
                    });
                });
            });
    });
    test("Status: 404 - genre query not found", () => {
        return request(app)
            .get("/api/bands?genre=notAGenre")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("not found");
            });
    });
    test("Status: 200 - responds with empty array for valid genre with no bands", () => {
        return request(app)
            .get("/api/bands?genre=punk")
            .expect(200)
            .then(({ body }) => {
                expect(body.bands).toEqual([]);
            });
    });
});

describe("/api/bands/:id/songs", () => {
    test("Status 200: responds with all songs by artist id", () => {
        return request(app)
            .get("/api/bands/1/songs")
            .expect(200)
            .then(({ body: { songs } }) => {
                expect(songs).toHaveLength(3);
                songs.forEach((song) => {
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
    test("Status 400: invalid artist id", () => {
        return request(app)
            .get("/api/bands/notAnId/songs")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("bad request");
            });
    });
    test("Status 404: artist id not found ", () => {
        return request(app)
            .get("/api/bands/9999/songs")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("not found");
            });
    });
    test("Status 200: responds with empty array when artist id has no songs associated ", () => {
        return request(app)
            .get("/api/bands/5/songs")
            .expect(200)
            .then(({ body: { songs } }) => {
                expect(songs).toEqual([]);
            });
    });
});
