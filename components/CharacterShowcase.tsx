
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

const ShowcaseMascot = ({ rotation = [0, 0, 0], animate = false }: { rotation?: [number, number, number], animate?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation} scale={1.4} position={[0, -0.2, 0]}>
      {/* Body: High-quality white capsule */}
      <mesh castShadow>
        <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.02} />
      </mesh>

      {/* Head Spike */}
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.4, 0.6, 32]} />
        <meshStandardMaterial color="#2563eb" roughness={0.1} />
      </mesh>

      {/* Face Plate Area */}
      <mesh position={[0, 0.6, 0.65]} scale={[1, 0.8, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.02} />
      </mesh>

      {/* Eyes */}
      <group position={[0, 0.65, 0.8]}>
        <mesh position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
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
        <mesh position={[0, -0.15, 0]}>
            <torusGeometry args={[0.05, 0.01, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>

      {/* Blue Pants / Lower Part */}
      <mesh position={[0, -0.8, 0]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.1} />
      </mesh>

      {/* Arms */}
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

const ViewportCard = ({ title, rotation, animate = false }: { title: string, rotation: [number, number, number], animate?: boolean }) => (
  <div className="flex flex-col items-center group">
    <div className="w-full aspect-[4/5] bg-white rounded-[3rem] border border-blue-50 shadow-2xl shadow-blue-900/5 overflow-hidden relative transform group-hover:-translate-y-2 transition-transform duration-500">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={30} />
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 10, 5]} angle={0.2} intensity={1.5} castShadow />
        <pointLight position={[-5, 2, -5]} color="#bfdbfe" intensity={0.8} />
        <directionalLight position={[0, 5, 10]} intensity={0.5} />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <ShowcaseMascot rotation={rotation} animate={animate} />
        </Suspense>
        <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />
      </Canvas>
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
        <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em]">{title}</span>
      </div>
    </div>
  </div>
);

const CharacterShowcase: React.FC = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">Design Specifications</span>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tight leading-none mb-6">
              The Anatomy <br />
              <span className="text-blue-600">of GOGO.</span>
            </h2>
            <p className="text-blue-900/50 font-medium text-lg leading-relaxed">
              Every curve and color of GOGO is engineered for digital warmth and emotional resonance. Explore the geometry of your new companion.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 hidden lg:block">
            <div className="flex gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue-200"></div>)}
            </div>
            <p className="text-blue-400 text-[10px] font-black uppercase mt-4">Model Ver: 2.0.4-Stable</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ViewportCard title="Front Perspective" rotation={[0, 0, 0]} animate={true} />
          <ViewportCard title="Side Profile" rotation={[0, Math.PI / 2, 0]} />
          <ViewportCard title="Rear Geometry" rotation={[0, Math.PI, 0]} />
        </div>
        
        <div className="mt-20 pt-12 border-t border-blue-50 flex flex-wrap gap-12 justify-center opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-blue-900">4,280</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase">Polygons</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-blue-900">4K</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase">Texture Res</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-blue-900">240fps</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase">Animation Rate</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-blue-900">SDF</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase">Rendering</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;
