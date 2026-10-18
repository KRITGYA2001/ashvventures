import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './gsap';

const SiteMotionContext = createContext({
    loaded: true,
    lenis: { current: null },
    go: () => {},
});

export const useSiteMotion = () => useContext(SiteMotionContext);

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll, the intro loader state and the page-wipe transition live here
// so every page can read them without prop drilling.
export function SiteMotionProvider({ children }) {
    const lenis = useRef(null);
    const wipe = useRef(null);
    const busy = useRef(false);
    const [loaded, setLoaded] = useState(false);
    const [wipeLabel, setWipeLabel] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;

        const instance = new Lenis({ lerp: 0.09, smoothWheel: true });
        lenis.current = instance;
        instance.on('scroll', ScrollTrigger.update);
        const tick = (time) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            instance.destroy();
            lenis.current = null;
        };
    }, []);

    // Lock scrolling while the loader is up.
    useEffect(() => {
        if (loaded) {
            lenis.current?.start();
            document.documentElement.classList.remove('is-loading');
        } else {
            lenis.current?.stop();
            document.documentElement.classList.add('is-loading');
        }
    }, [loaded]);

    useEffect(() => {
        if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
        return () => window.clearTimeout(id);
    }, [location.pathname]);

    const go = useCallback(
        (to, label = '') => {
            if (to === location.pathname || busy.current) return;
            const panel = wipe.current;

            if (!panel || prefersReducedMotion()) {
                navigate(to);
                return;
            }

            busy.current = true;
            setWipeLabel(label);
            gsap.timeline({
                onComplete: () => {
                    busy.current = false;
                },
            })
                .set(panel, { yPercent: 100, display: 'flex' })
                .to(panel, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
                .add(() => navigate(to))
                .to(panel, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.15 })
                .set(panel, { display: 'none' });
        },
        [location.pathname, navigate]
    );

    const value = useMemo(() => ({ loaded, setLoaded, lenis, go }), [loaded, go]);

    return (
        <SiteMotionContext.Provider value={value}>
            {children}
            <div className="page-wipe" ref={wipe} aria-hidden="true">
                <span className="mono">[ {wipeLabel || 'ASHV'} ]</span>
            </div>
        </SiteMotionContext.Provider>
    );
}
