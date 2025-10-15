1️⃣ Backend Setup

Step 1: Create the Database

Open phpMyAdmin from your XAMPP control panel.

Create a new database named portfolio.

Select the portfolio database → SQL tab → run:

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Step 2: Install & Run the Server

cd backend
npm install
npm run dev


The backend will start at: http://localhost:3001

2️⃣ Frontend Setup (Portfolio)
cd frontend
npm install
npm run dev
