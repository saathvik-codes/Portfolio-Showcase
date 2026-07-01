import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Module-level mouse — one listener, shared by all frames
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
let attached = false;
function attachMouse() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener("mousemove", (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
}

// ─── Camera Rig — TRUE 3D parallax scope ──────────────────────────────────
function CameraRig() {
  useFrame((state) => {
    // Smooth lerp to target — camera orbits, not objects
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    state.camera.position.x += (mouse.x * 1.4 - state.camera.position.x) * 0.04;
    state.camera.position.y += (mouse.y * 0.7 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Scan line component ──────────────────────────────────────────────────
function ScanLine({ parentWidth }: { parentWidth: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.9) * 1.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.32]}>
      <planeGeometry args={[parentWidth + 0.1, 0.018]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
    </mesh>
  );
}

// ─── AI Face ─────────────────────────────────────────────────────────────
function AIFace({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const dataOrbs = useRef<(THREE.Mesh | null)[]>([]);

  const scale = isMobile ? 0.78 : 1.22;
  const xOffset = 0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Eye pulse
    if (leftEyeRef.current) {
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 2.5) * 0.6;
    }
    if (rightEyeRef.current) {
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 2.5 + 0.4) * 0.6;
    }

    // Outer ring rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.18;
      outerRingRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.28;
    }

    // Data orbs orbit
    dataOrbs.current.forEach((orb, i) => {
      if (!orb) return;
      const angle = t * 0.5 + (i / dataOrbs.current.length) * Math.PI * 2;
      const radius = 1.85;
      orb.position.x = Math.cos(angle) * radius;
      orb.position.y = Math.sin(angle) * radius * 0.6;
    });
  });

  const mouthBars = [-0.15, -0.07, 0.01, 0.09];

  return (
    <Float speed={0.7} rotationIntensity={0.04} floatIntensity={0.18}>
      <group ref={groupRef} position={[xOffset, 0.1, 0]} scale={scale}>

        {/* ── Head plate ── */}
        <mesh>
          <boxGeometry args={[2.0, 2.7, 0.55]} />
          <meshStandardMaterial
            color="#080818"
            metalness={0.96}
            roughness={0.06}
            emissive="#6d28d9"
            emissiveIntensity={0.04}
          />
        </mesh>

        {/* ── Side rails ── */}
        {([-0.9, 0.9] as const).map((x, i) => (
          <mesh key={i} position={[x, 0, 0.24]}>
            <boxGeometry args={[0.18, 2.5, 0.1]} />
            <meshStandardMaterial
              color="#1e1240"
              metalness={0.9}
              roughness={0.1}
              emissive="#7c3aed"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* ── Forehead glowstrip ── */}
        <mesh position={[0, 1.2, 0.23]}>
          <boxGeometry args={[1.62, 0.12, 0.08]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.2} />
        </mesh>

        {/* ── Left eye ── */}
        <mesh ref={leftEyeRef} position={[-0.52, 0.38, 0.3]}>
          <boxGeometry args={[0.58, 0.18, 0.06]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2} />
        </mesh>
        {/* left eye brow */}
        <mesh position={[-0.52, 0.6, 0.29]}>
          <boxGeometry args={[0.5, 0.04, 0.04]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.4} transparent opacity={0.55} />
        </mesh>

        {/* ── Right eye ── */}
        <mesh ref={rightEyeRef} position={[0.52, 0.38, 0.3]}>
          <boxGeometry args={[0.58, 0.18, 0.06]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} />
        </mesh>
        {/* right eye brow */}
        <mesh position={[0.52, 0.6, 0.29]}>
          <boxGeometry args={[0.5, 0.04, 0.04]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.4} transparent opacity={0.55} />
        </mesh>

        {/* ── Nose bridge ── */}
        <mesh position={[0, 0.05, 0.31]}>
          <boxGeometry args={[0.06, 0.28, 0.04]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.9} transparent opacity={0.5} />
        </mesh>

        {/* ── Mouth grill ── */}
        {mouthBars.map((y, i) => (
          <mesh key={i} position={[0, y - 0.44, 0.29]}>
            <boxGeometry args={[0.72, 0.025, 0.04]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={1.4 - i * 0.25}
              transparent
              opacity={0.92 - i * 0.12}
            />
          </mesh>
        ))}

        {/* ── Chin glowstrip ── */}
        <mesh position={[0, -1.2, 0.23]}>
          <boxGeometry args={[1.62, 0.12, 0.08]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.9} />
        </mesh>

        {/* ── Circuit traces on face ── */}
        {[
          { pos: [-0.7, 0.0, 0.3] as [number, number, number], w: 0.22, h: 0.02 },
          { pos: [0.7, 0.0, 0.3] as [number, number, number], w: 0.22, h: 0.02 },
          { pos: [-0.7, -0.2, 0.3] as [number, number, number], w: 0.12, h: 0.02 },
          { pos: [0.7, -0.2, 0.3] as [number, number, number], w: 0.12, h: 0.02 },
        ].map((t, i) => (
          <mesh key={i} position={t.pos}>
            <boxGeometry args={[t.w, t.h, 0.02]} />
            <meshStandardMaterial color="#6d28d9" emissive="#6d28d9" emissiveIntensity={0.9} transparent opacity={0.55} />
          </mesh>
        ))}

        {/* ── Scan line ── */}
        <ScanLine parentWidth={2.0} />

        {/* ── Outer orbital ring ── */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.8, 0.012, 8, 90]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>

        {/* ── Inner ring ── */}
        <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.008, 8, 80]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.22} />
        </mesh>

        {/* ── Dashed ring (CSS-style dashes via segmented arc) ── */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const r = 2.15;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.7, 0.1]}>
              <boxGeometry args={[0.06, 0.06, 0.04]} />
              <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
            </mesh>
          );
        })}

        {/* ── Data orbs (orbiting) ── */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} ref={(el) => { dataOrbs.current[i] = el; }}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#a78bfa" : "#f0abfc"}
              emissive={i % 2 === 0 ? "#a78bfa" : "#f0abfc"}
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}

      </group>
    </Float>
  );
}

// ─── Background environment ───────────────────────────────────────────────
function Environment({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 3, 3]}   color="#8b5cf6" intensity={4}   distance={12} />
      <pointLight position={[-4, -2, 1]} color="#f0abfc" intensity={2}   distance={10} />
      <pointLight position={[5, 1, 0]}   color="#818cf8" intensity={1.8} distance={10} />

      {/* Dedicated face fill light */}
      <pointLight position={[2.0, 0.5, 2.5]} color="#ffffff" intensity={1.2} distance={6} />

      <Sparkles
        count={isMobile ? 30 : 55}
        scale={isMobile ? 9 : 16}
        size={isMobile ? 0.7 : 1.0}
        speed={0.2}
        color="#a78bfa"
        opacity={0.4}
      />
    </>
  );
}

// ─── Responsive check inside canvas ──────────────────────────────────────
function SceneInner() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  return (
    <>
      <CameraRig />
      <Environment isMobile={isMobile} />
      <AIFace isMobile={isMobile} />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────────────────
export default function AIHeroScene() {
  useEffect(() => { attachMouse(); }, []);

  const reduceMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (reduceMotion) return null;

  return (
    <div className="three-canvas" aria-hidden="true" data-testid="ai-hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 52 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <SceneInner />
      </Canvas>
    </div>
  );
}
