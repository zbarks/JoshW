
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const Football = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial 
        color="#000000" 
        wireframe 
        emissive="#EE1D23" 
        emissiveIntensity={0.8} 
      />
    </mesh>
  );
};

const ThreeDFootball: React.FC = () => {
  return (
    <div className="w-full h-[400px] lg:h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Football />
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brandBlack via-transparent to-transparent" />
    </div>
  );
};

export default ThreeDFootball;
