import React, { useEffect } from 'react';

function Contact() {
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
        <div className="contact-page contact-v2">
            <section className="page-hero page-hero-v2">
                <div className="container">
                    <p className="section-eyebrow">Contact</p>
                    <h1>Let’s discuss your project.</h1>
                    <p className="page-hero-copy">
                        Share your scope, location, and timeline. We will suggest the most practical next step.
                    </p>
                </div>
            </section>

            <section className="contact-v2-main reveal-on-scroll" data-reveal>
                <div className="container contact-v2-grid">
                    <article className="contact-v2-info premium-panel">
                        <p className="section-eyebrow">Direct channels</p>
                        <h2>Reach us directly.</h2>
                        <div className="contact-v2-list">
                            <div>
                                <span>Office</span>
                                <p>H. No. 178-B, Ground Floor, Basant Nagar, New Delhi – 110057</p>
                            </div>
                            <div>
                                <span>Email</span>
                                <p><a href="mailto:contact@ashvventures.com">contact@ashvventures.com</a></p>
                            </div>
                            <div>
                                <span>Phone</span>
                                <p><a href="tel:+918700832180">+91 8700832180</a></p>
                            </div>
                            <div>
                                <span>Hours</span>
                                <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </article>

                    <article className="contact-v2-actions premium-panel">
                        <p className="section-eyebrow">Quick actions</p>
                        <h2>Choose your preferred channel.</h2>
                        <a className="contact-v2-action" href="mailto:contact@ashvventures.com">
                            <span>Email</span>
                            <strong>contact@ashvventures.com</strong>
                        </a>
                        <a className="contact-v2-action" href="tel:+918700832180">
                            <span>Call</span>
                            <strong>+91 8700832180</strong>
                        </a>
                        <a className="contact-v2-action" href="https://wa.me/918700832180" target="_blank" rel="noopener noreferrer">
                            <span>WhatsApp</span>
                            <strong>Start a chat</strong>
                        </a>
                        <p className="contact-v2-note">For faster help, include project type, location, and expected timeline.</p>
                    </article>
                </div>
            </section>

            <section className="contact-v2-map reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="contact-v2-map-wrap premium-panel">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3503.826!2d77.158168!3d28.571209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m1!2zMjjCsDM0JzE2LjQiTiA3N8KwMDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                            width="100%"
                            height="430"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ashv Ventures Location Map"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
