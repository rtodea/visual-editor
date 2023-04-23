import { Point3d } from "@/components/engine/drawing";
import { TRIANGLE_OFFSET } from "@/components/engine/drawable/shapes/triangle";

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
