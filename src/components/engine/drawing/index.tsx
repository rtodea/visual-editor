import { Vector3 } from "three";
import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import React, { FC, ReactElement } from "react";

export const vector = (point: Point3d): Vector3 => {
  return [point.x, point.y, point.z] as unknown as Vector3;
};
export const DrawingId = "drawing";
export type Point2d = {
  x: number;
  y: number;
};
export type DrawingFC = FC<{ children: ReactElement[] | ReactElement }>;
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
export type Point3d = {
  x: number;
  y: number;
  z: number;
};
export const ThreeJsOrthogonalCamera = {
  zoom: 50,
  position: [0, 1, 0] as unknown as Vector3,
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
export const ThreeJsDrawing: DrawingFC = ({ children }) => {
  return (
    <Canvas
      id={DrawingId}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
      orthographic
      camera={ThreeJsOrthogonalCamera}
    >
      {/*<OrbitControls />*/}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
      <gridHelper args={[30, 30, "teal", "teal"]} />
      <axesHelper />
      <ThreeJsStoreIntegration />
    </Canvas>
  );
};

export const ThreeJsStoreIntegration = () => {
  // @ts-ignore
  window["threeJsScene"] = useThree((state) => state.scene);
  // @ts-ignore
  console.log("threeJsScene", window["threeJsScene"]);
  return <></>;
};
