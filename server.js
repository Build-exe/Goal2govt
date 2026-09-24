const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Home route
app.get("/", (req, res) => {
    res.send("Goal2Govt Backend is running!");
});

// Question Papers API
app.get("/api/question-papers", (req, res) => {
    const sql = "SELECT * FROM question_papers ORDER BY year DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err.message);

            return res.status(500).json({
                error: "Failed to fetch question papers"
            });
        }

        res.json(results);
    });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});