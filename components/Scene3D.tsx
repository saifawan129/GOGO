
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, ContactShadows, Environment, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Mascot = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Organic vertical floating (sum of multiple sines for non-linear feel)
      groupRef.current.position.y = (Math.sin(t * 0.7) * 0.1) + (Math.sin(t * 1.4) * 0.03);
      
      // Gentle side-to-side sway
      groupRef.current.position.x = 2 + (Math.cos(t * 0.5) * 0.05);
      
      // Subtle multi-axis rotation
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.04;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[2, -0.5, 0]} scale={1.2}>
      {/* Body: High-quality white capsule - MAINTAINED WHITE */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
      </mesh>

      {/* Head Spike (GOGO's signature blue tip) */}
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.4, 0.6, 32]} />
        <meshStandardMaterial color="#2563eb" roughness={0.2} />
      </mesh>

      {/* Face Plate Area */}
      <mesh position={[0, 0.6, 0.65]} scale={[1, 0.8, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.05} />
      </mesh>

      {/* Eyes */}
      <group position={[0, 0.65, 0.8]}>
        {/* Left Eye */}
        <mesh position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        
        {/* Right Eye (with signature blue patch) */}
        <group position={[0.2, 0, 0]}>
             <mesh position={[0, 0, -0.01]} scale={[2.5, 2.5, 1]}>
                <circleGeometry args={[0.06, 32]} />
                <meshStandardMaterial color="#bfdbfe" />
             </mesh>
             <mesh>
                <sphereGeometry args={[0.06, 32, 32]} />
                <meshStandardMaterial color="#1e3a8a" />
             </mesh>
        </group>

        {/* Smile */}
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.05, 0.01, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>

      {/* Blue Pants / Lower Part */}
      <mesh position={[0, -0.8, 0]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.2} />
      </mesh>

      {/* Small Arms */}
      <mesh position={[-0.85, 0.1, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.85, 0.1, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const OrbitingObject = ({ radius, speed, offset, size, color }: any) => {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [scaleVec] = useState(() => new THREE.Vector3());

    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime() * speed + offset;
            ref.current.position.x = Math.cos(time) * radius;
            ref.current.position.y = Math.sin(time * 0.5) * (radius * 0.5);
            ref.current.position.z = Math.sin(time) * radius;
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;

            // Smooth scale transition
            const targetScale = hovered ? 1.8 : 1.0;
            scaleVec.set(targetScale, targetScale, targetScale);
            ref.current.scale.lerp(scaleVec, 0.1);

            // Smooth emissive glow transition
            if (ref.current.material) {
                const mat = ref.current.material as THREE.MeshStandardMaterial;
                const targetIntensity = hovered ? 1.5 : 0.4;
                mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetIntensity, 0.1);
            }
        }
    });

    return (
        <mesh 
          ref={ref}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.1} 
              metalness={0.5} 
              emissive={color} 
              emissiveIntensity={0.4} 
            />
        </mesh>
    );
};

const FloatingShapes = () => {
    return (
        <group position={[-2, 0, -2]}>
            <OrbitingObject radius={2} speed={0.4} offset={0} size={0.15} color="#60a5fa" />
            <OrbitingObject radius={3.5} speed={0.3} offset={2} size={0.1} color="#bfdbfe" />
            <OrbitingObject radius={2.5} speed={0.5} offset={4} size={0.12} color="#2563eb" />
        </group>
    );
};

const Scene3D: React.FC = () => {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} color="#bfdbfe" intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

      <Environment preset="city" />

      <Mascot />
      <FloatingShapes />
      
      {/* Background Decor changed to blue */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-4, 2, -5]}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <MeshWobbleMaterial color="#3b82f6" factor={0.5} speed={1} />
        </mesh>
      </Float>

      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
    </Canvas>
  );
};

export default Scene3D;
