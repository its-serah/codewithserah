
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const FloatingEmoji = ({ 
  emoji, 
  position, 
  speed,
  amplitude = 0.5 
}: { 
  emoji: string;
  position: [number, number, number];
  speed: number;
  amplitude?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      meshRef.current.position.y = position[1] + Math.sin(time) * amplitude;
      meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Text
        fontSize={1.2}
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
      >
        {emoji}
      </Text>
    </group>
  );
};

const FloatingEmojis3D = ({ 
  className = "absolute inset-0 pointer-events-none",
  density = 'normal'
}: { 
  className?: string;
  density?: 'low' | 'normal' | 'high';
}) => {
  const emojis = useMemo(() => {
    const emojiSet = ['🚀', '💎', '⚡', '🔥', '✨', '🌟', '💫', '🎯', '🎮', '🤖', '🌈', '💜', '🦄', '👾'];
    const count = density === 'low' ? 6 : density === 'high' ? 15 : 10;
    
    return Array.from({ length: count }, (_, i) => ({
      emoji: emojiSet[i % emojiSet.length],
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.7,
      amplitude: 0.3 + Math.random() * 0.4
    }));
  }, [density]);

  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 0, 6] }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.8} />
        
        {emojis.map((item, index) => (
          <FloatingEmoji
            key={index}
            emoji={item.emoji}
            position={item.position}
            speed={item.speed}
            amplitude={item.amplitude}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingEmojis3D;
