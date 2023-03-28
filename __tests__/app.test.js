const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/bands/:id", () => {
    test("Status: 200 - returns band object by id", () => {
        return request(app)
            .get("/api/bands/1")
            .expect(200)
            .then(({ body: { band } }) => {
                expect(band.artist_id).toBe(1);
                expect(band.name).toBe("Weezer");
                expect(band.year_formed).toBe(1994);
            });
    });
});
