import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Football = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.x += delta * 0.1;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 2]} />
      <meshBasicMaterial color="#EE1D23" wireframe transparent opacity={0.55} />
    </mesh>
  );
};

// Decorative wireframe ball that sits behind the hero wordmark.
const ThreeDFootball: React.FC = () => (
  <div className="h-full w-full" aria-hidden>
    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Football />
    </Canvas>
  </div>
);

export default ThreeDFootball;
