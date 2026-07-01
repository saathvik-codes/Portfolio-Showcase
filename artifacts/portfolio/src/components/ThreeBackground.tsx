import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Module-level mouse state — shared across all Three.js components, no per-render listener
const mouse = { x: 0, y: 0 };
let mouseListenerAttached = false;

function attachMouseListener() {
  if (mouseListenerAttached || typeof window === "undefined") return;
  mouseListenerAttached = true;
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
}

function WireOrb({ position, scale, speed, rotAxis }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  rotAxis: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const basePos = useMemo(() => [...position] as [number, number, number], [position]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += rotAxis[0] * speed * 0.01;
    ref.current.rotation.y += rotAxis[1] * speed * 0.01;
    ref.current.rotation.z += rotAxis[2] * speed * 0.005;
    ref.current.position.x += (basePos[0] + mouse.x * 0.12 - ref.current.position.x) * 0.04;
    ref.current.position.y += (basePos[1] + mouse.y * 0.08 - ref.current.position.y) * 0.04;
  });

  return (
    <Float speed={speed * 0.6} rotationIntensity={0.15} floatIntensity={0.35}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.65}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function RingAccent({ position, rotation, speed = 0.002 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += speed;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[1.4, 0.007, 8, 80]} />
      <meshStandardMaterial
        color="#c084fc"
        emissive="#c084fc"
        emissiveIntensity={1}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function SceneInner() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  const orbConfigs = useMemo(() => {
    if (isMobile) {
      return [
        { position: [1.5, 0.2, -3.5] as [number, number, number], scale: 0.55, speed: 0.7, rotAxis: [1, 1, 0] as [number, number, number] },
        { position: [-1.8, -0.5, -5] as [number, number, number], scale: 0.75, speed: 0.5, rotAxis: [0, 1, 0.5] as [number, number, number] },
      ];
    }
    return [
      { position: [3.2, 0.5, -4] as [number, number, number],   scale: 0.6,  speed: 0.65, rotAxis: [1, 1, 0] as [number, number, number] },
      { position: [-3.5, -0.8, -6] as [number, number, number], scale: 0.85, speed: 0.45, rotAxis: [0, 1, 0.5] as [number, number, number] },
      { position: [1.8, 2.2, -7] as [number, number, number],   scale: 0.5,  speed: 0.9,  rotAxis: [0.5, 1, 0] as [number, number, number] },
      { position: [-1.2, -2.5, -8] as [number, number, number], scale: 0.7,  speed: 0.55, rotAxis: [1, 0, 0.5] as [number, number, number] },
    ];
  }, [isMobile]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 2]}   color="#8b5cf6" intensity={3}   distance={14} />
      <pointLight position={[-5, -3, -2]} color="#f0abfc" intensity={1.5} distance={10} />
      <pointLight position={[6, 2, -1]}   color="#818cf8" intensity={1.2} distance={10} />

      {orbConfigs.map((cfg, i) => (
        <WireOrb key={i} {...cfg} />
      ))}

      <RingAccent position={[2.5, 0, -5]} rotation={[Math.PI / 3, 0.3, 0]} />
      {!isMobile && (
        <RingAccent position={[-3, 1, -7]} rotation={[0.5, Math.PI / 4, 0.2]} speed={0.0015} />
      )}

      <Sparkles
        count={isMobile ? 28 : 55}
        scale={isMobile ? 8 : 14}
        size={isMobile ? 0.8 : 1.1}
        speed={0.22}
        color="#a78bfa"
        opacity={0.45}
      />
    </>
  );
}

export default function ThreeBackground() {
  useEffect(() => {
    attachMouseListener();
  }, []);

  const reduceMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (reduceMotion) return null;

  return (
    <div className="three-canvas" aria-hidden="true" data-testid="three-background">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <SceneInner />
      </Canvas>
    </div>
  );
}
