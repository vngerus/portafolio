'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface NeoTokyoCanvasProps {
  className?: string;
}

const NeoTokyoCanvas: React.FC<NeoTokyoCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Dimensions - dynamically matches container / viewport for full-bleed background
    const getWidth = () => container.clientWidth || window.innerWidth || 1200;
    const getHeight = () => container.clientHeight || window.innerHeight || 800;

    let width = getWidth();
    let height = getHeight();

    // Scene & Camera - perfectly framed so the circular island fits comfortably without cropping left/right
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.62, 3.85);
    camera.lookAt(0, -0.58, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);

    // Direct texture loading from public/textures to ensure guaranteed, uncompressed fidelity
    const textureLoader = new THREE.TextureLoader();

    // 1. shad2.jpg (2048x2048) - The iconic radial blast and building shadows
    const shad2Texture = textureLoader.load('/textures/shad2.jpg');
    shad2Texture.colorSpace = THREE.SRGBColorSpace;
    shad2Texture.wrapS = THREE.ClampToEdgeWrapping;
    shad2Texture.wrapT = THREE.ClampToEdgeWrapping;
    shad2Texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 2. akit.jpg (256x256) - The architectural window grid for building facades
    const akitTexture = textureLoader.load('/textures/akit.jpg');
    akitTexture.colorSpace = THREE.SRGBColorSpace;
    akitTexture.wrapS = THREE.RepeatWrapping;
    akitTexture.wrapT = THREE.RepeatWrapping;
    akitTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Lighting for the buildings
    // Main blast light radiating outwards from the epicenter
    const blastLight = new THREE.PointLight(0xffffff, 9.0, 30, 1.1);
    blastLight.position.set(0, 0.65, 0);
    scene.add(blastLight);

    // Subtle overhead directional fill
    const topFill = new THREE.DirectionalLight(0xffffff, 0.55);
    topFill.position.set(0, 8, 4);
    scene.add(topFill);

    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // Pivot group with diorama isometric tilt
    const modelGroup = new THREE.Group();
    const BASE_TILT_X = 0.50; // ~29 deg downward tilt
    modelGroup.rotation.x = BASE_TILT_X;
    scene.add(modelGroup);

    // Mouse tracking for subtle parallax
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseTargetX = (e.clientX - halfW) / halfW;
      mouseTargetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // GLTF / Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let loadedModel: THREE.Group | null = null;

    loader.load(
      '/models/neo-tokyo-diorama.glb',
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Strip out the white background dome ("FONDO")
        const toRemove: THREE.Object3D[] = [];
        model.traverse((child) => {
          const isFondoName = child.name && child.name.toUpperCase().includes('FONDO');
          const isFondoMat =
            (child as THREE.Mesh).isMesh &&
            (((child as THREE.Mesh).material as THREE.Material)?.name?.toUpperCase()?.includes('FONDO'));

          if (isFondoName || isFondoMat) {
            toRemove.push(child);
          }
        });

        toRemove.forEach((obj) => {
          if (obj.parent) obj.parent.remove(obj);
          if ((obj as THREE.Mesh).isMesh) {
            (obj as THREE.Mesh).geometry?.dispose();
          }
        });

        // Apply authentic materials matching NAVAZA's original Sketchfab render
        model.traverse((child) => {
          if (!(child as THREE.Mesh).isMesh) return;
          const mesh = child as THREE.Mesh;
          const meshName = mesh.name ? mesh.name.toUpperCase() : '';
          const matName = mesh.material && (mesh.material as THREE.Material).name
            ? (mesh.material as THREE.Material).name.toUpperCase()
            : '';

          // 1. GROUND (SUELO): Rendered with MeshBasicMaterial using shad2.jpg
          // This preserves the full 2048x2048 black-and-white radial shadows and blast rays without washout
          if (meshName.startsWith('SUELO') || matName === 'SUELO') {
            mesh.material = new THREE.MeshBasicMaterial({
              map: shad2Texture,
            });
          }

          // 2. CENTRAL BLACK SPHERE (BOMBAA and BOMBAB): Pure pitch-black singularity
          else if (
            meshName.startsWith('BOMBAA') ||
            meshName.startsWith('BOMBAB') ||
            matName === 'BOMBAA1'
          ) {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x000000,
            });
            mesh.scale.multiplyScalar(1.35);
          }

          // 3. BLAST CRATER EXPANSION (BOMBAC): Pure blinding glowing white
          else if (meshName.startsWith('BOMBAC')) {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
            });
          }

          // 4. BUILDINGS (EDIFICIOS): Window grid texture lit from the central blast
          else if (meshName.startsWith('EDIFICIOS') || matName === 'EDIFICIOS') {
            mesh.material = new THREE.MeshLambertMaterial({
              map: akitTexture,
              color: 0xffffff,
            });
          }

          // 5. BASE & UNDERSIDE (BASEyESCOMBROS): Pure black to blend seamlessly with background
          else if (meshName.startsWith('BASE') || matName === 'BASEYESCOMBROS') {
            if (meshName.startsWith('ESCOMBROS')) {
              // Debris chunks around crater
              mesh.material = new THREE.MeshLambertMaterial({
                color: 0xcccccc,
              });
            } else {
              // Outer rim and cylinder base - pure black to melt seamlessly into background
              mesh.material = new THREE.MeshBasicMaterial({
                color: 0x000000,
              });
            }
          }

          // 6. ROADS (CAMINOS): Dark asphalt
          else if (meshName.startsWith('CAMINOS') || matName === 'CAMINOS1') {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x111111,
            });
          }

          // 7. WATER (AGUA): Dark reflective canal
          else if (meshName.startsWith('AGUA') || matName === 'AGUA1') {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x222222,
            });
          }

          // 8. TREES (ARBOLES): Deep dark green/black
          else if (meshName.startsWith('ARBOLES') || matName === 'ARBOLES1') {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x050505,
            });
          }
        });

        loadedModel = model;

        // Auto-center & scale based on diorama bounds
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 4.65 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        modelGroup.add(model);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.warn('Failed to load Neo-Tokyo 3D diorama:', err);
      }
    );

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (loadedModel) {
        // Idle very gentle, subtle rotation around Y (slow cinematic drift)
        loadedModel.rotation.y += 0.0006;

        // Subtle mouse parallax damping
        currentTiltX += (mouseTargetY * 0.08 - currentTiltX) * 0.05;
        currentTiltY += (mouseTargetX * 0.16 - currentTiltY) * 0.05;

        modelGroup.rotation.x = BASE_TILT_X + currentTiltX;
        modelGroup.rotation.z = -currentTiltY * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newW = getWidth();
      const newH = getHeight();
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      dracoLoader.dispose();
      shad2Texture.dispose();
      akitTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none transition-opacity duration-1000 ease-out"
        style={{
          opacity: loaded ? 0.96 : 0,
        }}
      />
    </div>
  );
};

export default NeoTokyoCanvas;
