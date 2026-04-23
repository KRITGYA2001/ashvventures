import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen((open) => !open);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <nav className="navbar">
                <div className="container">
                    <div className={`nav-wrapper ${menuOpen ? 'nav-wrapper-open' : ''}`}>
                        <Link to="/" className="logo" onClick={closeMenu}>
                            <img src="/images/logo/Logo.PNG" alt="Ashv Ventures Logo" />
                            <div className="logo-copy">
                                <strong>ASHV Ventures</strong>
                                <span>Design, build, supply</span>
                            </div>
                        </Link>

                        <div className="nav-desktop">
                            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link to={item.path} className={isActive(item.path)} onClick={closeMenu}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/contact" className="btn nav-cta">Start a project</Link>
                        </div>

                        <button
                            className={`nav-toggle ${menuOpen ? 'nav-toggle-open' : ''}`}
                            id="navToggle"
                            onClick={toggleMenu}
                            aria-label="Toggle navigation"
                            aria-expanded={menuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
