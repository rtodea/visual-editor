import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { useDrawable } from "@/components/engine/drawable/hooks/useDrawable";

export enum DrawableColor {
  Square = "red",
  Triangle = "green",
  Hexagon = "blue",
  Circle = "black",
}

export const ThreeJsSquare = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = 1;
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
export const ThreeJsTriangle = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = 1;
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
export const ThreeJsCircle = (props: ThreeElements["mesh"]) => {
  const geometry = new THREE.CircleGeometry(0.1, 32);

  return (
    <mesh {...props} geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial
        // wireframe={active}
        color={"black"}
      />
    </mesh>
  );
};
