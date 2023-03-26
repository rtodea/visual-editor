import { ThreeElements } from "@react-three/fiber";
import React, { FC, useRef, useState } from "react";
import * as THREE from "three";
import {
  convert2dTo3d,
  Point2d,
  vector,
} from "@/components/placeholder/drawing";

export const ThreeJsSquare = (props: ThreeElements["mesh"]) => {
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

export const Square: FC<{ center: Point2d }> = ({ center }) => {
  return <ThreeJsSquare position={vector(convert2dTo3d(center))} />;
};
