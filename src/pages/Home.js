import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Design strategy',
        copy: 'Spatial concepts, finishes, and planning that balance aesthetics with real execution constraints.',
    },
    {
        title: 'Construction delivery',
        copy: 'Coordinated on-site execution with quality checkpoints and cleaner decision flow.',
    },
    {
        title: 'Material curation',
        copy: 'Sourcing support for reliable, premium materials aligned with design intent and budget.',
    },
];

const workflow = [
    { label: '01', title: 'Brief and site understanding' },
    { label: '02', title: 'Design and technical planning' },
    { label: '03', title: 'Build, supply, and closeout' },
];

function Home() {
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
        <div className="home-page home-v2">
            <section className="hero-v2">
                <div className="hero-v2-bg" aria-hidden="true" />
                <div className="container hero-v2-layout">
                    <div className="hero-v2-copy" data-reveal>
                        <p className="section-eyebrow">Ashv Ventures</p>
                        <h1>Design, construction, and material supply delivered as one system.</h1>
                        <p>
                            We help clients move from concept to completion with cleaner coordination, stronger details,
                            and a more premium execution standard.
                        </p>
                        <div className="hero-v2-actions">
                            <Link to="/contact" className="btn btn-primary">Start a project</Link>
                            <Link to="/about" className="btn btn-secondary">View our approach</Link>
                        </div>
                    </div>

                    <div className="hero-v2-media" data-reveal>
                        <figure className="hero-v2-card hero-v2-main">
                            <img src="/images/slides/slide1.jpg" alt="Premium building facade" loading="eager" />
                        </figure>
                        <figure className="hero-v2-card hero-v2-side">
                            <img src="/images/slides/slide2.jpg" alt="Architectural project detail" loading="lazy" />
                        </figure>
                    </div>
                </div>

                <div className="hero-v2-strip" data-reveal>
                    <div><strong>Integrated team</strong><span>Design + build + supply</span></div>
                    <div><strong>Quality first</strong><span>Detail-led execution</span></div>
                    <div><strong>New Delhi</strong><span>On-ground delivery</span></div>
                    <div><strong>Professional flow</strong><span>Less friction, better outcomes</span></div>
                </div>
            </section>

            <section className="showcase-v2 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="section-header section-header-left">
                        <p className="section-eyebrow">Selected frames</p>
                        <h2 className="section-title section-title-left">A cleaner visual language for modern projects.</h2>
                    </div>
                    <div className="showcase-v2-grid">
                        <article className="showcase-v2-item">
                            <img src="/images/slides/slide3.jpg" alt="Construction progress" loading="lazy" />
                        </article>
                        <article className="showcase-v2-item">
                            <img src="/images/slides/slide4.jpg" alt="Finished architectural space" loading="lazy" />
                        </article>
                    </div>
                </div>
            </section>

            <section className="services-v2 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="section-header section-header-left">
                        <p className="section-eyebrow">Core services</p>
                        <h2 className="section-title section-title-left">Everything required to take a project from idea to delivery.</h2>
                    </div>
                    <div className="services-v2-grid">
                        {services.map((service) => (
                            <article className="services-v2-card" key={service.title}>
                                <h3>{service.title}</h3>
                                <p>{service.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="workflow-v2 reveal-on-scroll" data-reveal>
                <div className="container workflow-v2-layout">
                    <div className="workflow-v2-copy">
                        <p className="section-eyebrow">How we work</p>
                        <h2>Structured decisions. Predictable progress.</h2>
                        <p>
                            The process is intentionally simple so clients always know what is happening, what comes next,
                            and where quality is being protected.
                        </p>
                    </div>
                    <div className="workflow-v2-steps">
                        {workflow.map((step) => (
                            <div className="workflow-v2-step" key={step.label}>
                                <span>{step.label}</span>
                                <h3>{step.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta cta-v2 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to build a sharper, more professional project experience?</h2>
                        <p>Share your requirement and we will help shape the plan, timeline, and delivery path.</p>
                        <Link to="/contact" className="btn btn-primary">Talk to the team</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
