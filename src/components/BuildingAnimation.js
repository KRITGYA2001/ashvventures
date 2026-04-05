import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ── Window texture: realistic curtain-wall grid ── */
function makeWindowTex(cols, rows) {
  const W = 512, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Facade gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0c1a30');
  bg.addColorStop(1, '#091422');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const cw = W / cols, rh = H / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cw, y = r * rh;
      // Spandrel band (dark strip top of each row)
      ctx.fillStyle = '#06101e';
      ctx.fillRect(x + 1, y + 1, cw - 2, rh * 0.22);
      // Window opening
      const lit = Math.random() < 0.62;
      if (lit) {
        const t = Math.random();
        if (t < 0.65) ctx.fillStyle = `rgba(255,225,130,${0.55 + Math.random() * 0.4})`;
        else if (t < 0.88) ctx.fillStyle = `rgba(160,200,255,${0.45 + Math.random() * 0.4})`;
        else ctx.fillStyle = `rgba(120,220,210,${0.4 + Math.random() * 0.3})`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fillRect(x + 2, y + rh * 0.24, cw - 4, rh * 0.72);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = 'rgba(20,40,70,0.5)';
        ctx.fillRect(x + 2, y + rh * 0.24, cw - 4, rh * 0.72);
      }
    }
  }
  return new THREE.CanvasTexture(canvas);
}

/* ── Materials ── */
const darkCap  = () => new THREE.MeshPhongMaterial({ color: 0x05080f, shininess: 20 });
const glassMat = (color, tex) => new THREE.MeshPhongMaterial({
  color,
  shininess: 130,
  specular: new THREE.Color(0x3366bb),
  emissiveMap: tex,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.42,
});

/* ── Floor-band strips (give scale & detail) ── */
function addFloorBands(group, w, d, h, spacing = 3) {
  const mat = new THREE.MeshPhongMaterial({ color: 0x08111f, shininess: 40 });
  for (let y = spacing; y < h; y += spacing) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(w + 0.18, 0.14, d + 0.18), mat);
    strip.position.y = y;
    group.add(strip);
  }
}

/* ── Parapet / roof cap ── */
function addRoof(group, w, d, h) {
  const cap = darkCap();
  const rim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.25, 0.55, d + 0.25), cap);
  rim.position.y = h + 0.27;
  group.add(rim);
  // Mechanical penthouse
  const ph = new THREE.Mesh(new THREE.BoxGeometry(w * 0.38, h * 0.07, d * 0.38), cap);
  ph.position.y = h + 0.55 + (h * 0.07) / 2;
  group.add(ph);
}

/* ── Spire / beacon ── */
function addSpire(group, h, scale = 1) {
  const spireH = h * 0.22 * scale;
  const mat = new THREE.MeshPhongMaterial({ color: 0xbbbbcc, shininess: 120 });
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.12, spireH, 8), mat);
  spire.position.y = h + 0.55 + spireH / 2;
  group.add(spire);

  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), beaconMat);
  beacon.position.y = h + 0.55 + spireH;
  beacon.userData.isLight = true;
  beacon.userData.phase = Math.random() * Math.PI * 2;
  group.add(beacon);
}

/* ── Core box with window texture ── */
function addBox(group, w, h, d, color) {
  const tex  = makeWindowTex(Math.max(3, Math.round(w * 2.2)), Math.max(4, Math.round(h / 2.2)));
  const cap  = darkCap();
  const side = glassMat(color, tex);
  const geo  = new THREE.BoxGeometry(w, h, d);
  geo.translate(0, h / 2, 0);
  const mesh = new THREE.Mesh(geo, [side, side, cap, cap, side, side]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}

/* ══════════════════════════════════════════════════
   BUILDING FACTORY  – 5 architectural types
══════════════════════════════════════════════════ */

// Type A: Tiered skyscraper (3 setbacks) — hero tower
function buildingTiered(x, z, baseW, baseH, color, idx) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);

  const t1h = baseH * 0.38, t2h = baseH * 0.35, t3h = baseH * 0.27;
  const t1w = baseW, t2w = baseW * 0.75, t3w = baseW * 0.52;

  addBox(g, t1w,       t1h,            t1w,       color);
  addFloorBands(g,     t1w,       t1w, t1h);

  addBox(g, t2w,       t2h,            t2w,       color);
  const top2 = new THREE.Group(); top2.position.y = t1h;
  addBox(top2, t2w, t2h, t2w, new THREE.Color(color).multiplyScalar(1.1).getHex());
  addFloorBands(top2, t2w, t2w, t2h);
  g.add(top2);

  const top3 = new THREE.Group(); top3.position.y = t1h + t2h;
  addBox(top3, t3w, t3h, t3w, new THREE.Color(color).multiplyScalar(1.2).getHex());
  addFloorBands(top3, t3w, t3w, t3h, 2.5);
  g.add(top3);

  addRoof(g, t3w, t3w, baseH);
  addSpire(g, baseH, 1.3);

  // Crown glow
  const crown = new THREE.PointLight(0xff8844, 3, 20);
  crown.position.set(0, baseH + 2, 0);
  g.add(crown);

  g.userData = { targetScale: 1, buildingH: baseH, delay: idx * 0.15, speed: 0.048 };
  g.scale.y = 0.001;
  return g;
}

// Type B: Slim glass tower with chamfered look
function buildingSlim(x, z, w, d, h, color, idx) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  addBox(g, w, h, d, color);
  addFloorBands(g, w, d, h, 3.2);
  addRoof(g, w, d, h);
  if (h > 18) addSpire(g, h);
  g.userData = { targetScale: 1, buildingH: h, delay: idx * 0.15 + Math.random() * 0.12, speed: 0.055 + Math.random() * 0.02 };
  g.scale.y = 0.001;
  return g;
}

// Type C: Base podium + tower (luxury high-rise style)
function buildingPodium(x, z, bW, bD, h, color, idx) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const podH = h * 0.22, towerH = h * 0.78;
  const tW = bW * 0.65, tD = bD * 0.65;

  // Wide podium base
  const podTex = makeWindowTex(Math.max(4, Math.round(bW * 2.5)), 3);
  const podMat = glassMat(new THREE.Color(color).offsetHSL(0, 0, -0.05).getHex(), podTex);
  const podGeo = new THREE.BoxGeometry(bW, podH, bD); podGeo.translate(0, podH / 2, 0);
  const pod = new THREE.Mesh(podGeo, [podMat, podMat, darkCap(), darkCap(), podMat, podMat]);
  pod.castShadow = true; g.add(pod);

  // Narrow tower above
  const towerGroup = new THREE.Group(); towerGroup.position.y = podH;
  addBox(towerGroup, tW, towerH, tD, color);
  addFloorBands(towerGroup, tW, tD, towerH, 3);
  addRoof(towerGroup, tW, tD, towerH);
  if (h > 22) addSpire(towerGroup, towerH);
  g.add(towerGroup);

  g.userData = { targetScale: 1, buildingH: h, delay: idx * 0.15 + Math.random() * 0.1, speed: 0.05 + Math.random() * 0.02 };
  g.scale.y = 0.001;
  return g;
}

// Type D: Short background block
function buildingBlock(x, z, w, d, h, color, idx) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  addBox(g, w, h, d, color);
  addFloorBands(g, w, d, h, 3.5);
  addRoof(g, w, d, h);
  g.userData = { targetScale: 1, buildingH: h, delay: idx * 0.15 + Math.random() * 0.15, speed: 0.06 + Math.random() * 0.02 };
  g.scale.y = 0.001;
  return g;
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const BuildingAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth, H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04071a);
    scene.fog = new THREE.FogExp2(0x04071a, 0.0075);

    // Camera — starts low, rises dramatically
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 400);
    camera.position.set(0, 4, 58);
    camera.lookAt(0, 8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x18243a, 3));

    const moon = new THREE.DirectionalLight(0x6688cc, 0.7);
    moon.position.set(-25, 50, 15);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    scene.add(moon);

    // City ground glow (warm orange from below)
    const groundGlow = new THREE.PointLight(0xff6b35, 2.5, 60);
    groundGlow.position.set(0, 0.5, 0);
    scene.add(groundGlow);

    const orangeLight = new THREE.PointLight(0xff7733, 5, 90);
    scene.add(orangeLight);
    const blueLight  = new THREE.PointLight(0x3366ff, 3.5, 90);
    scene.add(blueLight);

    // ── Ground — reflective ──
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x050a18, shininess: 80, specular: 0x1a3060 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(250, 250), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Road grid
    scene.add(new THREE.GridHelper(120, 60, 0x0a1530, 0x0a1530));

    // Road stripes
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x080f1e });
    [[120, 5, 0, 0], [5, 120, Math.PI / 2, 0]].forEach(([rw, rd, ry, _]) => {
      const r = new THREE.Mesh(new THREE.PlaneGeometry(rw, rd), roadMat);
      r.rotation.x = -Math.PI / 2; r.rotation.z = ry; r.position.y = 0.01;
      scene.add(r);
    });

    // ── Stars ──
    const starPos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 500;
      starPos[i*3+1] = 20 + Math.random() * 120;
      starPos[i*3+2] = (Math.random() - 0.5) * 500;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.85 })));

    // ── Moon ──
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xddeeff, emissive: 0xaabbdd, emissiveIntensity: 0.7 })
    );
    moonMesh.position.set(-45, 65, -90);
    scene.add(moonMesh);

    // ── Buildings ──
    const buildings = [];

    // Hero tiered skyscraper (centre)
    buildings.push(buildingTiered(0, 0, 7, 38, 0x1a3268, 0));

    // Flanking slim towers
    buildings.push(buildingSlim(-9, -2,  3.8, 3.8, 30, 0x16284e, 1));
    buildings.push(buildingSlim( 9, -2,  3.8, 3.8, 32, 0x1c2e58, 2));

    // Podium-style mid-rises
    buildings.push(buildingPodium(-15,  3, 5.5, 4.5, 24, 0x142040, 3));
    buildings.push(buildingPodium( 15,  3, 5.5, 4.5, 26, 0x182446, 4));

    // Slim office towers
    buildings.push(buildingSlim(-6,  10, 3.2, 3.2, 20, 0x111e38, 5));
    buildings.push(buildingSlim( 6,  10, 3.5, 3.2, 22, 0x192844, 6));
    buildings.push(buildingSlim(-20, -4, 3.2, 3.2, 16, 0x101828, 7));
    buildings.push(buildingSlim( 20, -4, 3.2, 3.2, 14, 0x101828, 8));

    // Background blocks
    buildings.push(buildingBlock(-12, -11, 2.8, 2.8, 11, 0x0d1525, 9));
    buildings.push(buildingBlock( 12, -11, 2.8, 2.8, 12, 0x0d1525, 10));
    buildings.push(buildingBlock(-25,  5,  2.4, 2.4,  9, 0x0b1220, 11));
    buildings.push(buildingBlock( 25,  5,  2.4, 2.4,  8, 0x0b1220, 12));
    buildings.push(buildingBlock( -3, -17, 2.2, 2.2,  8, 0x0b1220, 13));
    buildings.push(buildingBlock(  4, -17, 2.2, 2.2,  9, 0x0b1220, 14));

    buildings.forEach(b => scene.add(b));

    // ── Tower Crane (on hero building) ──
    const craneMat = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
    const craneGroup = new THREE.Group();

    const mkBox = (w, h, d, mat, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      return m;
    };
    craneGroup.add(mkBox(0.38, 12, 0.38, craneMat,  0,  38 + 6,  0));  // tower
    craneGroup.add(mkBox(16,  0.28, 0.28, craneMat,  3,  38 + 12, 0));  // jib
    craneGroup.add(mkBox(5,   0.22, 0.22, craneMat, -5,  38 + 11.8, 0)); // counter-jib
    craneGroup.add(mkBox(0.9, 0.9, 0.9, new THREE.MeshPhongMaterial({ color: 0x555 }), -7.5, 38 + 11.4, 0));
    const cablePts = [new THREE.Vector3(9, 38 + 12, 0), new THREE.Vector3(9, 38 + 4, 0)];
    craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cablePts),
      new THREE.LineBasicMaterial({ color: 0xcccccc })));
    craneGroup.add(mkBox(0.55, 0.55, 0.55, new THREE.MeshPhongMaterial({ color: 0x888 }), 9, 38 + 4, 0));
    scene.add(craneGroup);

    // ── Construction sparks per building ──
    const sparkLights = buildings.map(g => {
      const l = new THREE.PointLight(0xff8833, 0, 16);
      l.position.set(g.position.x, 0, g.position.z);
      scene.add(l);
      return { l, g, bh: g.userData.buildingH };
    });

    // ── Animation ──
    let time = 0, animId, camAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Camera rises at start
      if (camera.position.y < 20) camera.position.y += 0.045;

      // Orbit
      camAngle += 0.0017;
      camera.position.x = Math.sin(camAngle) * 50;
      camera.position.z = Math.cos(camAngle) * 50;
      camera.lookAt(0, 9, 0);

      // Rise buildings
      buildings.forEach(g => {
        if (time > g.userData.delay && g.scale.y < 1) {
          g.scale.y = Math.min(1, g.scale.y + (1 - g.scale.y) * g.userData.speed);
        }
        g.children.forEach(c => {
          if (c.userData.isLight) c.material.opacity = Math.sin(time * 2.8 + c.userData.phase) > 0 ? 1 : 0;
        });
      });

      // Construction sparks track building top
      sparkLights.forEach(({ l, g, bh }) => {
        const rising = g.scale.y < 0.98;
        l.position.y = bh * g.scale.y + 0.5;
        if (rising && time > g.userData.delay)
          l.intensity = 4 + 3 * Math.abs(Math.sin(time * 14 + g.position.x));
        else
          l.intensity = Math.max(0, l.intensity - 0.06);
      });

      // Orbit accent lights
      orangeLight.position.set(Math.sin(time * 0.22) * 28, 12, Math.cos(time * 0.22) * 28);
      blueLight.position.set(-Math.sin(time * 0.22) * 28, 12, -Math.cos(time * 0.22) * 28);
      groundGlow.intensity = 2 + Math.sin(time * 0.3) * 0.5;

      // Crane rotation
      craneGroup.rotation.y = time * 0.16;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
  );
};

export default BuildingAnimation;
