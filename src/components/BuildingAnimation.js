import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createWindowTexture(cols, rows) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0d1828';
  ctx.fillRect(0, 0, 256, 512);

  const cw = 256 / cols;
  const rh = 512 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.55) {
        const isBlue = Math.random() < 0.2;
        const color = isBlue ? '#88aaff' : '#ffee88';
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = color;
        const x = c * cw + cw * 0.15;
        const y = r * rh + rh * 0.15;
        const w = cw * 0.7;
        const h = rh * 0.7;
        ctx.fillRect(x, y, w, h);
        ctx.shadowBlur = 0;
      }
    }
  }

  return new THREE.CanvasTexture(canvas);
}

const BuildingAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05091a);
    scene.fog = new THREE.FogExp2(0x05091a, 0.009);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 300);
    camera.position.set(0, 20, 42);
    camera.lookAt(0, 5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a2444, 2.5));

    const dirLight = new THREE.DirectionalLight(0x7799cc, 0.9);
    dirLight.position.set(-20, 40, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const orangeLight = new THREE.PointLight(0xff6b35, 6, 80);
    scene.add(orangeLight);

    const blueLight = new THREE.PointLight(0x4488ff, 4, 80);
    scene.add(blueLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x060b1a, shininess: 15 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    scene.add(new THREE.GridHelper(100, 50, 0x0c1530, 0x0c1530));

    // Stars
    const starPos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 400;
      starPos[i * 3 + 1] = Math.random() * 100 + 15;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8 })
    ));

    // Moon
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xdde8ff, emissive: 0x9999cc, emissiveIntensity: 0.6 })
    );
    moonMesh.position.set(-40, 55, -80);
    scene.add(moonMesh);

    // Building definitions: [x, z, w, d, h, colorHex]
    const defs = [
      [0,    0,   5.5, 5.5, 30, 0x1a2d5a],
      [-7.5, -3,  4,   4,   24, 0x162244],
      [7.5,  -3,  4,   4,   26, 0x1c2e52],
      [-13,   2,  3.5, 3.5, 17, 0x141e3c],
      [13,    2,  3.5, 3.5, 20, 0x182448],
      [-5,    9,  3,   3,   15, 0x12203a],
      [5,     9,  3.5, 3,   22, 0x1a2c4e],
      [-18,  -5,  3,   3,   13, 0x101828],
      [18,   -5,  3,   3,   11, 0x101828],
      [-10, -11,  2.5, 2.5,  9, 0x0e1626],
      [10,  -11,  2.5, 2.5, 10, 0x0e1626],
      [-22,   5,  2,   2,    8, 0x0c1220],
      [22,    5,  2,   2,    7, 0x0c1220],
      [-2,  -16,  2,   2,    7, 0x0c1220],
      [3,   -16,  2,   2,    8, 0x0c1220],
    ];

    const buildings = [];

    defs.forEach(([x, z, w, d, h, color], idx) => {
      const group = new THREE.Group();
      group.position.set(x, 0, z);

      const cols = Math.max(3, Math.ceil(w * 1.2));
      const rows = Math.max(4, Math.ceil(h / 1.5));
      const windowTex = createWindowTexture(cols, rows);

      const sideMat = new THREE.MeshPhongMaterial({
        color,
        shininess: 70,
        specular: new THREE.Color(0x334488),
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.35,
      });
      const capMat = new THREE.MeshPhongMaterial({ color: 0x080e20 });

      // BoxGeometry face order: +x, -x, +y, -y, +z, -z
      const geo = new THREE.BoxGeometry(w, h, d);
      geo.translate(0, h / 2, 0); // Pivot at bottom so scale.y rises upward
      const mesh = new THREE.Mesh(geo, [sideMat, sideMat, capMat, capMat, sideMat, sideMat]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Rooftop cap
      const roofGeo = new THREE.BoxGeometry(w * 0.85, 0.6, d * 0.85);
      const roof = new THREE.Mesh(roofGeo, capMat);
      roof.position.y = h + 0.3;
      group.add(roof);

      // Antenna on taller buildings
      if (h > 15) {
        const antennaH = h * 0.18;
        const antenna = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.07, antennaH, 6),
          new THREE.MeshPhongMaterial({ color: 0x888888 })
        );
        antenna.position.y = h + 0.6 + antennaH / 2;
        group.add(antenna);

        // Blinking red light
        const blinkMat = new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true });
        const blink = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), blinkMat);
        blink.position.y = h + 0.6 + antennaH;
        blink.userData.isLight = true;
        blink.userData.phase = Math.random() * Math.PI * 2;
        group.add(blink);
      }

      group.userData = {
        targetScale: 1,
        delay: idx * 0.18 + Math.random() * 0.1,
        speed: 0.055 + Math.random() * 0.02,
      };
      group.scale.y = 0.001;

      scene.add(group);
      buildings.push(group);
    });

    // Crane on tallest building (index 0, h=30)
    const craneMat = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
    const craneGroup = new THREE.Group();

    const craneTower = new THREE.Mesh(new THREE.BoxGeometry(0.35, 10, 0.35), craneMat);
    craneTower.position.y = 30 + 5;
    craneGroup.add(craneTower);

    const craneJib = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 0.25), craneMat);
    craneJib.position.set(3, 30 + 10.1, 0);
    craneGroup.add(craneJib);

    const counterJib = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 0.2), craneMat);
    counterJib.position.set(-4.5, 30 + 9.9, 0);
    craneGroup.add(counterJib);

    const counterWeight = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshPhongMaterial({ color: 0x666666 })
    );
    counterWeight.position.set(-6.5, 30 + 9.5, 0);
    craneGroup.add(counterWeight);

    // Hoist cable
    const cablePoints = [new THREE.Vector3(8, 30 + 10, 0), new THREE.Vector3(8, 30 + 3, 0)];
    const cable = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(cablePoints),
      new THREE.LineBasicMaterial({ color: 0xaaaaaa })
    );
    craneGroup.add(cable);

    const hook = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    hook.position.set(8, 30 + 3, 0);
    craneGroup.add(hook);

    scene.add(craneGroup);

    // Animation loop
    let time = 0;
    let animId;
    let camAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Rise buildings via scale (pivot at bottom due to geo.translate)
      buildings.forEach((group) => {
        if (time > group.userData.delay && group.scale.y < group.userData.targetScale) {
          group.scale.y = Math.min(
            group.userData.targetScale,
            group.scale.y + (group.userData.targetScale - group.scale.y) * group.userData.speed
          );
        }

        // Blink antenna lights
        group.children.forEach((child) => {
          if (child.userData.isLight) {
            child.material.opacity = Math.sin(time * 2.5 + child.userData.phase) > 0 ? 1 : 0;
          }
        });
      });

      // Slow camera orbit
      camAngle += 0.0018;
      camera.position.x = Math.sin(camAngle) * 42;
      camera.position.z = Math.cos(camAngle) * 42;
      camera.lookAt(0, 6, 0);

      // Orbit colored lights
      orangeLight.position.set(Math.sin(time * 0.25) * 22, 10, Math.cos(time * 0.25) * 22);
      blueLight.position.set(-Math.sin(time * 0.25) * 22, 10, -Math.cos(time * 0.25) * 22);

      // Crane rotation
      craneGroup.rotation.y = time * 0.18;

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
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default BuildingAnimation;
