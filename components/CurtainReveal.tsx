import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 5;

    // Create curtain geometry - two halves
    const curtainWidth = 10;
    const curtainHeight = 12;
    
    const leftCurtainGeometry = new THREE.PlaneGeometry(curtainWidth / 2, curtainHeight, 32, 32);
    const rightCurtainGeometry = new THREE.PlaneGeometry(curtainWidth / 2, curtainHeight, 32, 32);

    // Shader material for smooth, elegant curtain
    const curtainMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        slideProgress: { value: 0 },
        isLeft: { value: 1.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float slideProgress;
        varying vec2 vUv;
        varying float vDisplacement;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Subtle wave effect during slide
          float wave = sin(uv.y * 3.14159 + time * 2.0) * 0.1 * slideProgress;
          pos.z += wave * (1.0 - slideProgress);
          
          vDisplacement = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float slideProgress;
        varying vec2 vUv;
        varying float vDisplacement;
        
        void main() {
          // Rich black with subtle gradient
          vec3 color = vec3(0.0);
          
          // Add subtle edge highlight
          float edge = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          color += vec3(0.02) * edge * (1.0 - slideProgress);
          
          // Fade out as it slides
          float alpha = 1.0 - slideProgress * 0.3;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true
    });

    const leftMaterial = curtainMaterial.clone();
    const rightMaterial = curtainMaterial.clone();
    rightMaterial.uniforms.isLeft.value = 0.0;

    const leftCurtain = new THREE.Mesh(leftCurtainGeometry, leftMaterial);
    const rightCurtain = new THREE.Mesh(rightCurtainGeometry, rightMaterial);

    // Position curtains
    leftCurtain.position.x = -curtainWidth / 4;
    rightCurtain.position.x = curtainWidth / 4;

    scene.add(leftCurtain);
    scene.add(rightCurtain);

    // Animation variables
    let animationProgress = 0;
    const animationDelay = 0.5;
    const animationDuration = 1.8;
    let startTime: number | null = null;

    // Animation loop
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;

      // Wait for delay, then animate
      if (elapsed > animationDelay) {
        const progress = Math.min((elapsed - animationDelay) / animationDuration, 1);
        
        // Smooth easing function (ease-in-out cubic)
        const eased = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        animationProgress = eased;

        // Slide curtains apart
        const slideDistance = curtainWidth / 2 + 2;
        leftCurtain.position.x = -curtainWidth / 4 - (slideDistance * eased);
        rightCurtain.position.x = curtainWidth / 4 + (slideDistance * eased);

        // Update shader uniforms
        leftMaterial.uniforms.slideProgress.value = eased;
        rightMaterial.uniforms.slideProgress.value = eased;
        leftMaterial.uniforms.time.value = elapsed;
        rightMaterial.uniforms.time.value = elapsed;

        // Fade out completely at the end
        leftCurtain.material.opacity = 1 - (eased * 0.3);
        rightCurtain.material.opacity = 1 - (eased * 0.3);

        // Call onComplete when animation is done
        if (progress >= 1 && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 300);
        }
      }

      renderer.render(scene, camera);
      
      if (animationProgress < 1 || elapsed < animationDelay + animationDuration + 0.3) {
        requestAnimationFrame(animate);
      }
    };

    animate(0);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      leftCurtainGeometry.dispose();
      rightCurtainGeometry.dispose();
      leftMaterial.dispose();
      rightMaterial.dispose();
    };
  }, [onComplete]);

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
        background: '#000',
        pointerEvents: 'none'
      }}
    />
  );
};

export default CurtainReveal;