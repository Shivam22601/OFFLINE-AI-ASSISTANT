import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function NeuralNet() {
  const groupRef = useRef();
  const count = 80;

  const { positions, connections } = useMemo(() => {
    const positions = Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14,
    ]);

    const connections = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4) connections.push([i, j]);
      }
    }
    return { positions, connections };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#00ffe7" : i % 3 === 1 ? "#a855f7" : "#3b82f6"}
            emissive={i % 3 === 0 ? "#00ffe7" : i % 3 === 1 ? "#a855f7" : "#3b82f6"}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {connections.map(([i, j], idx) => {
        const start = new THREE.Vector3(...positions[i]);
        const end = new THREE.Vector3(...positions[j]);
        const mid = start.clone().lerp(end, 0.5);
        const dir = end.clone().sub(start);
        const length = dir.length();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );

        return (
          <mesh key={idx} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.005, 0.005, length, 4]} />
            <meshStandardMaterial
              color="#00ffe7"
              emissive="#00ffe7"
              emissiveIntensity={0.3}
              transparent
              opacity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function PulsingCore() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.8}
        wireframe
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      style={{ height: "100vh", background: "transparent" }}
      camera={{ position: [0, 0, 18], fov: 60 }}
    >
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 20, 40]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#a855f7" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffe7" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <NeuralNet />
      <PulsingCore />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
