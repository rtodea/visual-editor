import React, { FC, ReactElement } from "react";

import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, OrthographicCamera } from "@react-three/drei";

export const DrawingId = "drawing";

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

const ThreeJsOrthogonalCamera = {
  zoom: 50,
  position: [0, 1, 0] as unknown as Vector3,
};

export type DrawingFC = FC<{ children: ReactElement[] | ReactElement }>;

export const ThreeJsDrawing: DrawingFC = ({ children }) => {
  return (
    <Canvas
      id={DrawingId}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
      orthographic
      camera={ThreeJsOrthogonalCamera}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
      <gridHelper args={[30, 30]} />
      <axesHelper />
    </Canvas>
  );
};

export const Drawing: DrawingFC = ({ children }) => {
  return (
    <div
      style={{
        border: "0px solid black",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <ThreeJsDrawing>{children}</ThreeJsDrawing>
    </div>
  );
};
