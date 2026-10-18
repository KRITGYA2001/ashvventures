import React, { useCallback, useEffect, useRef } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './SiteMotion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-#*<>';

// Resolves text left to right through random glyphs, igloo-style.
export function scrambleTo(el, finalText, { duration = 0.9, delay = 0 } = {}) {
    if (!el) return () => {};
    if (prefersReducedMotion()) {
        el.textContent = finalText;
        return () => {};
    }

    const length = finalText.length;
    const state = { p: 0 };
    const tween = gsap.to(state, {
        p: 1,
        duration,
        delay,
        ease: 'power2.out',
        onUpdate: () => {
            const settled = Math.floor(state.p * length);
            let out = finalText.slice(0, settled);
            for (let i = settled; i < length; i += 1) {
                const ch = finalText[i];
                out += ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            el.textContent = out;
        },
        onComplete: () => {
            el.textContent = finalText;
        },
    });
    return () => tween.kill();
}

// <Scramble text="..." /> scrambles in when it scrolls into view and,
// with `hover`, again whenever the pointer enters it.
export function Scramble({ text, as: Tag = 'span', className = '', hover = false, delay = 0, duration, ...rest }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        let cancel = () => {};
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cancel = scrambleTo(el, text, { delay, duration });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancel();
        };
    }, [text, delay, duration]);

    const onEnter = useCallback(() => {
        if (hover) scrambleTo(ref.current, text, { duration: 0.5 });
    }, [hover, text]);

    // Screen readers get the settled text; the scrambling copy is hidden from them.
    return (
        <Tag className={className} onMouseEnter={onEnter} {...rest}>
            <span ref={ref} aria-hidden="true">
                {text}
            </span>
            <span className="sr-only">{text}</span>
        </Tag>
    );
}

// <Reveal text={'Line one\nLine two'} /> rises in word by word.
export function Reveal({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.06, immediate = false, start = 'top 85%' }) {
    const ref = useRef(null);
    const lines = text.split('\n');

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return undefined;
        const words = el.querySelectorAll('.rv-w > span');
        const ctx = gsap.context(() => {
            // y is pinned to 0 so a stale pixel offset from an earlier run can't linger.
            gsap.set(words, { y: 0, yPercent: 115, rotate: 4 });
            const tween = {
                y: 0,
                yPercent: 0,
                rotate: 0,
                duration: 1.1,
                ease: 'expo.out',
                stagger,
                delay,
            };
            if (immediate) gsap.to(words, tween);
            else gsap.to(words, { ...tween, scrollTrigger: { trigger: el, start } });
        }, el);
        return () => ctx.revert();
    }, [text, delay, stagger, immediate, start]);

    return (
        <Tag ref={ref} className={`rv ${className}`}>
            {lines.map((line, li) => (
                <span className="rv-line" key={li} aria-hidden="true">
                    {line.split(' ').map((word, wi) => (
                        <span className="rv-w" key={wi}>
                            <span>{word}</span>
                        </span>
                    ))}
                </span>
            ))}
            {/* Last, so it doesn't shift the nth-child line styles. */}
            <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
        </Tag>
    );
}

// Wires up the declarative scroll effects on a page:
//   data-fade         fades and lifts in once
//   data-clip         image wipes open once
//   data-speed="0.2"  parallax while it crosses the viewport
export function usePageMotion(deps = []) {
    useEffect(() => {
        const reduced = prefersReducedMotion();
        const once = document.querySelectorAll('[data-fade], [data-clip]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        once.forEach((el) => (reduced ? el.classList.add('is-in') : observer.observe(el)));

        const ctx = gsap.context(() => {
            if (reduced) return;
            document.querySelectorAll('[data-speed]').forEach((el) => {
                const speed = Number(el.dataset.speed) || 0.15;
                gsap.fromTo(
                    el,
                    { y: 0, yPercent: -speed * 50 },
                    {
                        yPercent: speed * 50,
                        ease: 'none',
                        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );
            });
        });

        return () => {
            observer.disconnect();
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

// Paragraph whose words light up as it is scrolled through.
export function ScrubText({ text, className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return undefined;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el.querySelectorAll('.st-w'),
                { opacity: 0.14 },
                {
                    opacity: 1,
                    stagger: 0.05,
                    ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
                }
            );
        }, el);
        return () => ctx.revert();
    }, [text]);

    return (
        <p ref={ref} className={className}>
            <span aria-hidden="true">
                {text.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                        <span className="st-w">{word}</span>{' '}
                    </React.Fragment>
                ))}
            </span>
            <span className="sr-only">{text}</span>
        </p>
    );
}
