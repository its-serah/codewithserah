
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Octahedron, Tetrahedron } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveShape = ({ 
  type, 
  position, 
  color,
  onClick 
}: { 
  type: 'sphere' | 'box' | 'torus' | 'octahedron' | 'tetrahedron';
  position: [number, number, number];
  color: string;
  onClick?: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    }
  });

  const commonProps = {
    ref: meshRef,
    position: position,
    onClick: onClick
  };

  const materialProps = {
    color: color,
    transparent: true,
    opacity: 0.8,
    emissive: color,
    emissiveIntensity: 0.2,
    roughness: 0.3,
    metalness: 0.7
  };

  switch (type) {
    case 'box':
      return (
        <Box {...commonProps} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial {...materialProps} />
        </Box>
      );
    case 'sphere':
      return (
        <Sphere {...commonProps} args={[0.3]}>
          <meshStandardMaterial {...materialProps} />
        </Sphere>
      );
    case 'torus':
      return (
        <Torus {...commonProps} args={[0.3, 0.1, 16, 32]}>
          <meshStandardMaterial {...materialProps} />
        </Torus>
      );
    case 'octahedron':
      return (
        <Octahedron {...commonProps} args={[0.4]}>
          <meshStandardMaterial {...materialProps} />
        </Octahedron>
      );
    case 'tetrahedron':
      return (
        <Tetrahedron {...commonProps} args={[0.4]}>
          <meshStandardMaterial {...materialProps} />
        </Tetrahedron>
      );
    default:
      return null;
  }
};

const Interactive3DShapes = ({ className = "w-full h-64" }: { className?: string }) => {
  const shapes = useMemo(() => [
    { type: 'box' as const, position: [-2, 0, 0] as [number, number, number], color: '#ff6b6b' },
    { type: 'sphere' as const, position: [0, 1, -1] as [number, number, number], color: '#4ecdc4' },
    { type: 'torus' as const, position: [2, -0.5, 0.5] as [number, number, number], color: '#ffe66d' },
    { type: 'octahedron' as const, position: [-1, -1, 1] as [number, number, number], color: '#ff9ff3' },
    { type: 'tetrahedron' as const, position: [1, 1.5, -0.5] as [number, number, number], color: '#54a0ff' },
  ], []);

  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b6b" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#4ecdc4" />
        <pointLight position={[0, 5, -5]} intensity={0.6} color="#ffe66d" />
        
        {shapes.map((shape, index) => (
          <InteractiveShape
            key={index}
            type={shape.type}
            position={shape.position}
            color={shape.color}
            onClick={() => console.log(`Clicked ${shape.type}!`)}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Interactive3DShapes;
