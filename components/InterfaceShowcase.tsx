
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GlassCard = ({ position, scale = [1, 1, 0.1], color = "#ffffff", label = "DATA", opacity = 0.5 }: any) => {
  return (
    <group position={position}>
      <mesh scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color={color} 
          thickness={0.5} 
          roughness={0.1} 
          transmission={0.8} 
          ior={1.5} 
          opacity={opacity} 
          transparent 
        />
      </mesh>
      <Text
        position={[0, 0, scale[2] / 2 + 0.05]}
        fontSize={0.1}
        color="#1e3a8a"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
      >
        {label}
      </Text>
    </group>
  );
};

const MiniMascot = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ref} scale={0.6}>
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.52, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Eyes */}
      <group position={[0, 0.4, 0.5]}>
        <mesh position={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>
    </group>
  );
};

const InteractiveScene = () => {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Interface Hub */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <GlassCard position={[0, 0.5, -0.5]} scale={[3, 2, 0.1]} label="DASHBOARD ALPHA" opacity={0.6} />
      </Float>

      {/* Floating Side Cards */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <GlassCard position={[-2.5, 1.2, 0.5]} scale={[1.2, 0.8, 0.1]} label="STATS" color="#dbeafe" />
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <GlassCard position={[2.5, -0.2, 1]} scale={[1, 1.4, 0.1]} label="SYSTEMS" color="#eff6ff" />
      </Float>
      <Float speed={4} rotationIntensity={0.8} floatIntensity={1.5}>
        <GlassCard position={[-2, -1.5, -1]} scale={[0.8, 0.8, 0.1]} label="USER: GOGO" color="#bfdbfe" />
      </Float>

      {/* Small Decorative Icons */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[1.5, 1.5, -2]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-1.2, 0, 1.2]}>
          <torusGeometry args={[0.15, 0.05, 16, 32]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
      </Float>

      {/* The Mascot interacting with the UI */}
      <MiniMascot />

      {/* Background Sphere for Glow */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#f0f9ff" side={THREE.BackSide} />
      </mesh>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={3} far={4} />
    </group>
  );
};

const InterfaceShowcase: React.FC = () => {
  return (
    <section className="relative h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#bfdbfe" />
          <spotLight position={[-10, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <InteractiveScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 pointer-events-none grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="text-blue-500 font-black tracking-widest text-[10px] uppercase mb-4 block animate-pulse">Live Dashboard</span>
          <h2 className="text-5xl md:text-7xl font-black text-blue-900 tracking-tighter leading-none mb-8">
            The World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">At Your Finger-tips.</span>
          </h2>
          <p className="text-blue-900/40 text-lg font-medium max-w-md leading-relaxed">
            Manage your digital assets and exploration logs through our high-fidelity spatial interface, optimized for curious spirits.
          </p>
        </div>
        
        <div className="hidden md:flex flex-col justify-end items-end pb-20">
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-2xl space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                   <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div>
                   <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Active session</p>
                   <p className="text-xl font-black text-blue-900 leading-none">Exploring #042</p>
                </div>
             </div>
             <div className="h-[1px] bg-blue-100 w-full"></div>
             <div className="flex gap-8">
                <div>
                   <p className="text-[10px] font-bold text-blue-400">PING</p>
                   <p className="text-sm font-black text-blue-900">12ms</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-blue-400">SYNC</p>
                   <p className="text-sm font-black text-blue-900">100%</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-blue-400">ENERGY</p>
                   <p className="text-sm font-black text-blue-900">∞</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Cinematic Letterboxing Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-60"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default InterfaceShowcase;
