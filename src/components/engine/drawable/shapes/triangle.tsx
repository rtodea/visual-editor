import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useDrawable } from "@/components/engine/drawable/hooks/useDrawable";
import { DrawableColor } from "@/components/engine/drawable/shapes/constants";
import React from "react";
import { Point3d } from "@/components/engine/drawing";

export const TRIANGLE_OFFSET = 2;

export const ThreeJsTriangle = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = TRIANGLE_OFFSET;
  const points = [
    { x: origin_x - offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y - offset },
    { x: origin_x, y: origin_y + offset },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const triangleShapeGeometry = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable({
    ...props,
    materialColor: DrawableColor.Triangle,
  });
  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={triangleShapeGeometry}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};
export const triangleCenterToVertexList = (center: Point3d): Point3d[] => {
  return [
    {
      x: center.x - TRIANGLE_OFFSET,
      y: center.y,
      z: center.z + TRIANGLE_OFFSET,
    },
    {
      x: center.x + TRIANGLE_OFFSET,
      y: center.y,
      z: center.z + TRIANGLE_OFFSET,
    },
    { x: center.x, y: center.y, z: center.z - TRIANGLE_OFFSET },
  ];
};
