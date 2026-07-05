const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "bookings.json";

// Home API
app.get("/", (req, res) => {
    res.send("Booking Service Running...");
});

// Book Ticket API
app.post("/book", (req, res) => {

    const { username, movie } = req.body;

    let bookings = JSON.parse(fs.readFileSync(FILE));

    bookings.push({
        username,
        movie,
        bookingTime: new Date().toLocaleString()
    });

    fs.writeFileSync(FILE, JSON.stringify(bookings, null, 2));

    res.json({
        success: true,
        message: "Ticket Booked Successfully"
    });

});

// View All Bookings
app.get("/bookings", (req, res) => {

    const bookings = JSON.parse(fs.readFileSync(FILE));

    res.json(bookings);

});

const PORT = 5003;

app.listen(PORT, () => {

    console.log(`Booking Service Running on Port ${PORT}`);

});
