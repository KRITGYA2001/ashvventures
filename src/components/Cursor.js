import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../motion/gsap';

// A trailing ring that grows over links and shows a label over
// anything marked with data-cursor="Label". Fine pointers only.
function Cursor() {
    const ring = useRef(null);
    const [label, setLabel] = useState('');
    const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

    useEffect(() => {
        if (!enabled) return undefined;
        const el = ring.current;
        const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

        const move = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            el.classList.add('is-visible');
        };
        const over = (e) => {
            const labelled = e.target.closest('[data-cursor]');
            const linky = e.target.closest('a, button, [role="button"], input, textarea, select, label');
            setLabel(labelled ? labelled.dataset.cursor : '');
            el.classList.toggle('is-link', !!linky && !labelled);
            el.classList.toggle('is-label', !!labelled);
        };
        const leave = () => el.classList.remove('is-visible');
        const down = () => el.classList.add('is-down');
        const up = () => el.classList.remove('is-down');

        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerover', over);
        document.documentElement.addEventListener('pointerleave', leave);
        window.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        return () => {
            window.removeEventListener('pointermove', move);
            document.removeEventListener('pointerover', over);
            document.documentElement.removeEventListener('pointerleave', leave);
            window.removeEventListener('pointerdown', down);
            window.removeEventListener('pointerup', up);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div className="cursor" ref={ring} aria-hidden="true">
            <span className="cursor-ring">
                <span className="cursor-label mono">{label}</span>
            </span>
        </div>
    );
}

export default Cursor;
