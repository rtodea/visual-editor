import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useDrawable } from "@/components/engine/drawable/hooks/useDrawable";
import React from "react";

export const SQUARE_OFFSET = 2;

export const ThreeJsSquare = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = SQUARE_OFFSET;
  const points = [
    { x: origin_x - offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y + offset },
    { x: origin_x - offset, y: origin_y + offset },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const squareShape = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable(props);
  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={squareShape}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};
