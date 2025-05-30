
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingEmoji = ({ 
  emoji, 
  position, 
  speed 
}: { 
  emoji: string;
  position: [number, number, number];
  speed: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.5;
      meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Text
        fontSize={0.8}
        anchorX="center"
        anchorY="middle"
      >
        {emoji}
      </Text>
    </group>
  );
};

const HolographicShape = ({ 
  type, 
  position, 
  color 
}: { 
  type: 'box' | 'sphere' | 'torus';
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.2;
    }
  });

  const renderShape = () => {
    switch (type) {
      case 'box':
        return <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position} />;
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.3]} position={position} />;
      case 'torus':
        return <Torus ref={meshRef} args={[0.3, 0.1, 16, 32]} position={position} />;
      default:
        return null;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
      {type === 'sphere' && <sphereGeometry args={[0.3]} />}
      {type === 'torus' && <torusGeometry args={[0.3, 0.1, 16, 32]} />}
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  );
};

const GenZ3DElements = ({ scrollProgress }: { scrollProgress: number }) => {
  const emojis = ['🔥', '💎', '✨', '🚀', '⚡', '🌟', '💫', '🎯'];
  const shapes = [
    { type: 'box' as const, position: [-2, 0, 0] as [number, number, number], color: '#ff6b6b' },
    { type: 'sphere' as const, position: [0, 1, -1] as [number, number, number], color: '#4ecdc4' },
    { type: 'torus' as const, position: [2, -0.5, 0.5] as [number, number, number], color: '#ffe66d' },
  ];

  if (scrollProgress < 0.4) return null;

  return (
    <div className="w-full h-64 relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b6b" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#4ecdc4" />
        
        {/* Floating emojis */}
        {emojis.map((emoji, index) => (
          <FloatingEmoji
            key={index}
            emoji={emoji}
            position={[
              (Math.cos(index / emojis.length * Math.PI * 2) * 3),
              (Math.sin(index / emojis.length * Math.PI * 2) * 2),
              (Math.random() - 0.5) * 2
            ]}
            speed={0.5 + Math.random() * 0.5}
          />
        ))}
        
        {/* Holographic shapes */}
        {shapes.map((shape, index) => (
          <HolographicShape
            key={index}
            type={shape.type}
            position={shape.position}
            color={shape.color}
          />
        ))}
      </Canvas>
      
      {/* Gradient overlay for that Gen Z vibe */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none" />
    </div>
  );
};

export default GenZ3DElements;
