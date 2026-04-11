import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const values = [
    'Clarity in communication',
    'Respect for timelines',
    'Detail-led quality',
    'Long-term accountability',
];

function About() {
    useEffect(() => {
        const items = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page about-v2">
            <section className="page-hero page-hero-v2">
                <div className="container">
                    <p className="section-eyebrow">About</p>
                    <h1>A compact team built for premium project execution.</h1>
                    <p className="page-hero-copy">
                        Ashv Ventures combines design, construction, and material supply so clients do not have to manage
                        fragmented vendors across the same project.
                    </p>
                </div>
            </section>

            <section className="about-v2-intro reveal-on-scroll" data-reveal>
                <div className="container about-v2-grid">
                    <article className="about-v2-copy premium-panel">
                        <p className="section-eyebrow">Who we are</p>
                        <h2>One team. One quality standard.</h2>
                        <p>
                            We operate from New Delhi and focus on disciplined execution, whether the work starts with a design
                            brief, a construction challenge, or a material-sourcing requirement.
                        </p>
                        <p>
                            Our role is to simplify decision-making while maintaining a premium finish across planning, delivery,
                            and final handover.
                        </p>
                    </article>

                    <article className="about-v2-gallery premium-panel">
                        <figure className="about-v2-image about-v2-image-main">
                            <img src="/images/slides/about1.jpg" alt="Ashv Ventures site detail" loading="lazy" />
                        </figure>
                        <figure className="about-v2-image about-v2-image-side">
                            <img src="/images/slides/about2.jpg" alt="Ashv Ventures completed work" loading="lazy" />
                        </figure>
                    </article>
                </div>
            </section>

            <section className="about-v2-values reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="section-header section-header-left">
                        <p className="section-eyebrow">Principles</p>
                        <h2 className="section-title section-title-left">The standards we return to on every project.</h2>
                    </div>
                    <div className="about-v2-values-grid">
                        {values.map((value) => (
                            <article className="about-v2-value premium-panel" key={value}>
                                <h3>{value}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-v2-office reveal-on-scroll" data-reveal>
                <div className="container about-v2-office-grid">
                    <div className="about-v2-office-copy premium-panel">
                        <p className="section-eyebrow">Office</p>
                        <h2>Based in Basant Nagar, New Delhi.</h2>
                        <p>H. No. 178-B, Ground Floor, Basant Nagar, New Delhi – 110057, India.</p>
                        <div className="about-v2-links">
                            <a href="mailto:contact@ashvventures.com">contact@ashvventures.com</a>
                            <a href="tel:+918700832180">+91 8700832180</a>
                        </div>
                    </div>

                    <div className="about-v2-office-map premium-panel">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3503.826!2d77.158168!3d28.571209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m1!2zMjjCsDM0JzE2LjQiTiA3N8KwMDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                            width="100%"
                            height="360"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ashv Ventures Location"
                        />
                    </div>
                </div>
            </section>

            <section className="cta cta-v2 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="cta-content">
                        <h2>Need support across design, build, and supply?</h2>
                        <p>We can help you structure the project and move it forward with less friction.</p>
                        <Link to="/contact" className="btn btn-primary">Contact us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
