import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasRun) return;
    setHasRun(true);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 5;

    // Create two black curtain panels
    const curtainWidth = 15;
    const curtainHeight = 15;
    
    const leftGeometry = new THREE.PlaneGeometry(curtainWidth / 2, curtainHeight);
    const rightGeometry = new THREE.PlaneGeometry(curtainWidth / 2, curtainHeight);

    // Simple black material
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      side: THREE.DoubleSide 
    });

    const leftCurtain = new THREE.Mesh(leftGeometry, material);
    const rightCurtain = new THREE.Mesh(rightGeometry, material.clone());

    // Position curtains to cover screen
    leftCurtain.position.x = -curtainWidth / 4;
    rightCurtain.position.x = curtainWidth / 4;

    scene.add(leftCurtain);
    scene.add(rightCurtain);

    // Animation
    let startTime: number | null = null;
    const delay = 300; // 0.3s delay
    const duration = 1200; // 1.2s animation
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;

      if (elapsed > delay) {
        const progress = Math.min((elapsed - delay) / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        // Slide curtains apart
        const slideAmount = curtainWidth / 2 + 3;
        leftCurtain.position.x = -curtainWidth / 4 - (slideAmount * eased);
        rightCurtain.position.x = curtainWidth / 4 + (slideAmount * eased);

        if (progress >= 1) {
          setTimeout(() => {
            onComplete();
          }, 100);
          renderer.render(scene, camera);
          return;
        }
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      leftGeometry.dispose();
      rightGeometry.dispose();
      material.dispose();
    };
  }, [onComplete, hasRun]);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: '#000',
        pointerEvents: 'none'
      }}
    />
  );
};

export default CurtainReveal;