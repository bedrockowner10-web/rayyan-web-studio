import { addAfterEffect, Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox, ContactShadows, Sparkles } from "@react-three/drei";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

const S = 1 / 20;
const P = (x: number, y: number) => new THREE.Vector2((x - 45) * S, (30 - y) * S);
const T = 0.34; // stroke thickness

/** Reveal only after this scene has completed two real render-loop frames. */
function SceneReadiness({ onReady, onError }: { onReady: () => void; onError: () => void }) {
  const gl = useThree((state) => state.gl);
  const framePending = useRef(false);
  useFrame(() => {
    framePending.current = true;
  });
  useEffect(() => {
    let active = true;
    let frames = 0;
    let notified = false;
    let revealFrame: number | undefined;
    const canvas = gl.domElement;
    const fail = (event?: Event) => {
      event?.preventDefault();
      if (!active) return;
      active = false;
      if (revealFrame !== undefined) cancelAnimationFrame(revealFrame);
      onError();
    };
    canvas.addEventListener("webglcontextlost", fail);
    canvas.addEventListener("webglcontextcreationerror", fail);
    const unsubscribe = addAfterEffect(() => {
      if (!active || notified || !framePending.current) return;
      framePending.current = false;
      if (gl.getContext().isContextLost()) {
        fail();
        return;
      }
      frames += 1;
      if (frames < 2) return;
      notified = true;
      // Let the browser present the completed frame before exposing the canvas.
      revealFrame = requestAnimationFrame(() => {
        if (!active) return;
        if (gl.getContext().isContextLost()) fail();
        else onReady();
      });
    });
    return () => {
      active = false;
      unsubscribe();
      if (revealFrame !== undefined) cancelAnimationFrame(revealFrame);
      canvas.removeEventListener("webglcontextlost", fail);
      canvas.removeEventListener("webglcontextcreationerror", fail);
      // Canvas owns and disposes its renderer, scene and declarative resources.
    };
  }, [gl, onReady, onError]);
  return null;
}

function Glass() {
  return (
    <meshPhysicalMaterial
      color="#5b8cff"
      transmission={0.92}
      thickness={0.9}
      roughness={0.06}
      ior={1.45}
      iridescence={1}
      iridescenceIOR={1.3}
      clearcoat={1}
      clearcoatRoughness={0.05}
      attenuationColor="#2b5bff"
      attenuationDistance={1.6}
      envMapIntensity={1.6}
    />
  );
}

function Segment({ a, b }: { a: THREE.Vector2; b: THREE.Vector2 }) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b) + T * 0.6;
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  return (
    <RoundedBox args={[len, T, T * 1.6]} radius={0.12} smoothness={4} position={[mid.x, mid.y, 0]} rotation={[0, 0, ang]}>
      <Glass />
    </RoundedBox>
  );
}

function Bowl({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const c = P(cx, cy);
  return (
    <mesh position={[c.x, c.y, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <torusGeometry args={[r * S, T / 2, 32, 64, Math.PI]} />
      <Glass />
    </mesh>
  );
}

function Spin({ children, speed, axis = "y" }: { children: ReactNode; speed: number; axis?: "x" | "y" | "z" }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation[axis] += Math.min(dt, 0.05) * speed;
  });
  return <group ref={g}>{children}</group>;
}

function Scene({ reduce }: { reduce: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const ty = (reduce ? 0 : Math.sin(t * 0.4) * 0.3) + state.pointer.x * 0.45;
    const tx = -state.pointer.y * 0.3;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, ty, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, tx, 3, dt);
  });
  const W = [P(4, 8), P(18, 52), P(32, 18), P(46, 52), P(58, 8)];
  const sp = reduce ? 0 : 1;
  return (
    <group ref={g}>
      <Float speed={1.4 * sp} rotationIntensity={0.2 * sp} floatIntensity={0.5 * sp}>
        <group scale={1.05}>
          {W.slice(0, -1).map((p, i) => {
            const next = W[i + 1];
            return next ? <Segment key={i} a={p} b={next} /> : null;
          })}
          <Segment a={P(58, 6)} b={P(58, 54)} />
          <Segment a={P(58, 8)} b={P(74, 8)} />
          <Segment a={P(58, 30)} b={P(77, 30)} />
          <Segment a={P(58, 52)} b={P(77, 52)} />
          <Bowl cx={74} cy={19} r={11} />
          <Bowl cx={77} cy={41} r={11} />
        </group>
      </Float>
      {/* orbit rings */}
      <group rotation={[1.2, 0.2, 0]}>
        <Spin speed={0.25 * sp} axis="z">
          <mesh><torusGeometry args={[3.1, 0.035, 16, 200]} /><meshStandardMaterial color="#2f6bff" metalness={0.6} roughness={0.2} /></mesh>
          <mesh position={[3.1, 0, 0]}><sphereGeometry args={[0.16, 32, 32]} /><meshStandardMaterial color="#c6ff3d" emissive="#9be22a" emissiveIntensity={0.6} /></mesh>
        </Spin>
      </group>
      <group rotation={[-0.5, 0.9, 0.3]}>
        <Spin speed={-0.18 * sp} axis="z">
          <mesh><torusGeometry args={[3.6, 0.02, 16, 200]} /><meshStandardMaterial color="#8a5cff" metalness={0.5} roughness={0.25} /></mesh>
          <mesh position={[0, 3.6, 0]}><sphereGeometry args={[0.11, 32, 32]} /><meshStandardMaterial color="#38d8ff" emissive="#38d8ff" emissiveIntensity={0.5} /></mesh>
        </Spin>
      </group>
      {/* floating geometry */}
      <Float speed={2 * sp} floatIntensity={1.2 * sp} rotationIntensity={1.5 * sp}>
        <mesh position={[-2.9, 1.7, -0.6]}><icosahedronGeometry args={[0.42, 0]} /><meshPhysicalMaterial color="#8a5cff" roughness={0.15} clearcoat={1} flatShading /></mesh>
      </Float>
      <Float speed={1.6 * sp} floatIntensity={1 * sp} rotationIntensity={1.2 * sp}>
        <mesh position={[2.8, -1.8, 0.4]}><torusKnotGeometry args={[0.32, 0.11, 120, 16]} /><meshPhysicalMaterial color="#38d8ff" roughness={0.1} clearcoat={1} metalness={0.2} /></mesh>
      </Float>
      <Float speed={2.4 * sp} floatIntensity={1.4 * sp}>
        <mesh position={[2.5, 2.1, -1]}><sphereGeometry args={[0.28, 48, 48]} /><meshPhysicalMaterial color="#c6ff3d" roughness={0.2} clearcoat={1} /></mesh>
      </Float>
      <Float speed={1.8 * sp} floatIntensity={1 * sp} rotationIntensity={2 * sp}>
        <mesh position={[-2.6, -1.9, 0.6]}><octahedronGeometry args={[0.36, 0]} /><meshPhysicalMaterial color="#2f6bff" roughness={0.1} clearcoat={1} flatShading /></mesh>
      </Float>
      <Sparkles count={reduce ? 0 : 60} scale={[8, 6, 4]} size={2.5} speed={0.3} color="#5b8cff" opacity={0.7} />
    </group>
  );
}

export default function Emblem3D({ reduce = false, onReady, onError }: { reduce?: boolean; onReady: () => void; onError: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#38d8ff" />
      <pointLight position={[5, -3, -2]} intensity={25} color="#8a5cff" />
      <Scene reduce={reduce} />
      <SceneReadiness onReady={onReady} onError={onError} />
      <ContactShadows position={[0, -3.1, 0]} opacity={0.35} scale={10} blur={3} far={4} color="#2a4bd6" />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 5, -6]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer intensity={3} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#5fd4ff" />
        <Lightformer intensity={2.5} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#a07bff" />
        <Lightformer form="ring" intensity={4} position={[2, 3, 5]} scale={2} color="#ffffff" />
        <Lightformer intensity={1.5} position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} color="#c6ff3d" />
      </Environment>
    </Canvas>
  );
}
