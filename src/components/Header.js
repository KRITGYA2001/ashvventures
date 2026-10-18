import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TLink from './TLink';
import { gsap } from '../motion/gsap';
import { useSiteMotion } from '../motion/SiteMotion';
import { scrambleTo } from '../motion/text';
import { company, navItems, pad } from '../content';

function useDelhiTime() {
    const format = () =>
        new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata',
        }).format(new Date());
    const [time, setTime] = useState(format);

    useEffect(() => {
        const id = window.setInterval(() => setTime(format()), 15000);
        return () => window.clearInterval(id);
    }, []);

    return time;
}

function Header() {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [onDark, setOnDark] = useState(false);
    const menu = useRef(null);
    const { lenis } = useSiteMotion();
    const location = useLocation();
    const time = useDelhiTime();

    useEffect(() => setOpen(false), [location.pathname]);

    // Hide on scroll down, show on scroll up; flip colours over dark sections.
    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > 160 && y > last + 2 ? true : y < last - 2 ? false : (prev) => prev);
            last = y;
            const probe = document.elementFromPoint(window.innerWidth / 2, 34);
            setOnDark(!!probe?.closest('[data-theme="dark"]'));
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [location.pathname]);

    useEffect(() => {
        const el = menu.current;
        if (!el) return;
        const links = el.querySelectorAll('.menu-link-inner');
        const meta = el.querySelectorAll('.menu-meta > *');
        if (open) {
            lenis.current?.stop();
            gsap.timeline()
                .set(el, { display: 'flex' })
                .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
                .fromTo(links, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, '-=0.35')
                .fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, '-=0.6');
        } else if (el.style.display === 'flex') {
            lenis.current?.start();
            gsap.timeline()
                .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' })
                .set(el, { display: 'none' });
        }
    }, [open, lenis]);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <header className={`site-header ${hidden && !open ? 'is-hidden' : ''} ${onDark || open ? 'is-dark' : ''}`}>
                <TLink to="/" label="Home" className="brand" aria-label="Ashv Ventures home">
                    <img src="/images/logo/logo-mark.png" alt="" />
                    <span className="brand-word">ASHV</span>
                    <span className="brand-sub mono">Ventures</span>
                </TLink>

                <div className="header-meta mono">
                    <span>New Delhi</span>
                    <span>{time} IST</span>
                </div>

                <div className="header-actions">
                    <TLink to="/contact" label="Contact" className="pill pill-solid header-cta">
                        Start a project
                    </TLink>
                    <button
                        type="button"
                        className={`menu-toggle ${open ? 'is-open' : ''}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="site-menu"
                    >
                        <span className="mono">{open ? 'Close' : 'Menu'}</span>
                        <span className="menu-bars" aria-hidden="true">
                            <i />
                            <i />
                        </span>
                    </button>
                </div>
            </header>

            <nav className="menu" id="site-menu" ref={menu} data-theme="dark" aria-label="Main" aria-hidden={!open}>
                <ul className="menu-list">
                    {navItems.map((item, i) => (
                        <li key={item.to}>
                            <TLink
                                to={item.to}
                                label={item.label}
                                className={`menu-link ${location.pathname === item.to ? 'is-active' : ''}`}
                                onClick={() => setOpen(false)}
                                onMouseEnter={(e) => scrambleTo(e.currentTarget.querySelector('.menu-link-text'), item.label, { duration: 0.45 })}
                                tabIndex={open ? 0 : -1}
                            >
                                <span className="menu-link-inner">
                                    <span className="menu-index mono">{pad(i + 1)}</span>
                                    <span className="menu-link-text">{item.label}</span>
                                </span>
                            </TLink>
                        </li>
                    ))}
                </ul>
                <div className="menu-meta">
                    <a href={`mailto:${company.email}`} tabIndex={open ? 0 : -1}>{company.email}</a>
                    <a href={company.phoneHref} tabIndex={open ? 0 : -1}>{company.phone}</a>
                    <span className="mono">{company.coords}</span>
                </div>
            </nav>
        </>
    );
}

export default Header;
