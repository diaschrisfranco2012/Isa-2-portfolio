import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext.jsx'; 
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'; 


function FloatingIcons() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const icons = [
    { class: 'fa-brands fa-react', factor: 0.02 }, { class: 'fa-brands fa-js-square', factor: -0.03 },
    { class: 'fa-brands fa-html5', factor: 0.015 }, { class: 'fa-brands fa-css3-alt', factor: -0.025 },
    { class: 'fa-solid fa-code', factor: 0.01 }, { class: 'fa-solid fa-terminal', factor: -0.018 },
  ];

  return (
    <div className="floating-icons-container">
      {icons.map((icon, index) => {
        const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 100 * icon.factor;
        const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 100 * icon.factor;
        return <i key={index} className={`${icon.class} floating-icon icon-${index + 1}`} style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }} />;
      })}
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>;
}

function Header() {
  return (
    <div id="header">
      <FloatingIcons />
      <div className="container">
        <nav>
          <img src="/images/logo2.webp" alt="logo" className="logo" />
          <div className="nav-right-items">
            <ul>
              <li><a href="/#header">Home</a></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#portfolio">Portfolio</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
            <ThemeToggleButton />
          </div>
        </nav>
        <div className="headertext">
          <p>UI/UX & Web Developer</p>
          <h1>Hi, I'm <span>Mevin</span><br />from India.</h1>
        </div>
      </div>
    </div>
  );
}

function About() {
    const [activeTab, setActiveTab] = useState('Skills');
    const tabContent = {
        Skills: [
          { title: "UI/UX Design", desc: "Crafting intuitive and beautiful user interfaces that users love." },
          { title: "React Development", desc: "Building dynamic, high-performance web applications from scratch." },
          { title: "Responsive Design", desc: "Ensuring seamless and engaging experiences on all devices." }
        ],
        Experience: [
          { title: "Student Developer", desc: "Actively learning and building full-stack projects with modern technologies." },
          { title: "Freelance Projects", desc: "Open to freelance opportunities and new challenges." }
        ],
        Education: [
          { title: "2020", desc: "10th Board: Cleared with Distinction" },
          { title: "2022", desc: "12th Board: Cleared with First Class" },
          { title: "Pursuing", desc: "Bachelor of Computer Applications (BCA)" }
        ]
      };
    const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15,},},};
    const itemVariants = { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }, };
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="about-col-1">
                        <motion.img src="/images/phone-background.jpg" alt="About Me" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} />
                    </div>
                    <div className="about-col-2">
                        <h1 className="sub-title">About Me</h1>
                        <p>A passionate developer and designer with a keen eye for detail, dedicated to creating seamless and engaging digital experiences. I thrive on solving complex problems and continuously expanding my skillset.</p>
                        <div className="tab-titles">
                            <p className={`tab-links ${activeTab === 'Skills' ? 'active-link' : ''}`} onClick={() => setActiveTab('Skills')}>Skills</p>
                            <p className={`tab-links ${activeTab === 'Experience' ? 'active-link' : ''}`} onClick={() => setActiveTab('Experience')}>Experience</p>
                            <p className={`tab-links ${activeTab === 'Education' ? 'active-link' : ''}`} onClick={() => setActiveTab('Education')}>Education</p>
                        </div>
                        <div className="tab-contents">
                            <AnimatePresence mode="wait">
                                <motion.ul key={activeTab} variants={listVariants} initial="hidden" animate="visible" exit="hidden" >
                                    {tabContent[activeTab].map((item, index) => (<motion.li key={index} variants={itemVariants}><span>{item.title}</span>{item.desc}</motion.li>))}
                                </motion.ul>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Services() {
  return (
    <div id="services">
      <div className="container">
        <h1 className="sub-title">My Services</h1>
        <div className="services-list">
          <div> <i className="fa-solid fa-code"></i> <h2>Web Development</h2> <p>I build beautiful and responsive websites that are intuitive and easy to use.</p> <a href="#">Learn more</a> </div>
          <div> <i className="fa-solid fa-crop"></i> <h2>UI/UX Design</h2> <p>Creating seamless user experiences for web and mobile applications.</p> <a href="#">Learn more</a> </div>
          <div> <i className="fa-brands fa-app-store"></i> <h2>App Design</h2> <p>Designing modern and user-friendly interfaces for iOS and Android.</p> <a href="#">Learn more</a> </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div id="portfolio">
      <div className="container">
        <h1 className="sub-title">My Work</h1>
        <div className="work-list">
          <div className="work"> <img src="/images/work-1.png" alt="Work 1" /> <div className="layer"> <h3>Social Media App</h3> <p>An app connecting people through shared interests.</p> <a href="#"><i className="fa-solid fa-link"></i></a> </div> </div>
          <div className="work"> <img src="/images/work-2.png" alt="Work 2" /> <div className="layer"> <h3>Music App</h3> <p>A sleek music player with personalized playlists.</p> <a href="#"><i className="fa-solid fa-link"></i></a> </div> </div>
          <div className="work"> <img src="/images/work-3.png" alt="Work 3" /> <div className="layer"> <h3>Shopping App</h3> <p>An online store with a seamless checkout experience.</p> <a href="#"><i className="fa-solid fa-link"></i></a> </div> </div>
        </div>
        <a href="#" className="btn">See more</a>
      </div>
    </div>
  );
}

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Submitting...');
        axios.post('http://localhost:3001/api/contact', formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    setStatus('Message sent successfully!');
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    setStatus('An error occurred. Please try again.');
                }
            })
            .catch(err => {
                console.log("Error sending data:", err);
                setStatus('Failed to send message. Please check the connection.');
            });
    };
    return (
        <div id="contact">
            <div className="container">
                <div className="row">
                    <div className="contact-left">
                        <h1 className="sub-title">Contact Me</h1>
                        <p><i className="fa-solid fa-paper-plane"></i> contact@example.com</p>
                        <p><i className="fa-solid fa-phone"></i> 0123456789</p>
                        <div className="social-icons">
                          <a href="#"><i className="fa-brands fa-facebook"></i></a>
                          <a href="#"><i className="fa-brands fa-twitter-square"></i></a>
                          <a href="#"><i className="fa-brands fa-instagram"></i></a>
                          <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                        <a href="/Mevin_CV.pdf" download className="btn btn2">Download CV</a>
                    </div>
                    <div className="contact-right">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                            <textarea name="message" rows="6" placeholder="Your Message.." value={formData.message} onChange={handleChange} required></textarea>
                            <button type="submit" className="btn btn2">Submit</button>
                            {status && <p className="form-status">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Footer() {
  return (
    <div className="copyright">
      <p>Crafted with <i className="fa-solid fa-heart"></i> by Mevin.</p>
    </div>
  );
}

function Dashboard() {
    const [submissions, setSubmissions] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        axios.get('http://localhost:3001/api/contacts')
            .then(res => {
                setSubmissions(res.data);
            })
            .catch(err => console.log("Error fetching data:", err));
    }, []);

    return (
        <div className={`dashboard ${theme}`}>
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
                            {submissions.length > 0 ? submissions.map(sub => (
                                <tr key={sub.id}>
                                    <td>{sub.name}</td>
                                    <td>{sub.email}</td>
                                    <td>{sub.message}</td>
                                    <td>{new Date(sub.submitted_at).toLocaleString()}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4">No submissions yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 <a href="/" className="btn back-to-portfolio-btn">Back to Portfolio</a>
            </div>
        </div>
    );
}

// --- Component for the main portfolio view ---
function PortfolioView() {
    return (
        <>
            <Header />
            <main>
                <About />
                <Services />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

// --- Main App Component with Page Routing Logic ---
function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Routes>
      {/* Route for your main portfolio page */}
      <Route path="/" element={<PortfolioView />} />

      {/* Route for your new dashboard page */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;