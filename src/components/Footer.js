import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img src="/images/logo/Logo.PNG" alt="Ashv Ventures Logo" />
                            <span>ASHV Ventures</span>
                        </div>
                        <p>Leading the way in design, construction, and material supply since 2025.</p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Our Services</h3>
                        <ul>
                            <li><a href="#services">Design</a></li>
                            <li><a href="#services">Construction</a></li>
                            <li><a href="#services">Material Supply</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Contact Info</h3>
                        <ul className="contact-info">
                            <li>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>H. No. 178-B, Ground Floor<br />Basant Nagar, New Delhi – 110057</span>
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i>
                                <span>contact@ashvventures.com</span>
                            </li>
                            <li>
                                <i className="fas fa-phone"></i>
                                <span>+91 8700832180</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2025 Ashv Ventures. All rights reserved.</p>
                    <p>Designed with <i className="fas fa-heart"></i> for Excellence</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
