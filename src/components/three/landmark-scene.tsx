"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import React, { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type Variant =
  | "bigben" | "liberty" | "cntower" | "opera"
  | "cliffs" | "skytower" | "eiffel" | "burj";

function Landmark({ variant }: { variant: Variant }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.15; });

  const props: Record<Variant, { build: React.ReactElement; color: string }> = useMemo(() => ({
    bigben: {
      color: "#9BD936",
      build: (
        <group>
          <mesh position={[0, -0.4, 0]}><boxGeometry args={[0.55, 0.8, 0.55]} /><meshStandardMaterial color="#152547" /></mesh>
          <mesh position={[0, 0.3, 0]}><boxGeometry args={[0.45, 1.2, 0.45]} /><meshStandardMaterial color="#1D3157" /></mesh>
          <mesh position={[0, 1.0, 0.23]}><circleGeometry args={[0.12, 24]} /><meshStandardMaterial color="#BDF24B" emissive="#9BD936" emissiveIntensity={0.4} /></mesh>
          <mesh position={[0, 1.45, 0]}><coneGeometry args={[0.3, 0.5, 4]} /><meshStandardMaterial color="#152547" /></mesh>
          <mesh position={[0, 1.8, 0]}><coneGeometry args={[0.05, 0.25, 12]} /><meshStandardMaterial color="#BDF24B" /></mesh>
        </group>
      ),
    },
    liberty: {
      color: "#7ab197",
      build: (
        <group>
          <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.45, 0.55, 0.4, 8]} /><meshStandardMaterial color="#1D3157" /></mesh>
          <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.2, 0.28, 1.4, 16]} /><meshStandardMaterial color="#7ab197" /></mesh>
          <mesh position={[0, 1.15, 0]}><sphereGeometry args={[0.18, 16, 16]} /><meshStandardMaterial color="#7ab197" /></mesh>
          <mesh position={[0.05, 1.5, 0]} rotation={[0, 0, -0.3]}><cylinderGeometry args={[0.03, 0.03, 0.8, 8]} /><meshStandardMaterial color="#7ab197" /></mesh>
          <mesh position={[0.3, 1.85, 0]}><coneGeometry args={[0.12, 0.25, 6]} /><meshStandardMaterial color="#BDF24B" emissive="#9BD936" emissiveIntensity={0.5} /></mesh>
        </group>
      ),
    },
    cntower: {
      color: "#cfd6dc",
      build: (
        <group>
          <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.06, 0.12, 2.2, 12]} /><meshStandardMaterial color="#cfd6dc" /></mesh>
          <mesh position={[0, 0.6, 0]}><sphereGeometry args={[0.22, 16, 16]} /><meshStandardMaterial color="#BDF24B" emissive="#9BD936" emissiveIntensity={0.3} /></mesh>
          <mesh position={[0, 1.4, 0]}><cylinderGeometry args={[0.04, 0.04, 0.6, 8]} /><meshStandardMaterial color="#cfd6dc" /></mesh>
        </group>
      ),
    },
    opera: {
      color: "#f5efe6",
      build: (
        <group>
          <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, 0.6]}><coneGeometry args={[0.5, 0.9, 32, 1, true]} /><meshStandardMaterial color="#f5efe6" side={THREE.DoubleSide} /></mesh>
          <mesh position={[0, 0, 0.1]} rotation={[0, 0, 0.4]}><coneGeometry args={[0.55, 1.0, 32, 1, true]} /><meshStandardMaterial color="#f5efe6" side={THREE.DoubleSide} /></mesh>
          <mesh position={[0.35, 0.2, 0.2]} rotation={[0, 0, 0.2]}><coneGeometry args={[0.5, 0.9, 32, 1, true]} /><meshStandardMaterial color="#f5efe6" side={THREE.DoubleSide} /></mesh>
          <mesh position={[0, -0.7, 0]}><boxGeometry args={[1.6, 0.1, 0.6]} /><meshStandardMaterial color="#1D3157" /></mesh>
        </group>
      ),
    },
    cliffs: {
      color: "#7d8a72",
      build: (
        <group>
          <mesh position={[-0.6, -0.5, 0]}><boxGeometry args={[0.6, 1, 0.5]} /><meshStandardMaterial color="#5a6e54" /></mesh>
          <mesh position={[0, -0.3, 0]}><boxGeometry args={[0.7, 1.4, 0.5]} /><meshStandardMaterial color="#6e8062" /></mesh>
          <mesh position={[0.6, -0.6, 0]}><boxGeometry args={[0.5, 0.9, 0.5]} /><meshStandardMaterial color="#5a6e54" /></mesh>
          <mesh position={[0, -1.3, 0]}><boxGeometry args={[2.2, 0.2, 0.7]} /><meshStandardMaterial color="#2FA3D6" /></mesh>
        </group>
      ),
    },
    skytower: {
      color: "#e0e6ec",
      build: (
        <group>
          <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.05, 0.1, 2.4, 12]} /><meshStandardMaterial color="#e0e6ec" /></mesh>
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.25, 0.25, 0.2, 24]} /><meshStandardMaterial color="#BDF24B" emissive="#9BD936" emissiveIntensity={0.3} /></mesh>
        </group>
      ),
    },
    eiffel: {
      color: "#8c7b5a",
      build: (
        <group>
          <mesh position={[0, -0.4, 0]}><coneGeometry args={[0.45, 1.0, 4]} /><meshStandardMaterial color="#8c7b5a" wireframe /></mesh>
          <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.18, 1.0, 4]} /><meshStandardMaterial color="#a08e6b" wireframe /></mesh>
          <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.02, 0.02, 0.4, 8]} /><meshStandardMaterial color="#BDF24B" /></mesh>
        </group>
      ),
    },
    burj: {
      color: "#dfe6ec",
      build: (
        <group>
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.32, 2.4, 8]} /><meshStandardMaterial color="#dfe6ec" /></mesh>
          <mesh position={[0, 1.45, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 8]} /><meshStandardMaterial color="#BDF24B" /></mesh>
        </group>
      ),
    },
  }), []);

  return <group ref={group}>{props[variant].build}</group>;
}

export default function LandmarkScene({ variant }: { variant: Variant }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [2.8, 1.6, 2.8], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#BDF24B" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#2FA3D6" />
      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
          <Landmark variant={variant} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
