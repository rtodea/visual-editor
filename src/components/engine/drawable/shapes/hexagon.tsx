import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useDrawable } from "@/components/engine/drawable/hooks/useDrawable";
import { DrawableColor } from "@/components/engine/drawable/shapes/constants";
import React from "react";

export const ThreeJsHexagon = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const radius = 1;
  const points = [
    { x: origin_x, y: origin_y + radius },
    { x: origin_x + radius * 0.866, y: origin_y + radius * 0.5 },
    { x: origin_x + radius * 0.866, y: origin_y - radius * 0.5 },
    { x: origin_x, y: origin_y - radius },
    { x: origin_x - radius * 0.866, y: origin_y - radius * 0.5 },
    { x: origin_x - radius * 0.866, y: origin_y + radius * 0.5 },
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
