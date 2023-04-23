import { selectDrawables } from "@/store/slices/drawables";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { ClosestPoint } from "@/components/engine/drawable/smart-shapes/closest-point/closest-point";
import { DrawableProto, DrawingModeEnum } from "@/components/drawing/models";
import { useThree } from "@react-three/fiber";

export const useClosestPointVisibility = () => {
  const isVisible = useThree(
    (state) => state.scene.userData.mode === DrawingModeEnum.ClosestPoint
  );

  return { isVisible };
};
export const ClosestPointFactory = () => {
  const drawables = useSelector(selectDrawables);
  const scene = useThree((state) => state.scene);
  const { isVisible } = useClosestPointVisibility();

  // TODO: remove after debugging
  useEffect(() => {
    // @ts-ignore
    window["scene"] = scene;
  }, [scene]);

  return (
    <>
      {isVisible &&
        drawables.map((drawable: DrawableProto) => {
          return <ClosestPoint key={drawable.name} name={drawable.name} />;
        })}
    </>
  );
};
