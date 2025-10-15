import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; // or './ThemeContent.jsx'
import axios from 'axios';

// --- Theme Toggle Button ---
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid #ccc',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

// --- Main Dashboard Component ---
function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    axios
      .get('http://localhost:3001/api/contacts')
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.log('Error fetching data:', err));
  }, [theme]);

  return (
    <div className="dashboard" style={{ padding: '40px', fontFamily: 'Poppins, sans-serif' }}>

      <div className="container">
        <div className="dashboard-header">
          <h1 className="sub-title">Contact Submissions</h1>
          <ThemeToggleButton />
        </div>

        <div className="dashboard-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>{sub.email}</td>
                    <td>{sub.message}</td>
                    <td>{new Date(sub.submitted_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No submissions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <a href="/" className="btn back-to-portfolio-btn">
          Back to Portfolio
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
