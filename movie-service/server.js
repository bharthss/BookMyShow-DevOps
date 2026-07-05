const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

const FILE = "movies.json";

// Home API
app.get("/", (req, res) => {
    res.send("Movie Service Running...");
});

// Get All Movies
app.get("/movies", (req, res) => {

    const movies = JSON.parse(fs.readFileSync(FILE));

    res.json(movies);

});

const PORT = 5002;

app.listen(PORT, () => {

    console.log(`Movie Service Running on Port ${PORT}`);

});
