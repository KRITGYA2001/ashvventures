import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '../motion/SiteMotion';

const COLORS = {
    bone: 0xe9e5de,
    slab: 0xf3f0ea,
    edge: 0x1a1918,
    glass: 0xa9bcc6,
    clay: 0xc4552b,
    column: 0x2a2826,
};

const FLOORS = 10;
const FLOOR_H = 1.15;
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Builds one storey: slab, glass skin, columns and an outline in drawing ink.
function buildFloor(i, shared) {
    const group = new THREE.Group();
    const w = 6.4 - (i % 3 === 2 ? 0.6 : 0);
    const d = 4.4;

    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.22, d), shared.slab);
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), shared.edge);
    group.add(edges);

    const glass = new THREE.Mesh(new THREE.BoxGeometry(w - 0.5, FLOOR_H - 0.22, d - 0.5), shared.glass);
    glass.position.y = FLOOR_H / 2;
    group.add(glass);

    const glassEdges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), shared.faint);
    glassEdges.position.y = glass.position.y;
    group.add(glassEdges);

    // Mullions along the long faces.
    const mullions = 7;
    for (let m = 0; m < mullions; m += 1) {
        const x = -w / 2 + 0.25 + (m * (w - 0.5)) / (mullions - 1);
        [-1, 1].forEach((side) => {
            const col = new THREE.Mesh(shared.mullion, shared.column);
            col.position.set(x, FLOOR_H / 2, side * (d / 2 - 0.25));
            col.castShadow = true;
            group.add(col);
        });
    }

    // A clay fin on alternating floors gives the massing its accent.
    if (i % 2 === 0) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.16, FLOOR_H, d * 0.7), shared.clay);
        fin.position.set(w / 2 + 0.08, FLOOR_H / 2, 0);
        fin.castShadow = true;
        group.add(fin);
    }

    return group;
}

// Hero 3D: a twisting glass tower that assembles floor by floor once the
// loader lifts, then pulls apart into an exploded axonometric as you scroll.
function TowerScene({ progress, start }) {
    const mount = useRef(null);
    const startRef = useRef(start);
    startRef.current = start;

    useEffect(() => {
        const host = mount.current;
        if (!host) return undefined;
        const reduced = prefersReducedMotion();
        const small = window.innerWidth < 760;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 2));
        renderer.setClearColor(0x000000, 0);
        // Soft shadows are the costliest pass; phones render without them.
        renderer.shadowMap.enabled = !small;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        // Fog range follows the camera distance, which is pulled back on phones.
        scene.fog = small ? new THREE.Fog(COLORS.bone, 46, 92) : new THREE.Fog(COLORS.bone, 26, 60);

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);

        scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b2a6, 1.6));
        const sun = new THREE.DirectionalLight(0xfff6ea, 2.4);
        sun.position.set(12, 22, 10);
        sun.castShadow = true;
        sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
        sun.shadow.camera.left = -16;
        sun.shadow.camera.right = 16;
        sun.shadow.camera.top = 18;
        sun.shadow.camera.bottom = -10;
        sun.shadow.bias = -0.0005;
        scene.add(sun);
        const warm = new THREE.PointLight(COLORS.clay, 30, 26, 1.6);
        warm.position.set(-6, 4, 6);
        scene.add(warm);

        const shared = {
            slab: new THREE.MeshStandardMaterial({ color: COLORS.slab, roughness: 0.85 }),
            glass: new THREE.MeshPhysicalMaterial({
                color: COLORS.glass,
                roughness: 0.08,
                metalness: 0.1,
                transparent: true,
                opacity: 0.32,
                clearcoat: 1,
                depthWrite: false,
            }),
            column: new THREE.MeshStandardMaterial({ color: COLORS.column, roughness: 0.6 }),
            clay: new THREE.MeshStandardMaterial({ color: COLORS.clay, roughness: 0.55 }),
            edge: new THREE.LineBasicMaterial({ color: COLORS.edge, transparent: true, opacity: 0.55 }),
            faint: new THREE.LineBasicMaterial({ color: COLORS.edge, transparent: true, opacity: 0.18 }),
            mullion: new THREE.BoxGeometry(0.06, FLOOR_H - 0.22, 0.06),
        };

        // Ground: soft shadow catcher and a drafting grid.
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.ShadowMaterial({ opacity: 0.16 }));
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);
        const grid = new THREE.GridHelper(80, 80, 0x8e8a83, 0x8e8a83);
        grid.material.transparent = true;
        grid.material.opacity = 0.22;
        grid.position.y = 0.002;
        scene.add(grid);

        // Plinth.
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 7), shared.slab);
        plinth.position.y = 0.15;
        plinth.receiveShadow = true;
        plinth.castShadow = true;
        scene.add(plinth);
        const plinthEdges = new THREE.LineSegments(new THREE.EdgesGeometry(plinth.geometry), shared.edge);
        plinthEdges.position.copy(plinth.position);
        scene.add(plinthEdges);

        const tower = new THREE.Group();
        tower.position.y = 0.3;
        scene.add(tower);

        // Core runs through the floors in clay.
        const core = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1, 1.1), shared.clay);
        core.castShadow = true;
        tower.add(core);

        const floors = Array.from({ length: FLOORS }, (_, i) => {
            const floor = buildFloor(i, shared);
            tower.add(floor);
            return floor;
        });

        // Roof frame.
        const roof = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(6.8, 0.9, 4.8)), shared.edge);
        tower.add(roof);

        const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
        const onPointer = (e) => {
            if (reduced) return;
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onPointer, { passive: true });

        const resize = () => {
            const { clientWidth: w, clientHeight: h } = host;
            renderer.setSize(w, h, false);
            camera.aspect = w / Math.max(h, 1);
            // Shift the frame in screen space so the tower sits right of the headline on wide screens.
            // On narrow screens drop it slightly so it sits between the headline and the intro.
            if (w >= 900) camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
            else camera.setViewOffset(w, h, 0, -h * 0.06, w, h);
            camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        io.observe(host);

        const clock = new THREE.Clock();
        let startedAt = null;
        let raf;
        let p = 0;
        let drawn = false;

        const frame = () => {
            raf = requestAnimationFrame(frame);
            if (!visible || document.hidden) return;
            const t = clock.getElapsedTime();
            if (startRef.current && startedAt === null) startedAt = t;
            // Nothing moves behind the loader, so draw one frame and wait.
            if (startedAt === null && !reduced && drawn) return;
            drawn = true;
            const intro = reduced ? 1 : startedAt === null ? 0 : (t - startedAt) / 2.6;

            // Ease scroll progress so it settles like the smooth scroll does.
            p += ((progress.current || 0) - p) * 0.08;
            const explode = easeInOut(clamp01(p));

            floors.forEach((floor, i) => {
                const local = easeOutExpo(clamp01(intro * 1.4 - i * 0.07));
                const baseY = i * FLOOR_H;
                const dropFrom = 14 + i * 0.6;
                floor.position.y = baseY + (1 - local) * dropFrom + explode * i * 0.85;
                floor.rotation.y = i * 0.055 + explode * (i - FLOORS / 2) * 0.06;
                floor.position.x = explode * Math.sin(i * 1.7) * 0.35;
                floor.visible = local > 0.001;
            });

            const height = FLOORS * FLOOR_H + explode * FLOORS * 0.85;
            const coreGrow = easeOutExpo(clamp01(intro * 1.2));
            core.scale.y = Math.max(height * coreGrow, 0.001);
            core.position.y = core.scale.y / 2;
            roof.position.y = height + 0.45;
            roof.rotation.y = FLOORS * 0.055 + explode * 0.3;
            roof.visible = intro > 0.8;

            pointer.sx += (pointer.x - pointer.sx) * 0.04;
            pointer.sy += (pointer.y - pointer.sy) * 0.04;
            const idle = reduced ? 0 : t * 0.04;
            const angle = 0.75 + idle + explode * 1.1 + pointer.sx * 0.18;
            const radius = (small ? 52 : 31) + explode * 6;
            const camY = 9 + explode * 9 - pointer.sy * 1.5;
            camera.position.set(Math.sin(angle) * radius, camY, Math.cos(angle) * radius);
            const lookY = 5.2 + explode * 6;
            camera.lookAt(0, lookY, 0);

            renderer.render(scene, camera);
        };
        frame();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener('pointermove', onPointer);
            scene.traverse((obj) => {
                obj.geometry?.dispose();
                if (obj.material && !Object.values(shared).includes(obj.material)) obj.material.dispose?.();
            });
            Object.values(shared).forEach((item) => item.dispose?.());
            renderer.dispose();
            host.removeChild(renderer.domElement);
        };
    }, [progress]);

    return <div className="tower-scene" ref={mount} aria-hidden="true" />;
}

export default TowerScene;
