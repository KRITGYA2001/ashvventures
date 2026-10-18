import React, { useEffect, useRef } from 'react';
import TLink from '../components/TLink';
import TowerScene from '../components/TowerScene';
import DragSlider from '../components/DragSlider';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';
import { gsap, ScrollTrigger } from '../motion/gsap';
import { prefersReducedMotion, useSiteMotion } from '../motion/SiteMotion';
import { Reveal, Scramble, ScrubText, usePageMotion } from '../motion/text';
import { company, disciplines, manifesto, processSteps, values } from '../content';

function Hero() {
    const { loaded } = useSiteMotion();
    const section = useRef(null);
    const stage = useRef(null);
    const progress = useRef(0);

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: section.current,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                progress.current = self.progress;
                stage.current?.style.setProperty('--p', self.progress.toFixed(4));
            },
        });
        return () => trigger.kill();
    }, []);

    return (
        <section className="hero" ref={section}>
            <div className="hero-stage" ref={stage}>
                <TowerScene progress={progress} start={loaded} />

                <div className="hero-top mono">
                    <Scramble text="[ Fig. 01 — Tower study ]" />
                    <Scramble text={company.coords} delay={0.2} />
                </div>

                <div className="hero-title-wrap">
                    {loaded && <Reveal as="h1" className="hero-title" text={'We design,\nbuild &\nsupply.'} immediate delay={0.2} stagger={0.08} />}
                </div>

                <div className="hero-side">
                    <p className="hero-lead fade-after-load">
                        An architecture studio in New Delhi bringing design, construction and material supply into one
                        accountable delivery flow.
                    </p>
                    <div className="hero-actions fade-after-load">
                        <TLink to="/contact" label="Contact" className="pill pill-solid">
                            Start a project
                        </TLink>
                        <TLink to="/about" label="Studio" className="pill">
                            The studio
                        </TLink>
                    </div>
                </div>

                <ol className="hero-callouts mono" aria-label="Disciplines">
                    {disciplines.map((d, i) => (
                        <li key={d.id} style={{ '--i': i }}>
                            <span>{d.number}</span>
                            {d.title}
                        </li>
                    ))}
                </ol>

                <div className="hero-scroll mono" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </div>
        </section>
    );
}

function Disciplines() {
    const root = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.disc-card');
            cards.forEach((card, i) => {
                const next = cards[i + 1];
                if (!next) return;
                gsap.to(card.querySelector('.disc-inner'), {
                    scale: 0.9,
                    // Dim rather than fade, so the card stays opaque over the ones stacked beneath it.
                    filter: 'brightness(0.4)',
                    ease: 'none',
                    scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 12%', scrub: true },
                });
            });
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <section className="disc" data-theme="dark" ref={root}>
            <div className="section-head">
                <Scramble as="p" className="eyebrow" text="[ 02 — Disciplines ]" />
                <Reveal text={'Three disciplines.\nOne project system.'} className="h-xl" />
            </div>
            <div className="disc-stack">
                {disciplines.map((d, i) => (
                    <article className="disc-card" key={d.id} style={{ '--i': i }}>
                        <div className="disc-inner">
                            <div className="disc-copy">
                                <span className="disc-num mono">{d.number} / 03</span>
                                <h3 className="disc-title">{d.title}</h3>
                                <p className="disc-lead mono">{d.lead}</p>
                                <p className="disc-text">{d.copy}</p>
                                <ul className="disc-points">
                                    {d.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <figure className="disc-media" data-clip>
                                <img src={d.image} alt={d.alt} loading="lazy" data-speed="0.18" />
                            </figure>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function Process() {
    const root = useRef(null);
    const track = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
            const distance = () => track.current.scrollWidth - window.innerWidth;
            gsap.to(track.current, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: root.current,
                    start: 'top top',
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => root.current?.style.setProperty('--pp', self.progress.toFixed(4)),
                },
            });
        });
        return () => mm.revert();
    }, []);

    return (
        <section className="process" ref={root}>
            <div className="process-track" ref={track}>
                <div className="process-intro">
                    <Scramble as="p" className="eyebrow" text="[ 03 — Process ]" />
                    <Reveal text={'From brief\nto handover.'} className="h-xl" />
                    <p className="body-l">
                        Each phase stays connected, so decisions made early still hold up on site and at handover.
                    </p>
                </div>
                {processSteps.map((step) => (
                    <article className="process-step" key={step.number}>
                        <span className="process-num" aria-hidden="true">
                            {step.number}
                        </span>
                        <div>
                            <h3 className="h-m">{step.title}</h3>
                            <p>{step.copy}</p>
                        </div>
                    </article>
                ))}
            </div>
            <div className="process-progress" aria-hidden="true">
                <span />
            </div>
        </section>
    );
}

function MaterialLibrary() {
    const { products, status, reload } = useProducts();

    return (
        <section className="library" data-theme="dark">
            <div className="section-head section-head-row">
                <div>
                    <Scramble as="p" className="eyebrow" text="[ 04 — Material library ]" />
                    <Reveal text={'Materials we\nsupply & specify.'} className="h-xl" />
                </div>
                <div className="library-aside">
                    <p className="mono">
                        <span className="live-dot" /> Live from our catalogue
                    </p>
                    <TLink to="/materials" label="Materials" className="pill pill-light">
                        All materials
                    </TLink>
                </div>
            </div>

            {status === 'ready' && products.length > 0 && (
                <DragSlider
                    items={products}
                    getKey={(p) => p.id || p.name}
                    label="Material library"
                    renderItem={(product, i) => <ProductCard product={product} index={i} />}
                />
            )}
            {status === 'loading' && (
                <div className="library-skeleton" aria-label="Loading materials">
                    {[0, 1, 2, 3].map((n) => (
                        <span key={n} />
                    ))}
                </div>
            )}
            {(status === 'error' || (status === 'ready' && products.length === 0)) && (
                <div className="library-empty">
                    <p>The catalogue is offline right now.</p>
                    <button type="button" className="pill pill-light" onClick={reload}>
                        Try again
                    </button>
                </div>
            )}
        </section>
    );
}

function Principles() {
    return (
        <section className="principles">
            <div className="section-head section-head-row">
                <div>
                    <Scramble as="p" className="eyebrow" text="[ 05 — Principles ]" />
                    <Reveal text={'The standard we\nreturn to.'} className="h-xl" />
                </div>
            </div>
            <ol className="principle-list">
                {values.map((value, i) => (
                    <li className="principle" key={value.title} data-fade tabIndex={0}>
                        <span className="mono">0{i + 1}</span>
                        <h3>{value.title}</h3>
                        <p>{value.copy}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export function ClayCta() {
    return (
        <section className="clay-cta">
            <Marquee items={['Start a project', 'Design', 'Build', 'Supply', 'Start a project', 'Design', 'Build', 'Supply']} />
            <div className="clay-cta-row">
                <p className="body-l">Share the scope, location and timing. We will help define the next practical step.</p>
                <TLink to="/contact" label="Contact" className="big-round" data-cursor="Let's talk">
                    <span>Let&apos;s talk</span>
                </TLink>
            </div>
        </section>
    );
}

function Home() {
    usePageMotion();

    return (
        <div className="page page-home">
            <Hero />
            <section className="manifesto">
                <div className="manifesto-head">
                    <Scramble as="p" className="eyebrow" text="[ 01 — Practice ]" />
                    <p className="mono manifesto-tag">3 disciplines · 1 team · 1 standard</p>
                </div>
                <ScrubText className="manifesto-text" text={manifesto} />
            </section>
            <Disciplines />
            <Process />
            <MaterialLibrary />
            <Principles />
            <ClayCta />
        </div>
    );
}

export default Home;
