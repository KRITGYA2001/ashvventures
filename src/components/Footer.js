import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const serviceLinks = [
    'Design strategy',
    'Construction delivery',
    'Material coordination',
];

const contactItems = [
    { label: 'Email', value: 'contact@ashvventures.com', href: 'mailto:contact@ashvventures.com' },
    { label: 'Phone', value: '+91 8700832180', href: 'tel:+918700832180' },
    { label: 'Office', value: 'Basant Nagar, New Delhi', href: '/contact' },
];

function Footer() {
    return (
        <footer className="footer footer-v2">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-intro">
                        <div className="footer-logo">
                            <img src="/images/logo/Logo.PNG" alt="Ashv Ventures Logo" />
                            <div className="footer-logo-copy">
                                <strong>ASHV Ventures</strong>
                                <span>Design, construction, and material supply</span>
                            </div>
                        </div>
                        <p>
                            A more connected project experience built around premium execution, clear communication,
                            and disciplined delivery.
                        </p>
                        <Link to="/contact" className="btn footer-cta">Discuss your project</Link>
                    </div>

                    <div className="footer-columns">
                        <div className="footer-section">
                            <h3>Navigation</h3>
                            <ul>
                                {quickLinks.map((item) => (
                                    <li key={item.to}>
                                        <Link to={item.to}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>Focus</h3>
                            <ul>
                                {serviceLinks.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>Contact</h3>
                            <ul className="footer-contact-list">
                                {contactItems.map((item) => (
                                    <li key={item.label}>
                                        <span>{item.label}</span>
                                        {item.href.startsWith('/') ? (
                                            <Link to={item.href}>{item.value}</Link>
                                        ) : (
                                            <a href={item.href}>{item.value}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Ashv Ventures. All rights reserved.</p>
                    <p>Built for premium project delivery in New Delhi.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
