import { selectDrawables } from "@/store/slices/drawables";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { ClosestPoint } from "@/components/engine/drawable/smart-shapes/closest-point/closest-point";
import { DrawableProto } from "@/components/drawing/models";
import { useThree } from "@react-three/fiber";

export const ClosestPointFactory = () => {
  const drawables = useSelector(selectDrawables);
  const scene = useThree((state) => state.scene);

  // TODO: remove after debugging
  useEffect(() => {
    // @ts-ignore
    window["scene"] = scene;
  }, [scene]);

  return (
    <>
      {drawables.map((drawable: DrawableProto) => {
        return <ClosestPoint key={drawable.name} name={drawable.name} />;
      })}
    </>
  );
};
