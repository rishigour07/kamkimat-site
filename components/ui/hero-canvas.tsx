"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────── Particle Starfield ─────────────────────────── */

function ParticleStarfield({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const colorPalette = [
      new THREE.Color("#3B82F6"), // blue-500
      new THREE.Color("#60A5FA"), // blue-400
      new THREE.Color("#93C5FD"), // blue-300
      new THREE.Color("#CBD5E1"), // slate-300
      new THREE.Color("#E2E8F0"), // slate-200
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      sz[i] = Math.random() * 2.5 + 0.3;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.01;
    meshRef.current.rotation.x = Math.sin(time * 0.008) * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ────────────────────────── Floating Gradient Orb ────────────────────────── */

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = 1.5 + Math.sin(t * 0.3) * 0.5;
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[5, 1.5, -10]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#2563EB"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────── Mouse Parallax Camera ─────────────────────── */

function ParallaxCamera() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    targetRef.current.x +=
      (mouseRef.current.x * 0.8 - targetRef.current.x) * 0.02;
    targetRef.current.y +=
      (mouseRef.current.y * 0.5 - targetRef.current.y) * 0.02;

    camera.position.x = targetRef.current.x;
    camera.position.y = targetRef.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ───────────────────────────── Scene ────────────────────────────────── */

function Scene() {
  return (
    <>
      {/* Soft ambient + subtle blue point lights */}
      <ambientLight intensity={0.12} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#3B82F6" />
      <pointLight position={[-10, -5, -10]} intensity={0.15} color="#60A5FA" />

      {/* Drei Stars for backdrop depth */}
      <Stars
        radius={80}
        depth={60}
        count={1500}
        factor={2.5}
        saturation={0.1}
        fade
        speed={0.3}
      />

      {/* Custom particle starfield */}
      <ParticleStarfield count={800} />

      {/* Subtle floating orb */}
      <FloatingOrb />

      {/* Mouse parallax */}
      <ParallaxCamera />
    </>
  );
}

/* ───────────────────────────── Export ───────────────────────────────── */

export function HeroCanvas() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
