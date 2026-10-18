import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '../motion/gsap';
import { prefersReducedMotion } from '../motion/SiteMotion';
import { pad } from '../content';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const mod = (n, m) => ((n % m) + m) % m;

// Infinite, inertia-driven slider in the spirit of smooothy: drag, flick,
// trackpad-swipe or use the arrows; slides skew with velocity and their
// images drift against the motion.
function DragSlider({ items, renderItem, getKey, label = 'Slider' }) {
    const viewport = useRef(null);
    const slideEls = useRef([]);
    const state = useRef({ target: 0, current: 0, step: 1, dragging: false, moved: 0 });
    const [active, setActive] = useState(0);
    const count = items.length;

    // Repeat short lists so the loop always overfills wide screens.
    const copies = count === 0 ? 0 : Math.max(2, Math.ceil(12 / count));
    const slides = Array.from({ length: copies }, (_, c) => items.map((item, i) => ({ item, i, c }))).flat();

    const snap = useCallback(() => {
        const s = state.current;
        s.target = Math.round(s.target / s.step) * s.step;
    }, []);

    const nudge = useCallback(
        (dir) => {
            const s = state.current;
            s.target = Math.round(s.target / s.step) * s.step - dir * s.step;
        },
        []
    );

    useEffect(() => {
        const vp = viewport.current;
        if (!vp || count === 0) return undefined;
        const s = state.current;
        const reduced = prefersReducedMotion();
        let total = 0;
        let lastIndex = -1;
        let wheelTimer;

        const measure = () => {
            const first = slideEls.current[0];
            if (!first) return;
            const gap = parseFloat(getComputedStyle(vp).getPropertyValue('--slide-gap')) || 24;
            s.step = first.offsetWidth + gap;
            total = s.step * slides.length;
            snap();
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(vp);

        const tick = () => {
            const prev = s.current;
            s.current += (s.target - s.current) * (reduced ? 1 : 0.085);
            const velocity = s.current - prev;
            const vw = vp.offsetWidth;
            const skew = clamp(velocity * 0.18, -7, 7);

            slideEls.current.forEach((el, i) => {
                if (!el) return;
                let x = mod(i * s.step + s.current, total);
                if (x > total - s.step) x -= total;
                el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
                const center = x + s.step / 2 - vw / 2;
                const media = el.firstElementChild;
                if (media) media.style.setProperty('--drift', `${clamp(center / vw, -1.2, 1.2) * -9}%`);
            });

            const index = mod(Math.round(-s.current / s.step), count);
            if (index !== lastIndex) {
                lastIndex = index;
                setActive(index);
            }
        };
        gsap.ticker.add(tick);

        let startX = 0;
        let startTarget = 0;
        let lastX = 0;
        let lastT = 0;
        let vx = 0;

        const down = (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            s.dragging = true;
            s.moved = 0;
            startX = lastX = e.clientX;
            startTarget = s.target;
            lastT = performance.now();
            vx = 0;
            vp.classList.add('is-dragging');
        };
        const move = (e) => {
            if (!s.dragging) return;
            const now = performance.now();
            const dx = e.clientX - startX;
            s.moved = Math.max(s.moved, Math.abs(dx));
            if (s.moved > 4 && !vp.hasPointerCapture?.(e.pointerId)) vp.setPointerCapture?.(e.pointerId);
            s.target = startTarget + dx * 1.25;
            vx = (e.clientX - lastX) / Math.max(now - lastT, 1);
            lastX = e.clientX;
            lastT = now;
        };
        const up = () => {
            if (!s.dragging) return;
            s.dragging = false;
            vp.classList.remove('is-dragging');
            s.target += clamp(vx, -4, 4) * 260;
            snap();
        };
        // Swallow the click that ends a drag so slides don't open by accident.
        const click = (e) => {
            if (s.moved > 6) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        const wheel = (e) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
            e.preventDefault();
            s.target -= e.deltaX * 1.1;
            window.clearTimeout(wheelTimer);
            wheelTimer = window.setTimeout(snap, 140);
        };

        vp.addEventListener('pointerdown', down);
        vp.addEventListener('pointermove', move);
        vp.addEventListener('pointerup', up);
        vp.addEventListener('pointercancel', up);
        vp.addEventListener('lostpointercapture', up);
        vp.addEventListener('click', click, true);
        vp.addEventListener('wheel', wheel, { passive: false });

        return () => {
            gsap.ticker.remove(tick);
            ro.disconnect();
            window.clearTimeout(wheelTimer);
            vp.removeEventListener('pointerdown', down);
            vp.removeEventListener('pointermove', move);
            vp.removeEventListener('pointerup', up);
            vp.removeEventListener('pointercancel', up);
            vp.removeEventListener('lostpointercapture', up);
            vp.removeEventListener('click', click, true);
            vp.removeEventListener('wheel', wheel);
        };
    }, [count, slides.length, snap]);

    const onKey = (e) => {
        if (e.key === 'ArrowRight') nudge(1);
        if (e.key === 'ArrowLeft') nudge(-1);
    };

    return (
        <div className="slider" role="region" aria-roledescription="carousel" aria-label={label}>
            <div className="slider-viewport" ref={viewport} data-cursor="Drag" tabIndex={0} onKeyDown={onKey}>
                {slides.map(({ item, i, c }, k) => (
                    <div
                        className={`slider-slide ${i === active ? 'is-active' : ''}`}
                        key={`${getKey(item)}-${c}`}
                        ref={(el) => {
                            slideEls.current[k] = el;
                        }}
                        aria-hidden={c > 0}
                    >
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>
            <div className="slider-ui">
                <span className="mono slider-count">
                    {pad(active + 1)} <i>/</i> {pad(count)}
                </span>
                <div className="slider-bar" aria-hidden="true">
                    <span style={{ transform: `scaleX(${count ? (active + 1) / count : 0})` }} />
                </div>
                <div className="slider-arrows">
                    <button type="button" className="round-btn" onClick={() => nudge(-1)} aria-label="Previous">
                        ←
                    </button>
                    <button type="button" className="round-btn" onClick={() => nudge(1)} aria-label="Next">
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DragSlider;
