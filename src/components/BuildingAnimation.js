import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createFacadeTexture(seedHue) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, `hsl(${seedHue + 8}, 38%, 24%)`);
  gradient.addColorStop(1, `hsl(${seedHue + 4}, 36%, 12%)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const columns = 8;
  const rows = 18;
  const cellWidth = canvas.width / columns;
  const cellHeight = canvas.height / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = column * cellWidth;
      const y = row * cellHeight;
      const lit = Math.random() > 0.42;
      const glassTone = lit
        ? `rgba(235, 238, 255, ${0.16 + Math.random() * 0.16})`
        : `rgba(18, 32, 54, ${0.58 + Math.random() * 0.1})`;

      context.fillStyle = 'rgba(8, 14, 26, 0.7)';
      context.fillRect(x + 5, y + 4, cellWidth - 10, cellHeight * 0.2);
      context.fillStyle = glassTone;
      context.fillRect(x + 6, y + 14, cellWidth - 12, cellHeight - 18);

      if (lit) {
        context.fillStyle = 'rgba(255, 195, 137, 0.28)';
        context.fillRect(x + 8, y + 16, cellWidth - 16, cellHeight - 22);
      }
    }
  }

  return new THREE.CanvasTexture(canvas);
}

function createTower(scene, options) {
  const { x, z, width, depth, height, tint, accent = 0xd4a66b } = options;
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const facadeTexture = createFacadeTexture(tint);
  facadeTexture.colorSpace = THREE.SRGBColorSpace;
  facadeTexture.anisotropy = 4;

  const facadeMaterial = new THREE.MeshStandardMaterial({
    color: tint,
    roughness: 0.28,
    metalness: 0.18,
    emissive: new THREE.Color(accent),
    emissiveMap: facadeTexture,
    emissiveIntensity: 0.35,
  });

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x07111d,
    roughness: 0.5,
    metalness: 0.1,
  });

  const stackHeights = [0.42, 0.3, 0.28];
  const stackWidths = [1, 0.75, 0.52];
  let cursorY = 0;

  stackHeights.forEach((ratio, index) => {
    const currentHeight = height * ratio;
    const currentWidth = width * stackWidths[index];
    const currentDepth = depth * stackWidths[index];
    const geometry = new THREE.BoxGeometry(currentWidth, currentHeight, currentDepth);
    geometry.translate(0, currentHeight / 2, 0);

    const materials = [
      facadeMaterial,
      facadeMaterial,
      baseMaterial,
      baseMaterial,
      facadeMaterial,
      facadeMaterial,
    ];

    const towerPart = new THREE.Mesh(geometry, materials);
    towerPart.position.y = cursorY;
    towerPart.castShadow = true;
    towerPart.receiveShadow = true;
    group.add(towerPart);
    cursorY += currentHeight;

    const band = new THREE.Mesh(
      new THREE.BoxGeometry(currentWidth + 0.18, 0.12, currentDepth + 0.18),
      new THREE.MeshStandardMaterial({ color: 0x09101b, roughness: 0.85 })
    );
    band.position.y = cursorY - 0.08;
    group.add(band);
  });

  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.34, height * 0.07, depth * 0.34),
    new THREE.MeshStandardMaterial({
      color: 0x0a1320,
      roughness: 0.22,
      metalness: 0.4,
      emissive: new THREE.Color(0xffc38d),
      emissiveIntensity: 0.16,
    })
  );
  crown.position.y = height + height * 0.045;
  group.add(crown);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(Math.max(width, depth) * 0.25, 0.08, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xffb178, transparent: true, opacity: 0.82 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = height + 0.55;
  group.add(halo);

  const beacon = new THREE.PointLight(0xffb178, 2.2, 12);
  beacon.position.set(0, height + 0.8, 0);
  group.add(beacon);

  group.userData = {
    halo,
    facadeTexture,
    drift: Math.random() * Math.PI * 2,
    scaleDelay: Math.random() * 0.8,
    scaleSpeed: 0.02 + Math.random() * 0.015,
    targetHeight: height,
  };
  group.scale.y = 0.01;

  scene.add(group);
  return group;
}

const BuildingAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111d);
    scene.fog = new THREE.FogExp2(0x07111d, 0.018);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 7.5, 34);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9eb7d3, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-18, 28, 18);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const coolLight = new THREE.PointLight(0x6fa8ff, 4.2, 90);
    coolLight.position.set(14, 10, 14);
    scene.add(coolLight);

    const warmLight = new THREE.PointLight(0xff9a63, 3.8, 90);
    warmLight.position.set(-12, 8, -10);
    scene.add(warmLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 140),
      new THREE.MeshStandardMaterial({
        color: 0x050b12,
        roughness: 0.92,
        metalness: 0.04,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(120, 60, 0x16314d, 0x0f2237);
    grid.position.y = 0.02;
    scene.add(grid);

    const sparkleGeometry = new THREE.BufferGeometry();
    const sparkleCount = 900;
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let index = 0; index < sparkleCount; index += 1) {
      sparklePositions[index * 3] = (Math.random() - 0.5) * 120;
      sparklePositions[index * 3 + 1] = 2 + Math.random() * 44;
      sparklePositions[index * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkles = new THREE.Points(
      sparkleGeometry,
      new THREE.PointsMaterial({ color: 0xe6eefc, size: 0.12, transparent: true, opacity: 0.68 })
    );
    scene.add(sparkles);

    const towers = [
      createTower(scene, { x: 0, z: 0, width: 7.5, depth: 6.5, height: 30, tint: 0x12233d, accent: 0xffbd87 }),
      createTower(scene, { x: -9, z: -1.2, width: 4.4, depth: 4.4, height: 23, tint: 0x0f1d31, accent: 0x8db7ff }),
      createTower(scene, { x: 9, z: -1.2, width: 4.4, depth: 4.4, height: 25, tint: 0x102038, accent: 0xffc185 }),
      createTower(scene, { x: -16, z: 5, width: 3.3, depth: 3.3, height: 14, tint: 0x0b1727, accent: 0x7ca6ff }),
      createTower(scene, { x: 15, z: 5, width: 3.2, depth: 3.2, height: 12, tint: 0x0b1727, accent: 0xffae7d }),
    ];

    const horizon = new THREE.Mesh(
      new THREE.SphereGeometry(58, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x0a1424, transparent: true, opacity: 0.34, side: THREE.BackSide })
    );
    horizon.position.y = -36;
    scene.add(horizon);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.12, 10, 80),
      new THREE.MeshBasicMaterial({ color: 0x8cb6ff, transparent: true, opacity: 0.35 })
    );
    orbitRing.rotation.x = Math.PI / 2;
    orbitRing.position.y = 13;
    scene.add(orbitRing);

    const orbitLight = new THREE.PointLight(0x9bc2ff, 2.5, 48);
    scene.add(orbitLight);

    let frameId;
    let elapsed = 0;
    let cameraPhase = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      elapsed += 0.016;
      cameraPhase += 0.0014;

      camera.position.x = Math.sin(cameraPhase) * 24;
      camera.position.z = Math.cos(cameraPhase) * 24;
      camera.position.y = 7.5 + Math.sin(elapsed * 0.4) * 0.8;
      camera.lookAt(0, 10, 0);

      towers.forEach((tower, index) => {
        const reveal = Math.min(1, Math.max(0.01, (elapsed - index * 0.12 - tower.userData.scaleDelay) * 1.8));
        tower.scale.y = reveal;
        tower.position.y = (1 - reveal) * tower.userData.targetHeight * 0.5;
        tower.rotation.y = Math.sin(elapsed * 0.25 + tower.userData.drift) * 0.04;
        tower.userData.halo.rotation.z = elapsed * (0.7 + index * 0.05);
      });

      orbitRing.rotation.z = elapsed * 0.18;
      orbitRing.position.x = Math.sin(elapsed * 0.22) * 2.5;
      orbitRing.position.z = Math.cos(elapsed * 0.22) * 1.8;

      orbitLight.position.set(Math.sin(elapsed * 0.9) * 18, 14 + Math.sin(elapsed * 0.6) * 2.4, Math.cos(elapsed * 0.9) * 18);
      warmLight.position.x = Math.sin(elapsed * 0.28) * 14;
      warmLight.position.z = Math.cos(elapsed * 0.28) * 12;
      coolLight.position.x = Math.sin(elapsed * 0.22 + Math.PI) * 16;
      coolLight.position.z = Math.cos(elapsed * 0.22 + Math.PI) * 16;
      sparkles.rotation.y = elapsed * 0.03;
      sparkles.rotation.x = Math.sin(elapsed * 0.12) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const nextWidth = mount.clientWidth;
      const nextHeight = mount.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
};

export default BuildingAnimation;
