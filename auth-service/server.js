const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "users.json";

// Create users.json if it doesn't exist
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

// Home
app.get("/", (req, res) => {
    res.send("Auth Service Running...");
});

// Register API
app.post("/register", (req, res) => {

    const { username, password } = req.body;

    let users = JSON.parse(fs.readFileSync(FILE));

    const exists = users.find(user => user.username === username);

    if (exists) {
        return res.json({
            success: false,
            message: "User Already Exists"
        });
    }

    users.push({
        username,
        password
    });

    fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

    res.json({
        success: true,
        message: "Registration Successful"
    });

});

// Login API
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    let users = JSON.parse(fs.readFileSync(FILE));

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {

        res.json({
            success: true,
            message: "Login Successful"
        });

    } else {

        res.json({
            success: false,
            message: "Invalid Username or Password"
        });

    }

});

const PORT = 5001;

app.listen(PORT, () => {

    console.log(`Auth Service Running on Port ${PORT}`);

});
