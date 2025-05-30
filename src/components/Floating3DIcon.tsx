
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const FloatingIcon = ({ 
  icon, 
  position, 
  color, 
  speed = 1,
  scale = 1 
}: { 
  icon: string;
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = Math.sin(time * 0.7) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <Text
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {icon}
      </Text>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const Floating3DIcon = ({ 
  icon, 
  className = "w-24 h-24",
  color = "#9333ea" 
}: { 
  icon: string;
  className?: string;
  color?: string;
}) => {
  return (
    <div className={`${className} relative`}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color={color} />
        <FloatingIcon 
          icon={icon}
          position={[0, 0, 0]}
          color={color}
          speed={0.8}
        />
      </Canvas>
    </div>
  );
};

export default Floating3DIcon;
