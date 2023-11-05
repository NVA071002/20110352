const supertest = require('supertest');
const app = require('../app');


const launchPayload = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    launchDate: "December 27, 2030",
};

describe('GET /launches', () => {
    describe('get all launches', () => {
        it("should response with a 200 status code", async () => {
            await supertest(app).get("/launches").expect(200)
        })
    })
})

describe('POST /launches', () => {
    describe('create launch', () => {
        it("should response with a 201 status code", async () => {
            let newFlightNumber = 100
            await supertest(app).post("/launches").send(launchPayload)
                .expect(201, {
                    mission: "Kepler Exploration X",
                    rocket: "Explorer IS1",
                    target: "Kepler-442 b",
                    launchDate: "2030-12-26T17:00:00.000Z",
                    success: true,
                    upcoming: true,
                    customer: [
                        "Zero To Mastery",
                        "NASA"
                    ],
                    flightNumber: newFlightNumber + 1
                })
        })
        describe('create launch with missing argument', () => {
            it("should response with a 400 status code", async () => {
                await supertest(app).post("/launches")
                    .expect(400)
            })
        })
    })
})


describe("DELETE /launches/:id", () => {
    describe("delete launch by id", () => {
        it("should response with a 200 status code", async () => {
            const launchId = 100;
            await supertest(app).delete(`/launches/${launchId}`).
                expect(200);
        })
    }
    )
})