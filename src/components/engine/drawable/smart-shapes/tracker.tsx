import { useMouse3dPosition } from "@/components/engine/drawable/hooks/useMouse3dPosition";
import { ThreeJsCircle } from "@/components/engine/drawable/shapes/circle";
import React from "react";
import { vector3 } from "@/components/engine/drawing";

export const MouseTracker = () => {
  const { mouse3dPosition } = useMouse3dPosition();
  return (
    <ThreeJsCircle
      name={"MOUSE_TRACKER"}
      position={vector3({
        ...mouse3dPosition,
        y: 0.1,
      })}
    />
  );
};
