import React from 'react';
import TLink from './TLink';
import { Scramble } from '../motion/text';
import { useSiteMotion } from '../motion/SiteMotion';
import { company, disciplines, navItems } from '../content';

function Footer() {
    const { lenis } = useSiteMotion();

    const toTop = () => {
        if (lenis.current) lenis.current.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="site-footer" data-theme="dark">
            <div className="footer-grid">
                <div className="footer-col footer-lead">
                    <Scramble as="p" className="eyebrow" text="[ Have a site in mind? ]" />
                    <TLink to="/contact" label="Contact" className="footer-big-link">
                        Let&apos;s talk <span aria-hidden="true">↗</span>
                    </TLink>
                </div>

                <div className="footer-col">
                    <p className="eyebrow">Index</p>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <TLink to={item.to} label={item.label} className="u-link">
                                    {item.label}
                                </TLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="eyebrow">Disciplines</p>
                    <ul>
                        {disciplines.map((d) => (
                            <li key={d.id}>{d.title}</li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="eyebrow">Office</p>
                    <ul>
                        {company.address.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                        <li>
                            <a className="u-link" href={`mailto:${company.email}`}>{company.email}</a>
                        </li>
                        <li>
                            <a className="u-link" href={company.phoneHref}>{company.phone}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-mark" aria-hidden="true">
                <span>ASHV</span>
                <img src="/images/logo/logo-mark.png" alt="" loading="lazy" />
            </div>

            <div className="footer-base mono">
                <span>© {new Date().getFullYear()} {company.name}</span>
                <span>{company.coords}</span>
                <button type="button" className="u-link" onClick={toTop}>
                    Back to top ↑
                </button>
            </div>
        </footer>
    );
}

export default Footer;
