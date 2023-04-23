import { Point3d } from "@/components/engine/drawing";
import { HEXAGON_OFFSET } from "@/components/engine/drawable/shapes/hexagon";

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
