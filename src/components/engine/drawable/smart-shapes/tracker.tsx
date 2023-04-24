import { useMouse3dPosition } from "@/components/engine/drawable/hooks/useMouse3dPosition";
import { ThreeJsCircle } from "@/components/engine/drawable/shapes/circle";
import React from "react";
import { vector3 } from "@/components/engine/drawing";
import {
  DrawableColor,
  DrawableShapeElevation,
} from "@/components/engine/drawable/shapes/constants";
import { useSearchParams } from "next/navigation";

export const useMouseTrackerVisibility = () => {
  const searchParams = useSearchParams();
  const isVisible = searchParams.has("debug");

  return { isVisible };
};

export const MouseTracker = () => {
  const { mouse3dPosition } = useMouse3dPosition();


  return (
    <ThreeJsCircle
      name={"MOUSE_TRACKER"}
      materialColor={DrawableColor.MouseTracker}
      position={vector3({
        ...mouse3dPosition,
        y: DrawableShapeElevation.MouseTracker,
      })}
    />
  );
};

export const MouseTrackerDebug = () => {
  const { isVisible } = useMouseTrackerVisibility();
  if (!isVisible) {
    return <></>;
  } else {
    return <MouseTracker />;
  }
}
