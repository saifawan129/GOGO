
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MiniGOGO = ({ position, scale = 0.4, color = "#ffffff", speed = 1 }: any) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.y = position[1] + Math.sin(t) * 0.2;
      ref.current.position.x = position[0] + Math.cos(t * 0.5) * 0.1;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.52, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 0.4, 0.45]} scale={[0.8, 0.6, 0.1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <group position={[0, 0.45, 0.55]}>
        <mesh position={[-0.1, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>
    </group>
  );
};

const Scene = () => {
  const { viewport, mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth parallax based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          fontSize={1.2}
          color="#1e3a8a"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.8, -1]}
          maxWidth={10}
        >
          CURIOSITY
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          fontSize={0.8}
          color="#3b82f6"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
          position={[-2, -0.5, 0.5]}
        >
          BEYOND
        </Text>
      </Float>

      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.2}>
        <Text
          fontSize={0.6}
          color="#60a5fa"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
          position={[2.5, -1.2, -0.5]}
        >
          EXPLORE
        </Text>
      </Float>

      {/* Ghost Characters drifting in front and behind */}
      <MiniGOGO position={[-3, 1, -2]} scale={0.3} color="#dbeafe" speed={0.8} />
      <MiniGOGO position={[1.5, 1.5, 1]} scale={0.4} color="#ffffff" speed={1.2} />
      <MiniGOGO position={[-2, -1.5, -0.5]} scale={0.35} color="#eff6ff" speed={0.9} />
      <MiniGOGO position={[3, 0.5, 0.8]} scale={0.45} color="#ffffff" speed={1.1} />

      <ContactShadows position={[0, -2.5, 0]} opacity={0.25} scale={10} blur={2.5} far={4} />
    </group>
  );
};

const Typography3DSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] w-full bg-gradient-to-b from-sky-50 to-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#bfdbfe" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          {/* Environment preset corrected to 'city' which is a valid preset name */}
          <Environment preset="city" />
          {/* Use Suspense from react to handle loading of 3D Text resources */}
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 pointer-events-none text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-blue-500 font-extrabold tracking-[0.3em] text-[10px] uppercase mb-4 block">Immersive Space</span>
          <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-4 tracking-tight">
            Depth in Every Dimension
          </h2>
          <p className="text-blue-900/40 text-sm font-medium leading-relaxed">
            Experience GOGO's world where ideas take shape and curiosity flows freely across the digital horizon.
          </p>
        </div>
      </div>

      {/* Subtle UI labels floating in space using CSS to mimic 3D depth markers */}
      <div className="absolute top-1/4 left-10 opacity-20 hidden md:block">
        <div className="flex items-center gap-2">
          <div className="w-12 h-[1px] bg-blue-300"></div>
          <span className="text-[10px] font-bold text-blue-400 tracking-tighter">Z-AXIS: 0.45</span>
        </div>
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-20 hidden md:block">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-blue-400 tracking-tighter">RENDER: CINEMATIC</span>
          <div className="w-12 h-[1px] bg-blue-300"></div>
        </div>
      </div>
    </section>
  );
};

export default Typography3DSection;
