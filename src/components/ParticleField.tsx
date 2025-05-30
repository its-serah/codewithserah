
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);
  
  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      
      // Create rainbow-like colors
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    // Store initial positions
    initialPositions.current = new Float32Array(positions);
    
    return { positions, colors };
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current && initialPositions.current) {
      const time = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = time + scrollProgress * Math.PI;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.z = scrollProgress * Math.PI * 0.5;
      
      // Animate particle positions without resizing buffer
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = initialPositions.current[i] + Math.cos(time + i * 0.1) * 0.1;
        positions[i + 1] = initialPositions.current[i + 1] + Math.sin(time + i) * 0.1;
        positions[i + 2] = initialPositions.current[i + 2];
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7 + scrollProgress * 0.3}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleField = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Particles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
