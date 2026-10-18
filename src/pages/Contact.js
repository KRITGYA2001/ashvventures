import React, { useState } from 'react';
import { useSiteMotion } from '../motion/SiteMotion';
import { Reveal, Scramble, usePageMotion } from '../motion/text';
import { company } from '../content';

const channels = [
    { label: 'Email', value: company.email, href: `mailto:${company.email}`, note: 'Project briefs, drawings, site details' },
    { label: 'Call', value: company.phone, href: company.phoneHref, note: 'Direct coordination' },
    { label: 'WhatsApp', value: 'Start a chat', href: `https://wa.me/${company.whatsapp}`, note: 'Quick questions and photos' },
];

const projectTypes = ['Residential', 'Commercial', 'Interiors', 'Material supply'];
const scopes = ['Design', 'Construction', 'Materials'];

// Composes a brief and hands it to the visitor's own email or WhatsApp,
// so nothing is stored or sent by the site itself.
function BriefBuilder() {
    const [type, setType] = useState('Residential');
    const [scope, setScope] = useState(['Design', 'Construction']);
    const [form, setForm] = useState({ name: '', location: '', timeline: '', message: '' });

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const toggleScope = (item) => setScope((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]));

    const body = [
        `Hello Ashv Ventures,`,
        ``,
        `Project type: ${type}`,
        `Scope: ${scope.join(', ') || '—'}`,
        form.location ? `Location: ${form.location}` : null,
        form.timeline ? `Timeline: ${form.timeline}` : null,
        ``,
        form.message || null,
        form.name ? `\n— ${form.name}` : null,
    ]
        .filter((line) => line !== null)
        .join('\n');

    const subject = `Project brief — ${type}${form.location ? `, ${form.location}` : ''}`;
    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const whatsapp = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(body)}`;

    return (
        <form className="brief" onSubmit={(e) => e.preventDefault()} data-fade>
            <fieldset>
                <legend className="mono">01 — Project type</legend>
                <div className="chips">
                    {projectTypes.map((item) => (
                        <button type="button" key={item} className={`chip ${type === item ? 'is-on' : ''}`} onClick={() => setType(item)} aria-pressed={type === item}>
                            {item}
                        </button>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <legend className="mono">02 — Scope</legend>
                <div className="chips">
                    {scopes.map((item) => (
                        <button
                            type="button"
                            key={item}
                            className={`chip ${scope.includes(item) ? 'is-on' : ''}`}
                            onClick={() => toggleScope(item)}
                            aria-pressed={scope.includes(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </fieldset>
            <fieldset className="brief-fields">
                <legend className="mono">03 — Details</legend>
                <label>
                    <span className="mono">Your name</span>
                    <input value={form.name} onChange={update('name')} autoComplete="name" />
                </label>
                <label>
                    <span className="mono">Site location</span>
                    <input value={form.location} onChange={update('location')} placeholder="e.g. Vasant Vihar, New Delhi" />
                </label>
                <label>
                    <span className="mono">Timeline</span>
                    <input value={form.timeline} onChange={update('timeline')} placeholder="e.g. Start in 3 months" />
                </label>
                <label className="brief-wide">
                    <span className="mono">About the project</span>
                    <textarea rows={4} value={form.message} onChange={update('message')} placeholder="Size, references, drawings you already have…" />
                </label>
            </fieldset>
            <div className="brief-send">
                <p className="mono">Opens in your own email or WhatsApp — nothing is stored here.</p>
                <div className="brief-buttons">
                    <a className="pill pill-solid" href={mailto}>
                        Send by email
                    </a>
                    <a className="pill" href={whatsapp} target="_blank" rel="noopener noreferrer">
                        Send on WhatsApp
                    </a>
                </div>
            </div>
        </form>
    );
}

function Contact() {
    const { loaded } = useSiteMotion();
    usePageMotion();

    return (
        <div className="page page-contact">
            <section className="page-hero page-hero-tight">
                <div className="page-hero-top mono">
                    <Scramble text="[ Contact ]" />
                    <Scramble text={company.hours} delay={0.15} />
                </div>
                {loaded && <Reveal as="h1" className="page-title" text={"Let's build\nsomething\nresolved."} immediate delay={0.1} />}
            </section>

            <section className="channels">
                {channels.map((c, i) => (
                    <a
                        key={c.label}
                        className="channel"
                        href={c.href}
                        target={c.href.startsWith('https') ? '_blank' : undefined}
                        rel={c.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                        data-fade
                        style={{ '--d': `${i * 90}ms` }}
                    >
                        <span className="mono">0{i + 1} — {c.label}</span>
                        <strong>{c.value}</strong>
                        <span className="channel-note">{c.note}</span>
                        <span className="channel-arrow" aria-hidden="true">↗</span>
                    </a>
                ))}
            </section>

            <section className="brief-wrap" data-theme="dark">
                <div className="brief-intro">
                    <Scramble as="p" className="eyebrow" text="[ Brief builder ]" />
                    <Reveal text={'Bring the brief.\nWe’ll shape the\nnext step.'} className="h-xl" />
                    <p className="body-l">Pick what applies and add a few details — we reply within one working day.</p>
                </div>
                <BriefBuilder />
            </section>

            <section className="office">
                <div className="office-copy">
                    <Scramble as="p" className="eyebrow" text="[ Visit ]" />
                    <h2 className="h-l">{company.address.join(', ')}</h2>
                    <p className="mono">{company.coords}</p>
                </div>
                <div className="map-frame" data-fade>
                    <iframe src={company.mapSrc} title="Ashv Ventures office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                </div>
            </section>
        </div>
    );
}

export default Contact;
