"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

const planetsData = [
  {
    name: "Mercury",
    nameBn: "বুধ",
    size: 0.35,
    distance: 5.8,
    speed: 0.047,
    color: "#9e9e9e",
    emissive: "#2b2b2b",
    roughness: 0.8,
    metalness: 0.1,
    info: {
      distance: "57.9M KM",
      period: "88 Days",
      moons: "0",
      overview:
        "The closest and smallest planet to the Sun. Extremely hot during the day, freezing at night.",
    },
  },
  {
    name: "Venus",
    nameBn: "শুক্র",
    size: 0.58,
    distance: 8.2,
    speed: 0.035,
    color: "#e3bb76",
    emissive: "#4a3300",
    roughness: 0.5,
    metalness: 0.1,
    info: {
      distance: "108.2M KM",
      period: "225 Days",
      moons: "0",
      overview:
        "The hottest planet in the solar system. Covered in a thick CO₂ atmosphere.",
    },
  },
  {
    name: "Earth",
    nameBn: "पृथ्वी",
    size: 0.65,
    distance: 11.2,
    speed: 0.029,
    color: "#2b82c9",
    emissive: "#0d2b45",
    roughness: 0.4,
    metalness: 0.2,
    info: {
      distance: "149.6M KM",
      period: "365.25 Days",
      moons: "1",
      overview:
        "The only life-bearing planet. 71% covered by water and 29% by land.",
    },
  },
  {
    name: "Mars",
    nameBn: "মঙ্গল",
    size: 0.45,
    distance: 14.2,
    speed: 0.024,
    color: "#c1440e",
    emissive: "#4a1200",
    roughness: 0.7,
    metalness: 0.1,
    info: {
      distance: "227.9M KM",
      period: "687 Days",
      moons: "2",
      overview:
        "Known as the Red Planet, the soil appears red due to iron oxide.",
    },
  },
  {
    name: "Jupiter",
    nameBn: "বৃহস্পতি",
    size: 1.5,
    distance: 19.5,
    speed: 0.013,
    color: "#b07f35",
    emissive: "#382200",
    roughness: 0.6,
    metalness: 0.1,
    info: {
      distance: "778.5M KM",
      period: "11.86 Years",
      moons: "95",
      overview:
        "The largest planet in the solar system. A huge storm called the Great Red Spot has been raging for centuries.",
    },
  },
  {
    name: "Saturn",
    nameBn: "শনি",
    size: 1.25,
    distance: 25.5,
    speed: 0.009,
    color: "#e2bf7d",
    emissive: "#3a2b00",
    roughness: 0.6,
    metalness: 0.1,
    hasRing: true,
    info: {
      distance: "1.43B KM",
      period: "29.46 Years",
      moons: "146",
      overview:
        "A planet with extraordinary rings of ice and rock. The density is less than that of water.",
    },
  },
  {
    name: "Uranus",
    nameBn: "ইউরেনাস",
    size: 0.92,
    distance: 31.5,
    speed: 0.006,
    color: "#a3e5f7",
    emissive: "#1a4d5c",
    roughness: 0.3,
    metalness: 0.1,
    info: {
      distance: "2.87B KM",
      period: "84 Years",
      moons: "28",
      overview:
        "Ice giant gas planet. Rotates on its side, its axis tilted by about 98°.",
    },
  },
  {
    name: "Neptune",
    nameBn: "নেপচুন",
    size: 0.88,
    distance: 37.0,
    speed: 0.005,
    color: "#1d35a6",
    emissive: "#0a1240",
    roughness: 0.3,
    metalness: 0.1,
    info: {
      distance: "4.5B KM",
      period: "164.8 Years",
      moons: "16",
      overview:
        "The most distant planet in the solar system. The fastest storms blow here.",
    },
  },
];

// ===== sun Component =====
function Sun() {
  const glowRef1 = useRef();
  const glowRef2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (glowRef1.current) {
      const s1 = 1 + Math.sin(t * 1.5) * 0.03;
      glowRef1.current.scale.set(s1, s1, s1);
    }
    if (glowRef2.current) {
      const s2 = 1 + Math.cos(t * 2.0) * 0.02;
      glowRef2.current.scale.set(s2, s2, s2);
    }
  });

  return (
    <group>
      <mesh ref={glowRef1}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.25} />
      </mesh>

      <mesh ref={glowRef2}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.4} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.7, 64, 64]} />
        <meshBasicMaterial color="#ffb700" />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#ffe066" />
      </mesh>

      <pointLight color="#ffffff" intensity={10} distance={300} decay={0.7} />
    </group>
  );
}

// ===== planet Component =====
function Planet({ data, isSelected, onSelect }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const markerRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    angleRef.current += data.speed * 0.22;
    const x = data.distance * Math.cos(angleRef.current);
    const z = data.distance * Math.sin(angleRef.current);
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }

    if (markerRef.current && isSelected) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 6) * 0.2;
      markerRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[data.size * 2.0, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {isSelected && (
        <group ref={markerRef} position={[0, data.size + 0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#00dab4" />
          </mesh>

          <mesh>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshBasicMaterial color="#00dab4" transparent opacity={0.3} />
          </mesh>
        </group>
      )}

      <mesh ref={meshRef} scale={hovered ? 1.15 : 1} pointerEvents="none">
        <sphereGeometry args={[data.size, 64, 64]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={0.6}
          roughness={data.roughness}
          metalness={data.metalness}
        />
      </mesh>

      {data.hasRing && (
        <group rotation={[Math.PI / 2.2, 0.1, 0]} pointerEvents="none">
          <mesh>
            <ringGeometry args={[data.size * 1.4, data.size * 2.6, 64]} />
            <meshStandardMaterial
              color="#caaf67"
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
              roughness={0.7}
            />
          </mesh>
        </group>
      )}

      {hovered && !isSelected && (
        <mesh position={[0, data.size + 0.5, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#00dab4" opacity={0.7} transparent={true} />
        </mesh>
      )}
    </group>
  );
}

// ===== orbit =====
function OrbitRing({ distance }) {
  const points = Array.from({ length: 180 }, (_, i) => {
    const angle = (i / 180) * Math.PI * 2;
    return new THREE.Vector3(
      distance * Math.cos(angle),
      0,
      distance * Math.sin(angle),
    );
  });

  return (
    <Line
      points={points}
      color="#334155"
      lineWidth={1.2}
      transparent
      opacity={0.4}
    />
  );
}

// ===== main Component =====
export default function SolarSystem() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse at center, #060913 0%, #010204 100%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes custom-pulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 4px #ff9500; }
          50% { transform: scale(1.3); opacity: 0.7; box-shadow: 0 0 10px #ff9500; }
        }
        .selected-dot {
          animation: custom-pulse 1.5s infinite ease-in-out;
        }
      `,
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 34, 36], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />

        <Stars
          radius={260}
          depth={60}
          count={6000}
          factor={4}
          saturation={0.5}
          fade
          speed={0.5}
        />

        <Suspense fallback={null}>
          <Sun />
          {planetsData.map((planet) => (
            <React.Fragment key={planet.name}>
              <OrbitRing distance={planet.distance} />
              <Planet
                data={planet}
                isSelected={selected?.name === planet.name}
                onSelect={setSelected}
              />
            </React.Fragment>
          ))}
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={8}
          maxDistance={140}
          target={[0, 0, 0]}
        />
      </Canvas>

      <div
        className="absolute top-6 left-6 z-10"
        style={{
          background: "rgba(3, 7, 18, 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,149,0,0.2)",
          borderRadius: "14px",
          padding: "18px",
          maxWidth: "250px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          className="text-base font-black tracking-wider"
          style={{ color: "#ff9500", fontFamily: "monospace" }}
        >
          ☀️ SOLAR SYSTEM 3D
        </h1>
        <p
          className="text-[11px] mt-1 mb-3"
          style={{ color: "#94a3b8", lineHeight: "1.5" }}
        >
          When you select a planet, you will see a bright blinking dot marker
          right above that planet on the 3D screen.
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {planetsData.map((p) => {
            const isButtonSelected = selected?.name === p.name;
            return (
              <button
                key={p.name}
                onClick={() => setSelected(p)}
                className="text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all relative overflow-hidden"
                style={{
                  background: isButtonSelected
                    ? "rgba(255,149,0,0.2)"
                    : "rgba(255,255,255,0.03)",
                  border: isButtonSelected
                    ? "1px solid rgba(255,149,0,0.6)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: isButtonSelected ? "#ff9500" : "#cbd5e1",
                }}
              >
                <span
                  className={isButtonSelected ? "selected-dot" : ""}
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: isButtonSelected ? "#ff9500" : p.color,
                    marginRight: 6,
                    verticalAlign: "middle",
                    transition: "all 0.3s ease",
                  }}
                />
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="absolute top-6 right-6 z-10"
          style={{
            width: "310px",
            background: "rgba(3, 7, 18, 0.88)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,218,180,0.25)",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div
                className="text-[10px] font-mono mb-0.5"
                style={{ color: "#00dab4", letterSpacing: "0.12em" }}
              >
                CELESTIAL BODY
              </div>
              <h2
                className="text-xl font-black"
                style={{ color: "#ffffff", letterSpacing: "0.03em" }}
              >
                {selected.name.toUpperCase()}
              </h2>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
              }}
            >
              ✕ CLOSE
            </button>
          </div>

          <div
            style={{
              height: 2,
              background: `linear-gradient(90deg, ${selected.color}, transparent)`,
              borderRadius: 2,
              marginBottom: 16,
            }}
          />

          <div className="space-y-2.5 mb-4">
            {[
              { label: "DISTANCE FROM SUN", value: selected.info.distance },
              { label: "ORBITAL PERIOD", value: selected.info.period },
              { label: "KNOWN MOONS", value: selected.info.moons },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-1.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span
                  className="text-[11px] font-mono"
                  style={{ color: "#ffffff" }}
                >
                  {label}
                </span>
                <span
                  className="text-[11px] font-bold font-mono"
                  style={{ color: "#00dab4" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div
              className="text-[11px] font-mono mb-1.5"
              style={{ color: "#ffffff" }}
            >
              OVERVIEW
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{
                color: "#e2e8f0",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              {selected.info.overview}
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-center text-slate-400">
        SCROLL TO ZOOM • DRAG TO ROTATE • CLICK PLANET FOR INFO
      </div>
    </div>
  );
}
