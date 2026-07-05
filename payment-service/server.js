const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "payments.json";

// Home API
app.get("/", (req, res) => {
    res.send("Payment Service Running...");
});

// Payment API
app.post("/pay", (req, res) => {

    const { username, movie, amount } = req.body;

    let payments = JSON.parse(fs.readFileSync(FILE));

    payments.push({
        username,
        movie,
        amount,
        paymentTime: new Date().toLocaleString(),
        status: "Success"
    });

    fs.writeFileSync(FILE, JSON.stringify(payments, null, 2));

    res.json({
        success: true,
        message: "Payment Successful"
    });

});

// View Payments
app.get("/payments", (req, res) => {

    const payments = JSON.parse(fs.readFileSync(FILE));

    res.json(payments);

});

const PORT = 5004;

app.listen(PORT, () => {

    console.log(`Payment Service Running on Port ${PORT}`);

});
