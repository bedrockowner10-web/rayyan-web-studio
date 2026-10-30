import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const S = 1 / 20;
const P = (x: number, y: number) => new THREE.Vector2((x - 45) * S, (30 - y) * S);
const T = 0.27; // stroke thickness

function Segment({ a, b }: { a: THREE.Vector2; b: THREE.Vector2 }) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b) + T * 0.6;
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  return (
    <RoundedBox args={[len, T, T * 1.4]} radius={0.06} smoothness={4} position={[mid.x, mid.y, 0]} rotation={[0, 0, ang]}>
      <meshStandardMaterial color="#d9bf86" metalness={1} roughness={0.22} envMapIntensity={1.4} />
    </RoundedBox>
  );
}

function Bowl({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const c = P(cx, cy);
  return (
    <mesh position={[c.x, c.y, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <torusGeometry args={[r * S, T / 2, 32, 64, Math.PI]} />
      <meshStandardMaterial color="#d9bf86" metalness={1} roughness={0.22} envMapIntensity={1.4} />
    </mesh>
  );
}

function Mark({ reduce }: { reduce: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const targetY = (reduce ? 0 : Math.sin(t * 0.35) * 0.35) + state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.25;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, targetY, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, targetX, 3, dt);
  });
  const W = [P(4, 8), P(18, 52), P(32, 18), P(46, 52), P(58, 8)];
  return (
    <group ref={g} scale={1.05}>
      {W.slice(0, -1).map((p, i) => (
        <Segment key={i} a={p} b={W[i + 1]} />
      ))}
      <Segment a={P(58, 6)} b={P(58, 54)} />
      <Segment a={P(58, 8)} b={P(74, 8)} />
      <Segment a={P(58, 30)} b={P(77, 30)} />
      <Segment a={P(58, 52)} b={P(77, 52)} />
      <Bowl cx={74} cy={19} r={11} />
      <Bowl cx={77} cy={41} r={11} />
      {/* halo ring */}
      <mesh position={[0, 0, -0.5]}>
        <torusGeometry args={[2.95, 0.025, 16, 160]} />
        <meshStandardMaterial color="#cdb27a" metalness={1} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function Emblem3D({ reduce = false }: { reduce?: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7.2], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.2} />
      <spotLight position={[4, 6, 6]} angle={0.4} penumbra={1} intensity={60} color="#fff3dc" />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#c9a46a" />
      <Float speed={reduce ? 0 : 1.4} rotationIntensity={reduce ? 0 : 0.25} floatIntensity={reduce ? 0 : 0.6}>
        <Mark reduce={reduce} />
      </Float>
      <ContactShadows position={[0, -2.6, 0]} opacity={0.5} scale={9} blur={2.6} far={4} color="#000" />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, -6]} scale={[12, 2, 1]} color="#fff6e6" />
        <Lightformer intensity={2} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#e9d2a5" />
        <Lightformer intensity={1.5} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={4} position={[2, 3, 5]} scale={2} color="#fff" />
      </Environment>
    </Canvas>
  );
}
