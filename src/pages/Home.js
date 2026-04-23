import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const storyMoments = [
    {
        id: 'design',
        label: 'Design',
        title: 'Concepts shaped around space, materials, and execution from the beginning.',
        copy: 'We frame design decisions around how the project will actually be built, sourced, and experienced in real use.',
        image: '/images/slides/ashv-hero.png',
        alt: 'Premium exterior architecture with warm stone and modern lines',
        tag: 'Spatial clarity',
    },
    {
        id: 'build',
        label: 'Construction',
        title: 'Execution that stays disciplined from planning through on-site delivery.',
        copy: 'Our work stays grounded in sequencing, quality checkpoints, and cleaner collaboration so progress remains visible.',
        image: '/images/slides/ashv-construction.png',
        alt: 'High-end construction process on a modern building project',
        tag: 'Build confidence',
    },
    {
        id: 'supply',
        label: 'Material supply',
        title: 'Finishes and materials curated to protect the design intent and the budget.',
        copy: 'Material decisions are treated as part of the system, helping the final result feel coherent instead of pieced together.',
        image: '/images/slides/ashv-materials.png',
        alt: 'Curated premium materials and finishes for architectural projects',
        tag: 'Curated sourcing',
    },
];

const servicePillars = [
    {
        title: 'Integrated delivery',
        copy: 'Design, construction, and material supply are aligned as one project system instead of disconnected vendors.',
    },
    {
        title: 'Decision clarity',
        copy: 'Clear next steps, practical communication, and tighter coordination help clients move forward with confidence.',
    },
    {
        title: 'Premium execution',
        copy: 'Details, finishes, and handover quality are treated as part of the process, not as a last-minute correction.',
    },
];

const processSteps = [
    {
        number: '01',
        title: 'Brief and site reading',
        copy: 'We align on project goals, context, and the most important constraints before momentum starts.',
    },
    {
        number: '02',
        title: 'Design and technical planning',
        copy: 'Spatial direction, specifications, and delivery logic are shaped together so decisions stay practical.',
    },
    {
        number: '03',
        title: 'Build, source, and close out',
        copy: 'Execution, procurement, and finishing are managed against the same quality standard through completion.',
    },
];

const galleryFrames = [
    {
        title: 'Architectural presence',
        copy: 'Compositions designed to feel measured, sharp, and long-lasting.',
        image: '/images/slides/ashv-hero.png',
        alt: 'Premium modern architecture with a cinematic editorial feel',
    },
    {
        title: 'Construction discipline',
        copy: 'Progress with coordination, sequencing, and cleaner on-site control.',
        image: '/images/slides/ashv-construction.png',
        alt: 'Disciplined construction process on a premium project',
    },
    {
        title: 'Finished atmosphere',
        copy: 'Spaces that carry the design intent all the way to the final experience.',
        image: '/images/slides/ashv-interior.png',
        alt: 'Completed interior with premium finishes',
    },
];

function Home() {
    const heroRef = useRef(null);

    useEffect(() => {
        const items = document.querySelectorAll('[data-reveal]');
        const parallaxItems = document.querySelectorAll('[data-parallax]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
        );

        items.forEach((item) => observer.observe(item));

        let ticking = false;

        const updateMotion = () => {
            const hero = heroRef.current;

            if (hero) {
                const heroHeight = hero.offsetHeight || 1;
                const progress = Math.max(0, Math.min(window.scrollY / heroHeight, 1));
                hero.style.setProperty('--hero-progress', progress.toFixed(3));
            }

            parallaxItems.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const speed = Number(item.getAttribute('data-parallax-speed') || 0.12);
                const centeredOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
                const translate = centeredOffset * -speed;
                item.style.setProperty('--parallax-y', `${translate.toFixed(1)}px`);
            });

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateMotion);
                ticking = true;
            }
        };

        updateMotion();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className="home-page home-v3">
            <section className="hero-v3" ref={heroRef}>
                <div className="hero-v3-backdrop" aria-hidden="true" />
                <div className="hero-v3-orbit hero-v3-orbit-one" aria-hidden="true" />
                <div className="hero-v3-orbit hero-v3-orbit-two" aria-hidden="true" />

                <div className="hero-v3-media" aria-hidden="true">
                    <figure className="hero-v3-photo hero-v3-photo-main" data-parallax data-parallax-speed="0.09">
                        <img src="/images/slides/ashv-hero.png" alt="" loading="eager" />
                    </figure>
                    <figure className="hero-v3-photo hero-v3-photo-accent" data-parallax data-parallax-speed="0.14">
                        <img src="/images/slides/ashv-materials.png" alt="" loading="eager" />
                    </figure>
                </div>

                <div className="container hero-v3-layout">
                    <div className="hero-v3-copy" data-reveal>
                        <p className="section-eyebrow section-eyebrow-light">Ashv Ventures</p>
                        <p className="hero-v3-kicker">Design, construction, and material supply in one delivery flow</p>
                        <h1>
                            Motion-led project storytelling for a business built on execution.
                        </h1>
                        <p className="hero-v3-summary">
                            Ashv Ventures brings design thinking, construction discipline, and material coordination
                            into one premium project experience for homeowners, commercial clients, and design partners.
                        </p>
                        <div className="hero-v3-actions">
                            <Link to="/contact" className="btn btn-primary">Start a project</Link>
                            <Link to="/about" className="btn btn-secondary">See our approach</Link>
                        </div>
                    </div>

                    <div className="hero-v3-aside" data-reveal>
                        <div className="hero-v3-note">
                            <span>New Delhi</span>
                            <strong>Built with editorial presence and real delivery confidence.</strong>
                            <p>Designed to feel premium now and even stronger as better future visuals are added.</p>
                        </div>
                    </div>
                </div>

                <div className="hero-v3-footer" data-reveal>
                    <div>
                        <span>Integrated model</span>
                        <strong>Design + build + supply</strong>
                    </div>
                    <div>
                        <span>Primary focus</span>
                        <strong>Execution and trust</strong>
                    </div>
                    <div>
                        <span>Audience</span>
                        <strong>Homeowners, commercial, partners</strong>
                    </div>
                </div>
            </section>

            <section className="story-v3">
                <div className="container">
                    <div className="section-header section-header-left story-v3-header" data-reveal>
                        <p className="section-eyebrow">Scroll story</p>
                        <h2 className="section-title section-title-left">A cleaner way to move from concept to completion.</h2>
                        <p className="section-subtitle story-v3-subtitle">
                            Each phase should feel connected. The homepage now tells that story through visual rhythm,
                            measured copy, and motion that reinforces process instead of distracting from it.
                        </p>
                    </div>

                    <div className="story-v3-stack">
                        {storyMoments.map((moment) => (
                            <article className="story-v3-panel" key={moment.id}>
                                <div className="story-v3-sticky">
                                    <div className="story-v3-content premium-panel" data-reveal>
                                        <span className="story-v3-tag">{moment.label}</span>
                                        <h3>{moment.title}</h3>
                                        <p>{moment.copy}</p>
                                        <small>{moment.tag}</small>
                                    </div>
                                    <figure className="story-v3-visual" data-reveal>
                                        <div className="story-v3-visual-inner" data-parallax data-parallax-speed="0.12">
                                            <img src={moment.image} alt={moment.alt} loading="lazy" />
                                        </div>
                                    </figure>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="proof-v3">
                <div className="container proof-v3-layout">
                    <div className="proof-v3-intro" data-reveal>
                        <p className="section-eyebrow">Why it works</p>
                        <h2 className="section-title section-title-left">Structured enough for trust. Elevated enough to feel memorable.</h2>
                        <p className="section-subtitle">
                            The site now balances architectural atmosphere with business clarity, so the first impression is
                            premium while the message still says the team can deliver.
                        </p>
                    </div>

                    <div className="proof-v3-grid">
                        {servicePillars.map((pillar) => (
                            <article className="proof-v3-item" key={pillar.title} data-reveal>
                                <h3>{pillar.title}</h3>
                                <p>{pillar.copy}</p>
                            </article>
                        ))}
                    </div>

                    <div className="process-v3" id="services">
                        {processSteps.map((step) => (
                            <article className="process-v3-step" key={step.number} data-reveal>
                                <span>{step.number}</span>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p>{step.copy}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="gallery-v3">
                <div className="container">
                    <div className="section-header section-header-left" data-reveal>
                        <p className="section-eyebrow">Featured frames</p>
                        <h2 className="section-title section-title-left">Large visuals, restrained captions, and room for stronger future imagery.</h2>
                    </div>

                    <div className="gallery-v3-list">
                        {galleryFrames.map((frame, index) => (
                            <article className={`gallery-v3-frame ${index % 2 === 1 ? 'gallery-v3-frame-reverse' : ''}`} key={frame.title}>
                                <figure className="gallery-v3-image" data-reveal>
                                    <div className="gallery-v3-image-inner" data-parallax data-parallax-speed="0.1">
                                        <img src={frame.image} alt={frame.alt} loading="lazy" />
                                    </div>
                                </figure>
                                <div className="gallery-v3-copy" data-reveal>
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{frame.title}</h3>
                                    <p>{frame.copy}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta cta-v3 reveal-on-scroll" data-reveal>
                <div className="container">
                    <div className="cta-content">
                        <p className="section-eyebrow section-eyebrow-light">Final call</p>
                        <h2>Bring design, build, and material decisions into one sharper project experience.</h2>
                        <p>Share the project scope and we will help define the next practical step.</p>
                        <Link to="/contact" className="btn btn-primary">Talk to Ashv Ventures</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
