import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Header scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                header.style.padding = '10px 0';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                header.style.padding = '15px 0';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <div className="nav-wrapper">
                        <Link to="/" className="logo" onClick={closeMenu}>
                            <img src="/images/logo/Logo.PNG" alt="Ashv Ventures Logo" />
                            <span>ASHV Ventures</span>
                        </Link>
                        <button 
                            className="nav-toggle" 
                            id="navToggle" 
                            onClick={toggleMenu}
                            aria-label="Toggle navigation"
                        >
                            <span style={{
                                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                            }}></span>
                            <span style={{
                                opacity: menuOpen ? '0' : '1'
                            }}></span>
                            <span style={{
                                transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                            }}></span>
                        </button>
                        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
                            <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
                            <li><Link to="/about" className={isActive('/about')} onClick={closeMenu}>About Us</Link></li>
                            <li><Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
