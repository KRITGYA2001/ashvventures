import React, { useEffect } from 'react';

const contactChannels = [
    {
        label: 'Email',
        value: 'contact@ashvventures.com',
        href: 'mailto:contact@ashvventures.com',
        note: 'Best for project briefs, site details, and early discussions.',
    },
    {
        label: 'Call',
        value: '+91 8700832180',
        href: 'tel:+918700832180',
        note: 'Best for direct coordination and immediate project conversations.',
    },
    {
        label: 'WhatsApp',
        value: 'Start a chat',
        href: 'https://wa.me/918700832180',
        note: 'Best for quick questions, image sharing, and follow-ups.',
    },
];

const prepNotes = [
    'Project type and location',
    'Expected timeline or urgency',
    'Any drawings, references, or material direction',
];

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
        <div className="contact-page contact-v3">
            <section className="inner-hero inner-hero-contact">
                <div className="inner-hero-backdrop" aria-hidden="true" />
                <div className="container inner-hero-layout">
                    <div className="inner-hero-copy" data-reveal>
                        <p className="section-eyebrow section-eyebrow-light">Contact</p>
                        <h1>Let&apos;s discuss your project with clarity from the first step.</h1>
                        <p className="inner-hero-summary">
                            Share your scope, location, and timing. We will help identify the most practical next move.
                        </p>
                    </div>

                    <div className="inner-hero-meta" data-reveal>
                        <span>Direct access</span>
                        <strong>Reach the team through email, call, or WhatsApp.</strong>
                    </div>
                </div>
            </section>

            <section className="contact-v3-main">
                <div className="container contact-v3-grid">
                    <article className="contact-v3-intro premium-panel" data-reveal>
                        <p className="section-eyebrow">Start here</p>
                        <h2>Bring the brief. We&apos;ll help shape the next step.</h2>
                        <p>
                            The most useful first message includes the project type, location, expected timeline, and any
                            references or drawings already available.
                        </p>
                        <div className="contact-v3-prep">
                            {prepNotes.map((note) => (
                                <div className="contact-v3-prep-item" key={note}>
                                    <span />
                                    <p>{note}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="contact-v3-actions" data-reveal>
                        {contactChannels.map((channel) => (
                            <a
                                className="contact-v3-action"
                                href={channel.href}
                                key={channel.label}
                                target={channel.href.startsWith('https') ? '_blank' : undefined}
                                rel={channel.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                            >
                                <span>{channel.label}</span>
                                <strong>{channel.value}</strong>
                                <p>{channel.note}</p>
                            </a>
                        ))}
                    </article>
                </div>
            </section>

            <section className="contact-v3-details">
                <div className="container contact-v3-details-grid">
                    <article className="contact-v3-card" data-reveal>
                        <p className="section-eyebrow">Office</p>
                        <h2>Basant Nagar, New Delhi.</h2>
                        <p>H. No. 178-B, Ground Floor, Basant Nagar, New Delhi - 110057</p>
                    </article>

                    <article className="contact-v3-card" data-reveal>
                        <p className="section-eyebrow">Hours</p>
                        <h2>Monday to Saturday</h2>
                        <p>9:00 AM - 6:00 PM</p>
                    </article>
                </div>
            </section>

            <section className="contact-v3-map">
                <div className="container">
                    <div className="contact-v3-map-wrap premium-panel" data-reveal>
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
