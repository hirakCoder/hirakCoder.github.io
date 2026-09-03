"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import type { MotionValue } from "motion/react";
import type { Mesh } from "three";

function Prism({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = scrollProgress.get();
    const cam = state.camera;

    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.14;
    ref.current.rotation.z += delta * 0.04;

    const targetZ = 5.6 - t * 2.4;
    const targetX = state.pointer.x * 0.5;
    const targetY = -state.pointer.y * 0.4;
    cam.position.x += (targetX - cam.position.x) * Math.min(delta * 3, 1);
    cam.position.y += (targetY - cam.position.y) * Math.min(delta * 3, 1);
    cam.position.z += (targetZ - cam.position.z) * Math.min(delta * 2, 1);
    cam.lookAt(0, 0, 0);

    const s = 1 + t * 0.6;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.9, 1]} />
      <MeshTransmissionMaterial
        backside
        thickness={1.4}
        roughness={0.06}
        chromaticAberration={0.32}
        anisotropy={0.6}
        ior={1.5}
        distortion={0.55}
        distortionScale={0.45}
        temporalDistortion={0.15}
        samples={6}
        resolution={512}
        color="#b6bdfc"
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={1.4} color="#6366f1" />
      <pointLight position={[4, 2, -2]} intensity={1.0} color="#0071e3" />
      <pointLight position={[0, 5, 3]} intensity={0.8} color="#a5b4fc" />
    </>
  );
}

export function PrismBackground({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Lights />
      <Prism scrollProgress={scrollProgress} />
      <Environment preset="city" />
    </Canvas>
  );
}
