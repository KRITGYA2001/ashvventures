import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const values = [
    {
        title: 'Clarity in communication',
        copy: 'Decisions, updates, and next steps stay visible so the project does not drift into confusion.',
    },
    {
        title: 'Respect for timelines',
        copy: 'Planning and sequencing are treated seriously because premium outcomes depend on disciplined momentum.',
    },
    {
        title: 'Detail-led quality',
        copy: 'Execution quality is protected through materials, finishes, and practical oversight at every stage.',
    },
    {
        title: 'Long-term accountability',
        copy: 'We aim to leave clients with confidence in the result, not just a completed scope on paper.',
    },
];

const practiceNotes = [
    'Integrated thinking across design, execution, and sourcing',
    'A compact team that prioritizes coordination over noise',
    'Project decisions shaped around outcome, not decoration',
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
        <div className="about-page about-v3">
            <section className="inner-hero inner-hero-about">
                <div className="inner-hero-backdrop" aria-hidden="true" />
                <div className="container inner-hero-layout">
                    <div className="inner-hero-copy" data-reveal>
                        <p className="section-eyebrow section-eyebrow-light">About</p>
                        <h1>A compact team shaped around premium project execution.</h1>
                        <p className="inner-hero-summary">
                            Ashv Ventures combines design, construction, and material supply so clients do not need to
                            manage fragmented partners across the same project.
                        </p>
                    </div>

                    <div className="inner-hero-meta" data-reveal>
                        <span>Based in New Delhi</span>
                        <strong>Built for cleaner coordination and sharper final outcomes.</strong>
                    </div>
                </div>
            </section>

            <section className="about-v3-intro">
                <div className="container about-v3-intro-grid">
                    <article className="about-v3-copy premium-panel" data-reveal>
                        <p className="section-eyebrow">Who we are</p>
                        <h2>One quality standard across design, build, and supply.</h2>
                        <p>
                            We work from New Delhi with a simple goal: make project delivery feel more coherent, more
                            disciplined, and more premium from the first discussion to the final handover.
                        </p>
                        <p>
                            Our role is not just to provide services in parallel. It is to connect decisions across design,
                            construction, and materials so the project feels resolved rather than assembled in parts.
                        </p>
                        <div className="about-v3-list">
                            {practiceNotes.map((note) => (
                                <div className="about-v3-list-item" key={note}>
                                    <span />
                                    <p>{note}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="about-v3-gallery" data-reveal>
                        <figure className="about-v3-image about-v3-image-main">
                            <img src="/images/slides/about1.jpg" alt="Ashv Ventures architectural site detail" loading="eager" />
                        </figure>
                        <figure className="about-v3-image about-v3-image-side">
                            <img src="/images/slides/about2.jpg" alt="Ashv Ventures completed design and construction work" loading="lazy" />
                        </figure>
                    </article>
                </div>
            </section>

            <section className="about-v3-values">
                <div className="container">
                    <div className="section-header section-header-left" data-reveal>
                        <p className="section-eyebrow">Principles</p>
                        <h2 className="section-title section-title-left">The standards we return to on every project.</h2>
                    </div>
                    <div className="about-v3-values-grid">
                        {values.map((value) => (
                            <article className="about-v3-value" key={value.title} data-reveal>
                                <h3>{value.title}</h3>
                                <p>{value.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-v3-office">
                <div className="container about-v3-office-grid">
                    <div className="about-v3-office-copy" data-reveal>
                        <p className="section-eyebrow">Office</p>
                        <h2>Based in Basant Nagar, New Delhi.</h2>
                        <p>H. No. 178-B, Ground Floor, Basant Nagar, New Delhi - 110057, India.</p>
                        <div className="about-v3-links">
                            <a href="mailto:contact@ashvventures.com">contact@ashvventures.com</a>
                            <a href="tel:+918700832180">+91 8700832180</a>
                        </div>
                    </div>

                    <div className="about-v3-office-map premium-panel" data-reveal>
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

            <section className="cta cta-v3 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="cta-content">
                        <p className="section-eyebrow section-eyebrow-light">Work with us</p>
                        <h2>Need support across design, build, and material planning?</h2>
                        <p>We can help structure the project and move it forward with better coordination.</p>
                        <Link to="/contact" className="btn btn-primary">Contact Ashv Ventures</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
