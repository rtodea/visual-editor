import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useState } from "react";
import { Point3d } from "@/components/engine/drawing";

export const useMouse3dPosition = () => {
  const { camera, mouse } = useThree();
  const [mouse3dPosition, setMouse3dPosition] = useState<Point3d>({
    x: 0,
    y: 0,
    z: 0,
  });

  const mouseVector = new Vector3();
  useFrame(() => {
    // This uses some advanced concepts from 3d
    // the `mouse` from `useThree` is in the NDC space [-1, 1]
    mouseVector.set(mouse.x, mouse.y, 0).unproject(camera);

    setMouse3dPosition({
      x: mouseVector.x,
      y: 0,
      z: mouseVector.z,
    });
  });

  return {
    mouse3dPosition,
  };
};
