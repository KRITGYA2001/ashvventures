import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../motion/gsap';
import { prefersReducedMotion } from '../motion/SiteMotion';

// Endless strip of text that speeds up (and reverses) with scroll velocity.
function Marquee({ items, className = '', speed = 60 }) {
    const track = useRef(null);

    useEffect(() => {
        const el = track.current;
        if (!el || prefersReducedMotion()) return undefined;
        let x = 0;
        let boost = 0;
        let dir = -1;
        const half = () => el.scrollWidth / 2;

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                dir = self.direction === 1 ? -1 : 1;
                boost = Math.min(Math.abs(self.getVelocity()) / 220, 8);
            },
        });

        const tick = (_, delta) => {
            boost *= 0.94;
            x += dir * (speed + boost * speed) * (delta / 1000);
            const w = half();
            if (x <= -w) x += w;
            if (x > 0) x -= w;
            el.style.transform = `translate3d(${x}px,0,0)`;
        };
        gsap.ticker.add(tick);

        return () => {
            gsap.ticker.remove(tick);
            trigger.kill();
        };
    }, [speed]);

    const row = (copy) =>
        items.map((item, i) => (
            <span className="marquee-item" key={`${copy}-${i}`} aria-hidden={copy > 0}>
                {item}
                <span className="marquee-sep" aria-hidden="true">✶</span>
            </span>
        ));

    return (
        <div className={`marquee ${className}`}>
            <div className="marquee-track" ref={track}>
                {row(0)}
                {row(1)}
            </div>
        </div>
    );
}

export default Marquee;
