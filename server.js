const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();
const port = 3000;

// 📌 Enable CORS for all origins
app.use(cors({
    origin: '*', // Allows requests from any domain
    methods: ['GET', 'POST'], // Allowed request methods
    allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // Allow JSON parsing

// 📌 MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '18@438734@81Kaladin', // Replace with your actual MySQL password
    database: 'bike_app'
});

db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
    } else {
        console.log('MySQL Connected...');
    }
});

// 📌 Registration Route
app.post('/register', (req, res) => {
    const { fullname, email, username, password } = req.body;
    const query = 'INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)';

    db.query(query, [fullname, email, username, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.json({ message: 'Registration successful' });
        }
    });
});

// 📌 Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
