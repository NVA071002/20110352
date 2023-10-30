const express = require("express");

const { getAllPlanets } = require("./planets.controllers");

const plantetsRouter = express.Router();

plantetsRouter.get("/", getAllPlanets);

module.exports = plantetsRouter;
