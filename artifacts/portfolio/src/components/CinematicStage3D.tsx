import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getPortfolioStageRig, THEATRE_SEQUENCE_LENGTH } from "@/theatre/portfolioStage";

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

const VEIL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const VEIL_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uMix;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float wave(vec2 p, float t) {
    return sin(p.x * 2.4 + t * 0.35) * cos(p.y * 2.1 - t * 0.25)
         + 0.5 * sin(p.x * 5.1 - t * 0.2 + p.y * 3.0);
  }

  void main() {
    vec2 uv = vUv - 0.5 + uPointer * 0.035;
    float r = length(uv);
    float n = wave(uv * 1.9, uTime);

    vec3 obsidian = vec3(0.035, 0.035, 0.045);
    vec3 tungsten = vec3(0.88, 0.58, 0.28);
    vec3 violet   = vec3(0.54, 0.44, 0.96);

    float band = smoothstep(0.65, 0.0, r) * (0.28 + 0.16 * n);
    vec3 accent = mix(tungsten, violet, clamp(uMix + uv.x * 0.35, 0.0, 1.0));
    vec3 col = obsidian + accent * band * 0.26;
    float alpha = smoothstep(0.85, 0.12, r) * 0.65;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface StageSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  onTimeUpdate?: (timeSeconds: number) => void;
}

function TheatreScene({ scrollProgressRef, onTimeUpdate }: StageSceneProps) {
  const rig = useMemo(() => getPortfolioStageRig(), []);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  const monolithGroupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);
  const keyLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const smoothTimeRef = useRef(0);
  const pointerSmooth = useRef({ x: 0, y: 0 });
  const lookTargetVec = useMemo(() => new THREE.Vector3(), []);
  const camTargetVec = useMemo(() => new THREE.Vector3(), []);
  const keyColorObj = useMemo(() => new THREE.Color(), []);
  const rimColorObj = useMemo(() => new THREE.Color(), []);
  const lastHudEmit = useRef(0);

  const veilUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMix: { value: 0.2 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  const particlePositions = useMemo(() => {
    const count = isMobile ? 75 : 150;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic golden-angle cylindrical scatter so it never flickers on re-mount
      const theta = i * 2.3999632;
      const radius = 2.4 + ((i * 7) % 19) * 0.26;
      const y = (((i * 13) % 37) / 37 - 0.5) * 6.8;
      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * radius - 2.6;
    }
    return arr;
  }, [isMobile]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // 1. Drive Theatre.js sequence playhead smoothly from scroll progress
    const targetSeqPos = THREE.MathUtils.clamp(
      scrollProgressRef.current * THEATRE_SEQUENCE_LENGTH,
      0,
      THEATRE_SEQUENCE_LENGTH,
    );
    smoothTimeRef.current = THREE.MathUtils.lerp(
      smoothTimeRef.current,
      targetSeqPos,
      1 - Math.exp(-dt * 6.5),
    );
    rig.sheet.sequence.position = smoothTimeRef.current;

    if (onTimeUpdate && t - lastHudEmit.current > 0.08) {
      lastHudEmit.current = t;
      onTimeUpdate(smoothTimeRef.current);
    }

    // 2. Subtle pointer damping layered over Theatre.js camera rig
    pointerSmooth.current.x = THREE.MathUtils.lerp(pointerSmooth.current.x, pointerTarget.x, 0.05);
    pointerSmooth.current.y = THREE.MathUtils.lerp(pointerSmooth.current.y, pointerTarget.y, 0.05);

    const camVal = rig.cameraObj.value;
    camTargetVec.set(
      camVal.position.x + pointerSmooth.current.x * 0.28,
      camVal.position.y + pointerSmooth.current.y * 0.16,
      camVal.position.z,
    );
    camera.position.lerp(camTargetVec, 0.14);
    lookTargetVec.set(camVal.target.x, camVal.target.y, camVal.target.z);
    camera.lookAt(lookTargetVec);

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - camVal.fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, camVal.fov, 0.12);
      camera.updateProjectionMatrix();
    }

    // 3. Apply Theatre.js lighting cues
    const lightVal = rig.lightsObj.value;
    if (keyLightRef.current) {
      keyColorObj.setRGB(lightVal.keyColor.r, lightVal.keyColor.g, lightVal.keyColor.b);
      keyLightRef.current.color.copy(keyColorObj);
      keyLightRef.current.intensity = lightVal.keyIntensity;
    }
    if (rimLightRef.current) {
      rimColorObj.setRGB(lightVal.rimColor.r, lightVal.rimColor.g, lightVal.rimColor.b);
      rimLightRef.current.color.copy(rimColorObj);
      rimLightRef.current.intensity = lightVal.rimIntensity;
    }

    // 4. Sculptural monolith & gimbal orbital assembly
    const mono = rig.monolithObj.value;
    if (monolithGroupRef.current) {
      monolithGroupRef.current.rotation.x = mono.rotation.x + Math.sin(t * 0.25) * 0.06;
      monolithGroupRef.current.rotation.y = mono.rotation.y + t * 0.075;
      const scale = (isMobile ? 0.72 : 1.0) * mono.coreScale;
      monolithGroupRef.current.scale.setScalar(scale);
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.14;
      innerCoreRef.current.rotation.z = Math.sin(t * 0.3) * 0.12;
    }

    const spread = mono.ringSpread;
    if (ringARef.current) {
      ringARef.current.rotation.x = Math.PI * 0.36 + t * 0.08;
      ringARef.current.rotation.z = t * 0.11;
      ringARef.current.scale.setScalar(spread);
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.y = Math.PI * 0.28 - t * 0.09;
      ringBRef.current.rotation.x = Math.PI * 0.68;
      ringBRef.current.scale.setScalar(0.95 + (spread - 1) * 1.25);
    }
    if (ringCRef.current) {
      ringCRef.current.rotation.z = -t * 0.05;
      ringCRef.current.rotation.y = Math.cos(t * 0.18) * 0.25;
      ringCRef.current.scale.setScalar(1.0 + (spread - 1) * 1.5);
    }

    // 5. Atmosphere shader & calibrated dust field
    const atm = rig.atmosphereObj.value;
    veilUniforms.uTime.value = t;
    veilUniforms.uMix.value = atm.shaderMix;
    veilUniforms.uPointer.value.set(pointerSmooth.current.x, pointerSmooth.current.y);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.014;
      pointsRef.current.scale.setScalar(atm.particleSpread);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#070709", 4.5, 17]} />
      <ambientLight intensity={0.22} color="#ded6c9" />
      <pointLight ref={keyLightRef} position={[4.5, 3.2, 3.8]} intensity={3.2} distance={18} decay={1.6} />
      <pointLight ref={rimLightRef} position={[-4.5, -2.0, 2.8]} intensity={2.2} distance={18} decay={1.6} />
      <directionalLight position={[0, 6, -4]} intensity={0.55} color="#f3efe6" />

      {/* Deep atmospheric GLSL horizon veil */}
      <mesh position={[0, 0, -5.5]}>
        <planeGeometry args={[22, 14]} />
        <shaderMaterial
          vertexShader={VEIL_VERTEX}
          fragmentShader={VEIL_FRAGMENT}
          uniforms={veilUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Architectural Monolith & Gyroscope Rings driven by Theatre.js */}
      <group ref={monolithGroupRef} position={[isMobile ? 0 : 1.75, 0.05, -2.4]}>
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[1.05, 0]} />
          <meshPhysicalMaterial
            color="#111018"
            metalness={0.86}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive="#1e1738"
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Precision anodized wireframe cage */}
        <mesh>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshStandardMaterial
            color="#e8a85a"
            emissive="#9d8cff"
            emissiveIntensity={0.35}
            wireframe
            transparent
            opacity={0.19}
          />
        </mesh>

        <mesh ref={ringARef}>
          <torusGeometry args={[1.95, 0.008, 12, 110]} />
          <meshStandardMaterial color="#eab370" emissive="#eab370" emissiveIntensity={0.85} transparent opacity={0.42} />
        </mesh>

        <mesh ref={ringBRef}>
          <torusGeometry args={[2.35, 0.006, 12, 120]} />
          <meshStandardMaterial color="#9d8cff" emissive="#9d8cff" emissiveIntensity={0.9} transparent opacity={0.32} />
        </mesh>

        <mesh ref={ringCRef}>
          <torusGeometry args={[2.75, 0.004, 8, 120]} />
          <meshBasicMaterial color="#ded6c9" transparent opacity={0.14} />
        </mesh>
      </group>

      {/* Calibrated drifting ambient particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#d9cef8"
          size={0.024}
          sizeAttenuation
          transparent
          opacity={0.36}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

interface CinematicStage3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
  onTimeUpdate?: (timeSeconds: number) => void;
}

export default function CinematicStage3D({ scrollProgressRef, onTimeUpdate }: CinematicStage3DProps) {
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
          "radial-gradient(ellipse 65% 50% at 75% 24%, rgba(232,168,90,0.08), transparent 60%), radial-gradient(ellipse 55% 50% at 22% 72%, rgba(157,140,255,0.08), transparent 65%), #09090b",
      }}
    />
  );

  if (reducedMotion) return staticFallback;

  return (
    <StageErrorBoundary fallback={staticFallback}>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" data-testid="cinematic-stage-3d">
        <Canvas
          camera={{ position: [0.55, 0.25, 6.4], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <TheatreScene scrollProgressRef={scrollProgressRef} onTimeUpdate={onTimeUpdate} />
        </Canvas>
      </div>
    </StageErrorBoundary>
  );
}
