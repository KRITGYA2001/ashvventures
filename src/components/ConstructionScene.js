import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ConstructionScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);
    scene.fog = new THREE.FogExp2(0x060a14, 0.022);

    // Camera — isometric-ish
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
    camera.position.set(22, 18, 22);
    camera.lookAt(0, 6, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a2040, 3));

    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(15, 25, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    const orangeLight = new THREE.PointLight(0xff6b35, 8, 40);
    orangeLight.position.set(-8, 12, 5);
    scene.add(orangeLight);

    const fillLight = new THREE.PointLight(0x4488ff, 3, 30);
    fillLight.position.set(10, 8, -8);
    scene.add(fillLight);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshPhongMaterial({ color: 0x07101f, shininess: 10 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    scene.add(new THREE.GridHelper(50, 25, 0x0d1a30, 0x0d1a30));

    const mat = (color, shine = 40) =>
      new THREE.MeshPhongMaterial({ color, shininess: shine, specular: 0x223366 });

    const box = (w, h, d, color, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    // ── MAIN BUILDING UNDER CONSTRUCTION ──
    // Completed floors (floors 1-4)
    const buildingColor = 0x1a2d55;
    const floorH = 2.2;
    const bW = 7, bD = 6;
    const completedFloors = 4;

    for (let i = 0; i < completedFloors; i++) {
      box(bW, floorH, bD, buildingColor, 0, floorH / 2 + i * floorH, 0);
      // Windows on each floor
      for (let w = 0; w < 3; w++) {
        const wx = -2.5 + w * 2.5;
        const wy = 0.6 + i * floorH;
        const winMat = new THREE.MeshBasicMaterial({ color: 0xffee88, transparent: true, opacity: 0.9 });
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), winMat);
        win.position.set(wx, wy, bD / 2 + 0.01);
        scene.add(win);
        const winB = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), winMat.clone());
        winB.position.set(wx, wy, -bD / 2 - 0.01);
        winB.rotation.y = Math.PI;
        scene.add(winB);
      }
    }

    // Floor being laid (top – partial concrete slab)
    const slabY = completedFloors * floorH;
    box(bW, 0.4, bD, 0x2a3a5a, 0, slabY + 0.2, 0);

    // Rebar sticking up from slab
    const rebarMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const rebarPositions = [[-2.5, 2.5], [-2.5, -2.5], [2.5, 2.5], [2.5, -2.5], [0, 2.5], [0, -2.5]];
    rebarPositions.forEach(([rx, rz]) => {
      const rebar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3, 6), rebarMat);
      rebar.position.set(rx, slabY + 0.4 + 1.5, rz);
      scene.add(rebar);
    });

    // ── SCAFFOLDING ──
    const scaffoldMat = new THREE.MeshPhongMaterial({ color: 0xc47a35 }); // steel orange
    const pole = (x, y, z, h, horiz = false) => {
      const p = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, h, 6),
        scaffoldMat
      );
      if (horiz) p.rotation.z = Math.PI / 2;
      p.position.set(x, y, z);
      scene.add(p);
    };

    // Vertical poles at corners & midpoints of scaffolding
    const scaffH = slabY + 3;
    const offsets = [[-4.2, -3.5], [-4.2, 3.5], [4.2, -3.5], [4.2, 3.5]];
    offsets.forEach(([sx, sz]) => {
      pole(sx, scaffH / 2, sz, scaffH);
    });
    // Horizontal cross-bars every floor
    for (let fl = 0; fl <= completedFloors; fl++) {
      const hy = fl * floorH + 0.5;
      pole(-4.2, hy, 0, 7, true);
      pole(4.2, hy, 0, 7, true);
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 7.8, 6), scaffoldMat);
      p.rotation.x = Math.PI / 2;
      p.position.set(0, hy, -3.5);
      scene.add(p);
      const p2 = p.clone();
      p2.position.set(0, hy, 3.5);
      scene.add(p2);
    }

    // ── TOWER CRANE ──
    const craneMat = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
    const craneBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), mat(0x333333));
    craneBase.position.set(7, 0.5, 2);
    scene.add(craneBase);

    const craneTower = new THREE.Mesh(new THREE.BoxGeometry(0.4, scaffH + 4, 0.4), craneMat);
    craneTower.position.set(7, (scaffH + 4) / 2, 2);
    craneTower.castShadow = true;
    scene.add(craneTower);

    const craneArm = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, 0.3), craneMat);
    craneArm.position.set(7 - 2, scaffH + 4, 2);
    scene.add(craneArm);

    const counterArm = new THREE.Mesh(new THREE.BoxGeometry(4, 0.25, 0.25), craneMat);
    counterArm.position.set(7 + 4, scaffH + 3.9, 2);
    scene.add(counterArm);

    const counterWeight = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat(0x555555));
    counterWeight.position.set(7 + 6, scaffH + 3.55, 2);
    scene.add(counterWeight);

    // Cable + hook
    const cablePoints = [
      new THREE.Vector3(7 - 6, scaffH + 4, 2),
      new THREE.Vector3(7 - 6, slabY + 1.2, 2),
    ];
    const cable = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(cablePoints),
      new THREE.LineBasicMaterial({ color: 0xaaaaaa })
    );
    scene.add(cable);

    const hookBlock = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), mat(0x888888));
    hookBlock.position.set(7 - 6, slabY + 0.8, 2);
    scene.add(hookBlock);

    // ── MATERIAL PILES ──
    // Brick pile
    for (let bi = 0; bi < 12; bi++) {
      const bx = -7 + (bi % 4) * 0.85;
      const by = 0.2 + Math.floor(bi / 4) * 0.4;
      const bz = -4 + (bi % 3) * 0.6;
      box(0.8, 0.38, 0.56, bi % 2 === 0 ? 0x8b3a1a : 0xa04422, bx, by, bz);
    }

    // Sand pile
    const sandGeo = new THREE.ConeGeometry(1.8, 1.2, 12);
    const sand = new THREE.Mesh(sandGeo, mat(0xc8a050, 10));
    sand.position.set(-7.5, 0.6, 3);
    scene.add(sand);

    // Cement bags
    for (let ci = 0; ci < 4; ci++) {
      box(0.9, 0.45, 0.55, 0x999999, -5.5 + ci * 0.3, 0.22 + ci * 0.45, 4);
    }

    // Concrete mixer
    const mixerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.5, 12), mat(0x444444));
    mixerBody.position.set(8, 0.75, -4);
    mixerBody.rotation.z = 0.4;
    scene.add(mixerBody);
    const mixerDrum = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1, 12), mat(0xff6b35));
    mixerDrum.position.set(8, 1.6, -4);
    scene.add(mixerDrum);

    // Hard hat on a box
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 16), mat(0xff6b35));
    hatBrim.position.set(-9, 1.45, 0);
    scene.add(hatBrim);
    const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 0.55, 16), mat(0xff6b35));
    hatTop.position.set(-9, 1.75, 0);
    scene.add(hatTop);
    box(0.9, 0.9, 0.9, 0x555555, -9, 0.45, 0); // box under hat

    // ── CONSTRUCTION SPARKS ── (particles at rebar level)
    const sparkCount = 60;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3]     = (Math.random() - 0.5) * bW;
      sparkPos[i * 3 + 1] = slabY + 0.5 + Math.random() * 2;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * bD;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({ color: 0xff9933, size: 0.12, transparent: true, opacity: 0.85 })
    );
    scene.add(sparks);

    // Construction light on top of building
    const workLight = new THREE.PointLight(0xffaa44, 5, 15);
    workLight.position.set(0, slabY + 2, 0);
    scene.add(workLight);

    // ── ANIMATION ──
    let time = 0;
    let animId;
    let camAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Slow camera orbit
      camAngle += 0.004;
      camera.position.x = Math.cos(camAngle) * 26;
      camera.position.z = Math.sin(camAngle) * 26;
      camera.lookAt(0, 6, 0);

      // Sparks flicker
      sparks.material.opacity = 0.5 + 0.5 * Math.abs(Math.sin(time * 8));
      workLight.intensity = 4 + 3 * Math.abs(Math.sin(time * 6));

      // Orbiting orange light
      orangeLight.position.x = Math.sin(time * 0.4) * 12;
      orangeLight.position.z = Math.cos(time * 0.4) * 12;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
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
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
};

export default ConstructionScene;
