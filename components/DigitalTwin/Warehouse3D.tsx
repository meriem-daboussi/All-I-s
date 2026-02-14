
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Grid, Text, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Add comprehensive type augmentation for React Three Fiber intrinsic elements.
// This ensures that Three.js elements like <group>, <mesh>, etc., are recognized in the JSX namespace,
// covering both standard global JSX and React 18+ scoped JSX namespaces.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const Rack: React.FC<{ position: [number, number, number]; occupied: boolean[] }> = ({ position, occupied }) => {
  return (
    <group position={position}>
      {/* Structural Racks */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Vertical Supports */}
      <mesh position={[-2, 2.5, 1]}><boxGeometry args={[0.1, 5, 0.1]} /><meshStandardMaterial color="#444" /></mesh>
      <mesh position={[2, 2.5, 1]}><boxGeometry args={[0.1, 5, 0.1]} /><meshStandardMaterial color="#444" /></mesh>
      <mesh position={[-2, 2.5, -1]}><boxGeometry args={[0.1, 5, 0.1]} /><meshStandardMaterial color="#444" /></mesh>
      <mesh position={[2, 2.5, -1]}><boxGeometry args={[0.1, 5, 0.1]} /><meshStandardMaterial color="#444" /></mesh>

      {/* Boxes */}
      {occupied.map((isOccupied, idx) => {
        if (!isOccupied) return null;
        const xOffset = (idx % 2 === 0 ? -1 : 1);
        const yOffset = idx < 2 ? 1 : 3;
        return (
          <Box key={idx} position={[xOffset, yOffset, 0]} color="#2E7D32" />
        );
      })}
    </group>
  );
};

const Box: React.FC<{ position: [number, number, number]; color: string; ghost?: boolean }> = ({ position, color, ghost }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (ghost && mesh.current) {
      // @ts-ignore - Accessing material properties on potentially polymorphic mesh
      mesh.current.material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1.5, 1.2, 1.5]} />
      <meshStandardMaterial 
        color={hovered ? '#FFB300' : color} 
        transparent={ghost} 
        opacity={ghost ? 0.3 : 1}
      />
      {hovered && (
        <group position={[0, 1.5, 0]}>
            <Text
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              ID: WH-992-BX\nStatus: Placed
            </Text>
        </group>
      )}
    </mesh>
  );
};

const Warehouse3D: React.FC = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
      <OrbitControls makeDefault minDistance={5} maxDistance={50} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Environment preset="city" />

      <Grid
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#222"
      />

      <group position={[0, 0, 0]}>
        {/* Dock Area */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <Text position={[-10, 0.1, 5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.8} color="#444">
          LOADING DOCK
        </Text>
        
        {/* Ghost Box at Dock (AI Detects) */}
        <Box position={[-10, 0.6, 0]} color="#FFB300" ghost />

        {/* Warehouse Racks */}
        {[-4, 4, 12].map((z) => (
          <React.Fragment key={z}>
            <Rack position={[0, 0, z]} occupied={[true, false, true, true]} />
            <Rack position={[6, 0, z]} occupied={[true, true, false, true]} />
          </React.Fragment>
        ))}
      </group>
    </Canvas>
  );
};

export default Warehouse3D;
