import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// Individual electron component
const Electron = ({ position, speed, radius }: { position: [number, number, number], speed: number, radius: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
      meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05]} />
      <meshStandardMaterial color="#00ffff" emissive="#004444" />
    </mesh>
  );
};

// Educational symbols orbiting the brain
const Symbol = ({ 
  symbol, 
  position, 
  speed, 
  radius, 
  color,
  scrollProgress 
}: { 
  symbol: string, 
  position: [number, number, number], 
  speed: number, 
  radius: number,
  color: string,
  scrollProgress: number 
}) => {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      const time = clock.getElapsedTime() * speed;
      const morphedRadius = radius + scrollProgress * 2;
      textRef.current.position.x = Math.cos(time) * morphedRadius;
      textRef.current.position.z = Math.sin(time) * morphedRadius;
      textRef.current.position.y = position[1] + Math.cos(time * 1.5) * 0.3 + scrollProgress * 3;
      textRef.current.rotation.y = time + scrollProgress * Math.PI;
      textRef.current.scale.setScalar(1 + scrollProgress * 0.5);
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </group>
  );
};

// Brain hemisphere component
const BrainHemisphere = ({ position, scale, scrollProgress }: { position: [number, number, number], scale: [number, number, number], scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      // Morph the brain based on scroll
      const morphFactor = scrollProgress * 2;
      meshRef.current.scale.set(
        scale[0] + morphFactor * 0.3,
        scale[1] + morphFactor * 0.5,
        scale[2] + morphFactor * 0.2
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI]} />
      <meshStandardMaterial 
        color="#9333ea" 
        transparent 
        opacity={0.9 - scrollProgress * 0.3}
        emissive="#4c1d95"
        emissiveIntensity={0.1 + scrollProgress * 0.3}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

// Brain wrinkles/folds component
const BrainFolds = ({ scrollProgress }: { scrollProgress: number }) => {
  const folds = useMemo(() => {
    const foldData = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = Math.cos(angle) * 0.8;
      const z = Math.sin(angle) * 0.8;
      foldData.push({
        position: [x, Math.random() * 0.6 - 0.3, z] as [number, number, number],
        scale: [0.1, 0.8, 0.1] as [number, number, number]
      });
    }
    return foldData;
  }, []);

  return (
    <>
      {folds.map((fold, index) => (
        <mesh key={index} position={fold.position} scale={fold.scale}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial 
            color="#7c3aed" 
            transparent 
            opacity={0.6 + scrollProgress * 0.4}
            emissive="#6366f1"
            emissiveIntensity={0.05 + scrollProgress * 0.2}
          />
        </mesh>
      ))}
    </>
  );
};

// Floating DNA helix that appears on scroll
const DNAHelix = ({ scrollProgress }: { scrollProgress: number }) => {
  const helixRef = useRef<THREE.Group>(null);
  
  // Move useMemo BEFORE the conditional return to fix hook order
  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * 4 - 2;
      const angle1 = (i / 20) * Math.PI * 4;
      const angle2 = angle1 + Math.PI;
      points.push({
        pos1: [Math.cos(angle1) * 0.5, y, Math.sin(angle1) * 0.5] as [number, number, number],
        pos2: [Math.cos(angle2) * 0.5, y, Math.sin(angle2) * 0.5] as [number, number, number]
      });
    }
    return points;
  }, []);
  
  useFrame(({ clock }) => {
    if (helixRef.current && scrollProgress > 0.3) {
      helixRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      helixRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  // Now the conditional return is after all hooks
  if (scrollProgress < 0.3) return null;

  return (
    <group ref={helixRef} position={[3, 0, 0]}>
      {helixPoints.map((point, index) => (
        <group key={index}>
          <mesh position={point.pos1}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff3333" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={point.pos2}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#4ecdc4" emissive="#00aaaa" emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Floating geometric shapes
const FloatingShapes = ({ scrollProgress }: { scrollProgress: number }) => {
  const shapesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (shapesRef.current && scrollProgress > 0.5) {
      shapesRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      shapesRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  if (scrollProgress < 0.5) return null;

  return (
    <group ref={shapesRef} position={[-3, 1, 0]}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#f39c12" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1, 1, 1]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#e74c3c" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-1, -1, -1]}>
        <dodecahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#9b59b6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// Main brain component
const BrainMesh = ({ scrollProgress }: { scrollProgress: number }) => {
  const brainRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (brainRef.current) {
      const baseRotationY = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      const baseRotationX = Math.cos(clock.getElapsedTime() * 0.3) * 0.05;
      
      // Add scroll-based rotation
      brainRef.current.rotation.y = baseRotationY + scrollProgress * Math.PI * 2;
      brainRef.current.rotation.x = baseRotationX + scrollProgress * Math.PI * 0.5;
      brainRef.current.rotation.z = scrollProgress * Math.PI * 0.3;
      
      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5;
      brainRef.current.scale.setScalar(scale);
    }
  });

  // Generate random electrons
  const electrons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [0, (Math.random() - 0.5) * 2, 0] as [number, number, number],
      speed: 0.5 + Math.random() * 1,
      radius: 1.5 + Math.random() * 1
    }));
  }, []);

  // Educational symbols
  const symbols = useMemo(() => [
    { symbol: '∫', position: [0, 0.5, 0] as [number, number, number], speed: 0.3, radius: 2.5, color: '#9333ea' },
    { symbol: '∑', position: [0, -0.5, 0] as [number, number, number], speed: 0.4, radius: 2.2, color: '#7c3aed' },
    { symbol: '√', position: [0, 0, 0] as [number, number, number], speed: 0.35, radius: 2.8, color: '#a855f7' },
    { symbol: '∞', position: [0, 0.8, 0] as [number, number, number], speed: 0.25, radius: 2.0, color: '#8b5cf6' },
    { symbol: 'π', position: [0, -0.8, 0] as [number, number, number], speed: 0.45, radius: 2.3, color: '#c084fc' },
    { symbol: '{', position: [0, 0.3, 0] as [number, number, number], speed: 0.5, radius: 2.6, color: '#d8b4fe' },
    { symbol: '}', position: [0, -0.3, 0] as [number, number, number], speed: 0.5, radius: 2.6, color: '#d8b4fe' },
    { symbol: '<>', position: [0, 0.6, 0] as [number, number, number], speed: 0.4, radius: 2.4, color: '#e9d5ff' }
  ], []);

  return (
    <group ref={brainRef}>
      {/* Left hemisphere */}
      <BrainHemisphere position={[-0.1, 0, 0]} scale={[1, 1.2, 0.9]} scrollProgress={scrollProgress} />
      
      {/* Right hemisphere */}
      <BrainHemisphere position={[0.1, 0, 0]} scale={[1, 1.2, 0.9]} scrollProgress={scrollProgress} />
      
      {/* Brain stem */}
      <mesh position={[0, -1.2, 0]} scale={[0.3, 0.6, 0.3]}>
        <cylinderGeometry args={[0.5, 0.3, 1, 8]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.8 + scrollProgress * 0.2}
          emissive="#4c1d95"
          emissiveIntensity={0.1 + scrollProgress * 0.3}
        />
      </mesh>

      {/* Brain folds/wrinkles */}
      <BrainFolds scrollProgress={scrollProgress} />
      
      {/* Brain surface details - cerebral cortex texture */}
      <mesh scale={[1.02, 1.25, 0.95]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial 
          color="#a855f7" 
          transparent 
          opacity={0.3 + scrollProgress * 0.2}
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.05 + scrollProgress * 0.15}
        />
      </mesh>

      {/* Corpus callosum (connection between hemispheres) */}
      <mesh position={[0, 0, 0]} scale={[0.05, 0.8, 0.6]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial 
          color="#ec4899" 
          transparent 
          opacity={0.7 + scrollProgress * 0.3}
          emissive="#be185d"
          emissiveIntensity={0.2 + scrollProgress * 0.3}
        />
      </mesh>

      {/* Electrons */}
      {electrons.map((electron) => (
        <Electron
          key={electron.id}
          position={electron.position}
          speed={electron.speed + scrollProgress}
          radius={electron.radius + scrollProgress}
        />
      ))}

      {/* Educational symbols */}
      {symbols.map((symbol, index) => (
        <Symbol
          key={index}
          symbol={symbol.symbol}
          position={symbol.position}
          speed={symbol.speed}
          radius={symbol.radius}
          color={symbol.color}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Additional 3D elements that appear on scroll */}
      <DNAHelix scrollProgress={scrollProgress} />
      <FloatingShapes scrollProgress={scrollProgress} />
    </group>
  );
};

// Main 3D Brain component
const Brain3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4 + scrollProgress * 0.3} />
        <pointLight position={[10, 10, 10]} intensity={1 + scrollProgress * 0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5 + scrollProgress * 0.3} color="#9333ea" />
        <pointLight position={[0, 10, -5]} intensity={0.3 + scrollProgress * 0.2} color="#ec4899" />
        
        <BrainMesh scrollProgress={scrollProgress} />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5 + scrollProgress * 2}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
      
      {/* Dynamic glow effect that changes with scroll */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-300"
        style={{
          background: `radial-gradient(circle, rgba(147, 51, 234, ${0.2 + scrollProgress * 0.3}) 0%, transparent 70%)`
        }}
      />
      
      {/* Scroll indicator */}
      {scrollProgress > 0 && (
        <div className="absolute top-4 right-4 text-purple-600 font-semibold">
          Brain Evolution: {Math.round(scrollProgress * 100)}%
        </div>
      )}
    </div>
  );
};

export default Brain3D;
