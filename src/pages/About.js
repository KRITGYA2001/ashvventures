import React from 'react';
import { ClayCta } from './Home';
import { useSiteMotion } from '../motion/SiteMotion';
import { Reveal, Scramble, ScrubText, usePageMotion } from '../motion/text';
import { company, disciplines, mission, values, vision } from '../content';

function About() {
    const { loaded } = useSiteMotion();
    usePageMotion();

    return (
        <div className="page page-about">
            <section className="page-hero">
                <div className="page-hero-top mono">
                    <Scramble text="[ Studio ]" />
                    <Scramble text="Basant Nagar, New Delhi" delay={0.15} />
                </div>
                {loaded && (
                    <Reveal as="h1" className="page-title" text={'One standard\nacross design,\nbuild & supply.'} immediate delay={0.1} />
                )}
                <figure className="page-hero-media" data-clip>
                    <img src="/images/slides/about1.webp" alt="Ashv Ventures architectural site detail" data-speed="0.22" />
                </figure>
            </section>

            <section className="split">
                <div className="split-label">
                    <Scramble as="p" className="eyebrow" text="[ Who we are ]" />
                </div>
                <div className="split-body">
                    <ScrubText
                        className="lead-xl"
                        text="We work from New Delhi with a simple goal: make project delivery feel more coherent, more disciplined, and more premium — from the first discussion to the final handover."
                    />
                    <div className="two-col" data-fade>
                        <p>
                            Ashv Ventures combines design, construction, and material supply so clients do not need to manage
                            fragmented partners across the same project.
                        </p>
                        <p>
                            Our role is not just to provide services in parallel. It is to connect decisions across design,
                            construction, and materials so the project feels resolved rather than assembled in parts.
                        </p>
                    </div>
                </div>
            </section>

            <section className="vm" data-theme="dark">
                <article className="vm-item">
                    <span className="mono">[ Vision ]</span>
                    <Reveal as="h2" className="h-l" text={vision} stagger={0.02} />
                </article>
                <figure className="vm-media" data-clip>
                    <img src="/images/slides/ashv-interior.webp" alt="A finished Ashv Ventures interior" loading="lazy" data-speed="0.2" />
                </figure>
                <figure className="vm-media" data-clip>
                    <img src="/images/slides/about2.webp" alt="Completed Ashv Ventures work" loading="lazy" data-speed="0.2" />
                </figure>
                <article className="vm-item">
                    <span className="mono">[ Mission ]</span>
                    <Reveal as="h2" className="h-l" text={mission} stagger={0.015} />
                </article>
            </section>

            <section className="studio-disc">
                <div className="section-head">
                    <Scramble as="p" className="eyebrow" text="[ What we do ]" />
                </div>
                <ul className="hover-list">
                    {disciplines.map((d) => (
                        <li key={d.id} className="hover-row" data-fade>
                            <span className="mono">{d.number}</span>
                            <h3>{d.title}</h3>
                            <p>{d.copy}</p>
                            <img src={d.image} alt="" aria-hidden="true" loading="lazy" />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="principles principles-compact">
                <div className="section-head">
                    <Scramble as="p" className="eyebrow" text="[ Principles ]" />
                    <Reveal text={'How we\nwork.'} className="h-xl" />
                </div>
                <div className="value-grid">
                    {values.map((value, i) => (
                        <article className="value-card" key={value.title} data-fade style={{ '--d': `${i * 80}ms` }}>
                            <span className="mono">0{i + 1}</span>
                            <h3>{value.title}</h3>
                            <p>{value.copy}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="office" data-theme="dark">
                <div className="office-copy">
                    <Scramble as="p" className="eyebrow" text="[ Office ]" />
                    <h2 className="h-l">{company.address.join(', ')}</h2>
                    <p className="mono">{company.hours}</p>
                    <div className="office-links">
                        <a className="u-link" href={`mailto:${company.email}`}>{company.email}</a>
                        <a className="u-link" href={company.phoneHref}>{company.phone}</a>
                    </div>
                </div>
                <div className="map-frame" data-fade>
                    <iframe src={company.mapSrc} title="Ashv Ventures office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                </div>
            </section>

            <ClayCta />
        </div>
    );
}

export default About;
