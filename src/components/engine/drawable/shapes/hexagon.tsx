import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useDrawable } from "@/components/engine/drawable/hooks/useDrawable";
import { DrawableColor } from "@/components/engine/drawable/shapes/constants";
import React from "react";
import { Point3d } from "@/components/engine/drawing";

export const HEXAGON_OFFSET = 2;

export const ThreeJsHexagon = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const radius = HEXAGON_OFFSET;
  const cosine_30 = Math.cos(Math.PI / 6);
  const sine_30 = Math.sin(Math.PI / 6);
  const points = [
    { x: origin_x, y: origin_y + radius },
    { x: origin_x + radius * cosine_30, y: origin_y + radius * sine_30 },
    { x: origin_x + radius * cosine_30, y: origin_y - radius * sine_30 },
    { x: origin_x, y: origin_y - radius },
    { x: origin_x - radius * cosine_30, y: origin_y - radius * sine_30 },
    { x: origin_x - radius * cosine_30, y: origin_y + radius * sine_30 },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const hexagonGeometry = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable({
    ...props,
    materialColor: DrawableColor.Hexagon,
  });

  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={hexagonGeometry}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};
export const hexagonCenterToVertexList = (center: Point3d): Point3d[] => {
  const radius = HEXAGON_OFFSET;
  const cosine_30 = Math.cos(Math.PI / 6);
  const sine_30 = Math.sin(Math.PI / 6);
  return [
    { x: center.x, y: center.y, z: center.z + radius },
    {
      x: center.x + radius * cosine_30,
      y: center.y,
      z: center.z + radius * sine_30,
    },
    {
      x: center.x + radius * cosine_30,
      y: center.y,
      z: center.z - radius * sine_30,
    },
    { x: center.x, y: center.y, z: center.z - radius },
    {
      x: center.x - radius * cosine_30,
      y: center.y,
      z: center.z - radius * sine_30,
    },
    {
      x: center.x - radius * cosine_30,
      y: center.y,
      z: center.z + radius * sine_30,
    },
  ];
};
