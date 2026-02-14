import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function FootballEntranceAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(0, 10, 10);
    scene.add(spotLight);

    const redLight = new THREE.PointLight(0xEE1D23, 2, 50);
    redLight.position.set(-5, 5, 5);
    scene.add(redLight);

    // Create football
    const ballGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.7
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-8, 3, 5);
    scene.add(ball);

    // Create pentagon pattern on ball
    const pentagonGeometry = new THREE.CircleGeometry(0.15, 5);
    const pentagonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    for (let i = 0; i < 12; i++) {
      const pentagon = new THREE.Mesh(pentagonGeometry, pentagonMaterial);
      const phi = Math.acos(-1 + (2 * i) / 12);
      const theta = Math.sqrt(12 * Math.PI) * phi;
      
      pentagon.position.setFromSphericalCoords(0.61, phi, theta);
      pentagon.lookAt(0, 0, 0);
      ball.add(pentagon);
    }

    // Create goal net
    const createNet = () => {
      const netGroup = new THREE.Group();
      const netMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        opacity: 0.4, 
        transparent: true 
      });

      // Vertical lines
      for (let i = -3; i <= 3; i += 0.4) {
        const points = [];
        for (let j = 0; j <= 4; j += 0.4) {
          points.push(new THREE.Vector3(i, j, -2));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, netMaterial);
        netGroup.add(line);
      }

      // Horizontal lines
      for (let j = 0; j <= 4; j += 0.4) {
        const points = [];
        for (let i = -3; i <= 3; i += 0.4) {
          points.push(new THREE.Vector3(i, j, -2));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, netMaterial);
        netGroup.add(line);
      }

      netGroup.position.set(0, 0, -5);
      return netGroup;
    };

    const net = createNet();
    scene.add(net);

    // Goal posts
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 4, 16),
      postMaterial
    );
    leftPost.position.set(-3, 2, -5);
    scene.add(leftPost);

    const rightPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 4, 16),
      postMaterial
    );
    rightPost.position.set(3, 2, -5);
    scene.add(rightPost);

    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 6, 16),
      postMaterial
    );
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(0, 4, -5);
    scene.add(crossbar);

    // Animation variables
    let animationProgress = 0;
    const animationDuration = 2.5;
    let netBulgeProgress = 0;
    let hasHitNet = false;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      animationProgress += 0.016;
      const t = Math.min(animationProgress / animationDuration, 1);

      if (t < 0.8) {
        // Ball flying toward goal with curve
        const curveX = -8 + (8 * easeInOutCubic(t / 0.8));
        const curveY = 3 - (1 * Math.sin(t * Math.PI * 1.2));
        const curveZ = 5 - (10 * easeInOutCubic(t / 0.8));

        ball.position.set(curveX, curveY, curveZ);
        
        // Spin the ball
        ball.rotation.x += 0.3;
        ball.rotation.y += 0.15;

        // Camera follows ball slightly
        camera.position.x = curveX * 0.1;
      } else if (t >= 0.8 && !hasHitNet) {
        // Ball hits the net
        hasHitNet = true;
        ball.position.set(0, 2, -4.5);
        
        setTimeout(() => setShowText(true), 300);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }

      // Net bulge effect
      if (hasHitNet && netBulgeProgress < 1) {
        netBulgeProgress += 0.05;
        const bulge = Math.sin(netBulgeProgress * Math.PI) * 0.5;
        net.position.z = -5 + bulge;
        ball.position.z = -4.5 + bulge;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Easing function
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Handle resize
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
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-brandBlack">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Text reveal */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center">
          <h1 className="font-heading font-black text-8xl md:text-9xl lg:text-[12rem] leading-[0.85] uppercase tracking-normal text-white animate-reveal-up">
            FOOT<br />
            <span className="text-brandRed">FORWARD</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

// Easing function helper
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}