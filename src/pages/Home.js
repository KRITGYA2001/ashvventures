import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuildingAnimation from '../components/BuildingAnimation';

function Home() {
    const [countersAnimated, setCountersAnimated] = useState(false);

    useEffect(() => {
        // Scroll animations
        const animateElements = document.querySelectorAll('.service-card, .stat-card, .process-step');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Counter animation
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    setCountersAnimated(true);
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));

        return () => {
            observer.disconnect();
            counterObserver.disconnect();
        };
    }, [countersAnimated]);

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target;
            }
        };
        updateCounter();
    };

    return (
        <div className="home-page">

            {/* ── HERO with 3D Building Animation ── */}
            <section className="hero-3d">
                <div className="hero-3d-canvas">
                    <BuildingAnimation />
                </div>

                {/* Gradient overlay */}
                <div className="hero-3d-overlay" />

                {/* Content */}
                <div className="hero-3d-content">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        Design · Construction · Material Supply
                    </div>

                    <h1 className="hero-3d-title">
                        Building Dreams,<br />
                        <span className="hero-accent">Creating Excellence</span>
                    </h1>

                    <p className="hero-3d-sub">
                        Your Trusted Partner in Design, Construction &amp; Material Supply
                    </p>

                    <div className="hero-3d-buttons">
                        <Link to="/about" className="btn btn-glow">Explore Our Work</Link>
                        <Link to="/contact" className="btn btn-outline-white">Get a Quote</Link>
                    </div>

                    <div className="hero-scroll-hint">
                        <div className="scroll-line" />
                        <span>Scroll to explore</span>
                    </div>
                </div>

                {/* Corner stat pills */}
                <div className="hero-stats-strip">
                    <div className="hero-stat-pill">
                        <strong>100%</strong><span>Client Satisfaction</span>
                    </div>
                    <div className="hero-stat-pill">
                        <strong>3</strong><span>Core Services</span>
                    </div>
                    <div className="hero-stat-pill">
                        <strong>2</strong><span>Trusted Partners</span>
                    </div>
                    <div className="hero-stat-pill">
                        <strong>Est. 2025</strong><span>Founded</span>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="services">
                <div className="container">
                    <div className="section-header">
                        <p className="section-eyebrow">What We Do</p>
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-subtitle">Comprehensive Solutions for Your Construction Needs</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-card-top">
                                <div className="service-icon">
                                    <i className="fas fa-pencil-ruler" />
                                </div>
                                <span className="service-num">01</span>
                            </div>
                            <h3>Design</h3>
                            <p>Innovative and functional design solutions tailored to your vision and requirements.</p>
                            <div className="service-line" />
                        </div>

                        <div className="service-card">
                            <div className="service-card-top">
                                <div className="service-icon">
                                    <i className="fas fa-hard-hat" />
                                </div>
                                <span className="service-num">02</span>
                            </div>
                            <h3>Construction</h3>
                            <p>Expert construction services with attention to quality, safety, and timely delivery.</p>
                            <div className="service-line" />
                        </div>

                        <div className="service-card">
                            <div className="service-card-top">
                                <div className="service-icon">
                                    <i className="fas fa-cubes" />
                                </div>
                                <span className="service-num">03</span>
                            </div>
                            <h3>Material Supply</h3>
                            <p>Premium quality construction materials sourced from trusted manufacturers.</p>
                            <div className="service-line" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section className="why-choose">
                <div className="container">
                    <div className="why-choose-content">
                        <div className="why-choose-text">
                            <p className="section-eyebrow">Why Us</p>
                            <h2>Why Choose Ashv Ventures?</h2>
                            <p>Since our inception in December 2025, we've been committed to delivering excellence in every project.</p>

                            <div className="features-list">
                                {[
                                    { icon: 'fa-users-cog', title: 'Expert Team', desc: 'Skilled professionals dedicated to your project\'s success' },
                                    { icon: 'fa-shield-alt', title: 'Quality Assurance', desc: 'Uncompromising commitment to quality in every aspect' },
                                    { icon: 'fa-clock', title: 'Timely Delivery', desc: 'Projects completed on schedule, every time' },
                                    { icon: 'fa-tags', title: 'Competitive Pricing', desc: 'Best value for your investment without hidden costs' },
                                ].map(({ icon, title, desc }) => (
                                    <div className="feature-item" key={title}>
                                        <div className="feature-icon-wrap">
                                            <i className={`fas ${icon}`} />
                                        </div>
                                        <div>
                                            <h4>{title}</h4>
                                            <p>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/about" className="btn btn-primary">Discover More</Link>
                        </div>

                        <div className="why-choose-stats">
                            <div className="stat-card">
                                <h3><span className="counter" data-target="100">0</span>%</h3>
                                <p>Client Satisfaction</p>
                            </div>
                            <div className="stat-card">
                                <h3><span className="counter" data-target="3">0</span></h3>
                                <p>Core Services</p>
                            </div>
                            <div className="stat-card">
                                <h3><span className="counter" data-target="2">0</span></h3>
                                <p>Dedicated Partners</p>
                            </div>
                            <div className="stat-card">
                                <h3>Since <span className="counter" data-target="2025">0</span></h3>
                                <p>Years of Trust</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="process-section">
                <div className="container">
                    <div className="section-header">
                        <p className="section-eyebrow">How We Work</p>
                        <h2 className="section-title">Our Process</h2>
                        <p className="section-subtitle">Simple, transparent steps to bring your project to life</p>
                    </div>
                    <div className="process-grid">
                        {[
                            { num: '01', icon: 'fa-comments', title: 'Consultation', desc: 'We discuss your requirements, goals, and vision in detail.' },
                            { num: '02', icon: 'fa-drafting-compass', title: 'Design & Plan', desc: 'Our experts craft a tailored plan and design blueprint.' },
                            { num: '03', icon: 'fa-hammer', title: 'Build', desc: 'Skilled teams execute the build with precision and care.' },
                            { num: '04', icon: 'fa-check-double', title: 'Handover', desc: 'Final quality check and seamless project handover to you.' },
                        ].map(({ num, icon, title, desc }) => (
                            <div className="process-step" key={num}>
                                <div className="process-step-num">{num}</div>
                                <div className="process-icon">
                                    <i className={`fas ${icon}`} />
                                </div>
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta">
                <div className="cta-bg-grid" />
                <div className="container">
                    <div className="cta-content">
                        <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Let's Build Together</p>
                        <h2>Ready to Start Your Next Project?</h2>
                        <p>Let's work together to bring your vision to life</p>
                        <Link to="/contact" className="btn btn-glow">Contact Us Today</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
