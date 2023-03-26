import React, { useRef, useState } from "react";

import * as THREE from "three";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const DrawingId = "drawing";

export const Square = (props: ThreeElements["mesh"]) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export const Drawing = () => {
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <Canvas id={DrawingId} style={{ height: "400px" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Square position={[-1.2, 0, 0]} />
        <Square position={[1.2, 0, 0]} />
        <gridHelper />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
