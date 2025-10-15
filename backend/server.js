const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; 
app.use(cors()); 
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'portfolio'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database!');
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the portfolio backend API. The server is running correctly." });
});

app.get('/api/contacts', (req, res) => {
    const sql = "SELECT * FROM contacts ORDER BY submitted_at DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Server Error while fetching contacts:", err);
            return res.status(500).json({ Error: "Error fetching data from the server" });
        }
        return res.json(data);
    });
});

app.post('/api/contact', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.status(400).json({ Error: "Please provide name, email, and message." });
    }

    const sql = "INSERT INTO contacts (`name`, `email`, `message`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.message
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Server Error while inserting contact:", err);
            return res.status(500).json({ Error: "Error inserting data into the server" });
        }
        return res.status(200).json({ Status: "Success" });
    });
});


// 5. Start the server and listen for requests
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
