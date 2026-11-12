import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getLightStageRig, THEATRE_SEQUENCE_LENGTH } from "@/theatre/portfolioStage";

const pointerTarget = { x: 0, y: 0 };
let pointerBound = false;

function ensurePointerListener() {
  if (pointerBound || typeof window === "undefined") return;
  pointerBound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true },
  );
}

class StageErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const LIGHT_VEIL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LIGHT_VEIL_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uShift;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - 0.5 + uPointer * 0.025;
    float d = length(uv - vec2(0.28, 0.12));
    float wash = smoothstep(0.75, 0.0, d) * (0.045 + 0.015 * sin(uTime * 0.25));
    vec3 skyTint = mix(vec3(0.15, 0.39, 0.92), vec3(0.68, 0.48, 0.22), uShift);
    gl_FragColor = vec4(skyTint, wash);
  }
`;

interface StageSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

function LightTheatreScene({ scrollProgressRef }: StageSceneProps) {
  const rig = useMemo(() => getLightStageRig(), []);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  const groupRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  const smoothTimeRef = useRef(0);
  const pointerSmooth = useRef({ x: 0, y: 0 });
  const targetVec = useMemo(() => new THREE.Vector3(), []);

  const veilUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uShift: { value: 0.15 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    const targetSeqPos = THREE.MathUtils.clamp(
      scrollProgressRef.current * THEATRE_SEQUENCE_LENGTH,
      0,
      THEATRE_SEQUENCE_LENGTH,
    );
    smoothTimeRef.current = THREE.MathUtils.lerp(
      smoothTimeRef.current,
      targetSeqPos,
      1 - Math.exp(-dt * 5.5),
    );
    rig.sheet.sequence.position = smoothTimeRef.current;

    pointerSmooth.current.x = THREE.MathUtils.lerp(pointerSmooth.current.x, pointerTarget.x, 0.05);
    pointerSmooth.current.y = THREE.MathUtils.lerp(pointerSmooth.current.y, pointerTarget.y, 0.05);

    const camVal = rig.cameraObj.value;
    targetVec.set(
      camVal.position.x + pointerSmooth.current.x * 0.22,
      camVal.position.y + pointerSmooth.current.y * 0.14,
      camVal.position.z,
    );
    camera.position.lerp(targetVec, 0.12);
    camera.lookAt(0, 0, -2.5);

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - camVal.fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, camVal.fov, 0.1);
      camera.updateProjectionMatrix();
    }

    const mono = rig.monolithObj.value;
    if (groupRef.current) {
      groupRef.current.rotation.x = mono.rotation.x + Math.sin(t * 0.2) * 0.05;
      groupRef.current.rotation.y = mono.rotation.y + t * 0.06;
      groupRef.current.scale.setScalar(isMobile ? 0.65 : 1.0);
    }

    if (ringARef.current) {
      ringARef.current.rotation.x = Math.PI * 0.35 + t * 0.06;
      ringARef.current.rotation.z = t * 0.08;
      ringARef.current.scale.setScalar(mono.ringSpread);
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.y = Math.PI * 0.28 - t * 0.07;
      ringBRef.current.scale.setScalar(0.95 + (mono.ringSpread - 1) * 1.1);
    }

    veilUniforms.uTime.value = t;
    veilUniforms.uShift.value = rig.atmosphereObj.value.tintShift;
    veilUniforms.uPointer.value.set(pointerSmooth.current.x, pointerSmooth.current.y);
  });

  return (
    <>
      <ambientLight intensity={1.35} color="#ffffff" />
      <directionalLight position={[5, 6, 4]} intensity={0.75} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.45} color="#eff6ff" />

      {/* Whisper-quiet daylight tint wash */}
      <mesh position={[0, 0, -7.2]}>
        <planeGeometry args={[26, 18]} />
        <shaderMaterial
          vertexShader={LIGHT_VEIL_VERTEX}
          fragmentShader={LIGHT_VEIL_FRAGMENT}
          uniforms={veilUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Weightless architectural hairline drafting geometry in outer margin */}
      <group ref={groupRef} position={[isMobile ? 1.35 : 3.35, isMobile ? 1.1 : 0.2, -4.6]}>
        <mesh>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#f8fafc"
            emissiveIntensity={0.45}
            roughness={0.6}
            metalness={0.02}
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.36, 1]} />
          <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.1} />
        </mesh>
        <mesh ref={ringARef}>
          <torusGeometry args={[2.0, 0.006, 10, 96]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.11} />
        </mesh>
        <mesh ref={ringBRef}>
          <torusGeometry args={[2.45, 0.005, 10, 96]} />
          <meshBasicMaterial color="#78716c" transparent opacity={0.09} />
        </mesh>
      </group>
    </>
  );
}

interface CinematicStage3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export default function CinematicStage3D({ scrollProgressRef }: CinematicStage3DProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    ensurePointerListener();
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const staticFallback = (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 60% 45% at 85% 18%, rgba(37,99,235,0.045), transparent 65%), #faf9f6",
      }}
    />
  );

  if (reducedMotion) return staticFallback;

  return (
    <StageErrorBoundary fallback={staticFallback}>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" data-testid="cinematic-stage-3d">
        <Canvas
          camera={{ position: [0.6, 0.3, 6.8], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <LightTheatreScene scrollProgressRef={scrollProgressRef} />
        </Canvas>
      </div>
    </StageErrorBoundary>
  );
}
