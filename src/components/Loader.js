import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../motion/gsap';
import { prefersReducedMotion, useSiteMotion } from '../motion/SiteMotion';
import { scrambleTo } from '../motion/text';
import { company } from '../content';

// Shown once per visit; returning from the brochure skips it.
let introPlayed = false;

// Intro screen: a counter runs to 100 while the wordmark resolves, then the
// panel lifts away and the site is marked as loaded.
function Loader() {
    const { setLoaded } = useSiteMotion();
    const [done, setDone] = useState(introPlayed);
    const root = useRef(null);
    const count = useRef(null);
    const word = useRef(null);

    useEffect(() => {
        if (introPlayed) {
            setLoaded(true);
            return undefined;
        }
        const reduced = prefersReducedMotion();
        const state = { n: 0 };
        const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
        let tl;
        const cancelScramble = scrambleTo(word.current, `${company.name.toUpperCase()}`, { duration: 1.4, delay: 0.1 });

        fonts.then(() => {
            tl = gsap.timeline({
                onComplete: () => {
                    introPlayed = true;
                    setDone(true);
                },
            });
            tl.to(state, {
                n: 100,
                duration: reduced ? 0.2 : 1.7,
                ease: 'power3.inOut',
                onUpdate: () => {
                    if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(3, '0');
                },
            })
                .add(() => setLoaded(true))
                .to(root.current.querySelectorAll('.loader-fade'), { opacity: 0, duration: 0.3 })
                .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: reduced ? 0.2 : 1, ease: 'expo.inOut' }, '<0.1');
        });

        return () => {
            cancelScramble();
            tl?.kill();
        };
    }, [setLoaded]);

    if (done) return null;

    return (
        <div className="loader" ref={root} aria-hidden="true">
            <div className="loader-row loader-fade mono">
                <span>[ {company.coords} ]</span>
                <span>New Delhi — IN</span>
            </div>
            <div className="loader-center loader-fade">
                <span className="loader-word mono" ref={word}>
                    {company.name.toUpperCase()}
                </span>
            </div>
            <div className="loader-row loader-fade">
                <span className="mono">Architecture / Construction / Supply</span>
                <span className="loader-count" ref={count}>
                    000
                </span>
            </div>
        </div>
    );
}

export default Loader;
