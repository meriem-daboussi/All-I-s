
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, Text } from '@react-three/drei';
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

const PipeSegment: React.FC<{ 
    start: [number, number, number]; 
    end: [number, number, number]; 
    radius: number; 
    isLeaking?: boolean;
    metadata: { pressure: string; flow: string }
}> = ({ start, end, radius, isLeaking, metadata }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

  useFrame((state) => {
    if (isLeaking && meshRef.current) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const pulse = Math.sin(state.clock.getElapsedTime() * 6) * 0.5 + 0.5;
        material.emissive.setRGB(pulse, 0, 0);
        material.emissiveIntensity = pulse * 2;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={center}
        quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <cylinderGeometry args={[radius, radius, length, 32]} />
        <meshStandardMaterial 
            color={isLeaking ? '#D32F2F' : (hovered ? '#FFB300' : '#2E7D32')} 
            roughness={0.2}
            metalness={0.8}
            emissive={isLeaking ? new THREE.Color('#D32F2F') : new THREE.Color('#000000')}
        />
      </mesh>
      {hovered && (
          <group position={[center.x, center.y + 2, center.z]}>
              <Text fontSize={0.3} color="white" anchorX="center">
                {`SEC-12: OK\nPRESS: ${metadata.pressure}\nFLOW: ${metadata.flow}`}
              </Text>
          </group>
      )}
    </group>
  );
};

const Pipe3D: React.FC = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[20, 20, 20]} />
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group>
        {/* Pipe Grid Layout */}
        <PipeSegment 
            start={[0, 0, 0]} 
            end={[10, 0, 0]} 
            radius={0.4} 
            metadata={{ pressure: '142 PSI', flow: '12.5 L/s' }}
        />
        <PipeSegment 
            start={[10, 0, 0]} 
            end={[10, 10, 0]} 
            radius={0.4} 
            metadata={{ pressure: '141 PSI', flow: '12.4 L/s' }}
        />
        <PipeSegment 
            start={[10, 10, 0]} 
            end={[10, 10, 10]} 
            radius={0.4} 
            isLeaking={true}
            metadata={{ pressure: '112 PSI', flow: '9.8 L/s' }}
        />
        <PipeSegment 
            start={[10, 10, 10]} 
            end={[0, 10, 10]} 
            radius={0.4} 
            metadata={{ pressure: '110 PSI', flow: '9.8 L/s' }}
        />
        <PipeSegment 
            start={[0, 10, 10]} 
            end={[0, 0, 10]} 
            radius={0.4} 
            metadata={{ pressure: '109 PSI', flow: '9.7 L/s' }}
        />
        <PipeSegment 
            start={[0, 0, 10]} 
            end={[0, 0, 0]} 
            radius={0.4} 
            metadata={{ pressure: '142 PSI', flow: '12.5 L/s' }}
        />

        {/* Floor Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.5, 5]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      </group>
    </Canvas>
  );
};

export default Pipe3D;
