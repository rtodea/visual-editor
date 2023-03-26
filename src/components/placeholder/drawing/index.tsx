import React, { useRef, useState } from "react";

import * as THREE from "three";
import { Vector3 } from "three";
import { Canvas, ThreeElements } from "@react-three/fiber";
// import { OrbitControls, OrthographicCamera } from "@react-three/drei";

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

/* 2D coordinate system */
/*
(0, 0)
 -------> (x)
 |
 |
 v
 (y)
 */

/* 3D coordinate system */
/* The X axis is red. The Y axis is green. The Z axis is blue. */
/*
 --------> (X) (red)
 |
 |
 v
 (Z) (blue)
 */

export const vector = (point: Point3d): Vector3 => {
  return [point.x, point.y, point.z] as unknown as Vector3;
};

export const convert2dTo3d = (canvas: Point2d): Point3d => {
  return {
    x: canvas.x,
    y: 0,
    z: canvas.y,
  };
};

export const convert3dTo2d = (threeJsPoint: Point3d): Point2d => {
  return {
    x: threeJsPoint.x,
    y: threeJsPoint.z,
  };
};

export type Point2d = {
  x: number;
  y: number;
};

export type Point3d = {
  x: number;
  y: number;
  z: number;
};

export const Drawing = () => {
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <Canvas
        id={DrawingId}
        style={{ height: "400px" }}
        orthographic
        camera={{
          zoom: 50,
          position: [0, 1, 0],
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Square position={vector(convert2dTo3d({ x: 0, y: 0 }))} />
        <Square position={vector(convert2dTo3d({ x: 4, y: 0 }))} />
        <gridHelper args={[30, 30]} />
        <axesHelper />
      </Canvas>
    </div>
  );
};
