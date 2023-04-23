import { SQUARE_OFFSET } from "@/components/engine/drawable/shapes/square";
import { Point3d } from "@/components/engine/drawing";

export const squareCenterToVertexList = (center: Point3d): Point3d[] => {
  return [
    {
      x: center.x - SQUARE_OFFSET,
      y: center.y,
      z: center.z - SQUARE_OFFSET,
    },
    {
      x: center.x + SQUARE_OFFSET,
      y: center.y,
      z: center.z - SQUARE_OFFSET,
    },
    {
      x: center.x + SQUARE_OFFSET,
      y: center.y,
      z: center.z + SQUARE_OFFSET,
    },
    {
      x: center.x - SQUARE_OFFSET,
      y: center.y,
      z: center.z + SQUARE_OFFSET,
    },
  ];
};
