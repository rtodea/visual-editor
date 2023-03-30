import React, { FC } from "react";
import { DrawingFC, ThreeJsDrawing } from "@/components/engine/drawing";
import {
  Circle,
  Hexagon,
  Square,
  Triangle,
} from "@/components/placeholder/drawable";
import {
  DrawableProto,
  DrawableProtoEnum,
} from "@/components/placeholder/drawing/models";
import { useThree } from "@react-three/fiber";

export const useDrawingInnerState = () => {
  const scene = useThree((state) => state.scene);
  return {
    drawablePositions: [],
  };
};

export const Drawing: DrawingFC = ({ children }) => {
  return (
    <div
      style={{
        border: "0px solid black",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <ThreeJsDrawing>{children}</ThreeJsDrawing>
    </div>
  );
};

export const DrawablePrototypeToDrawable = {
  [DrawableProtoEnum.Square]: (props: DrawableProto) => <Square {...props} />,
  [DrawableProtoEnum.Triangle]: (props: DrawableProto) => (
    <Triangle {...props} />
  ),
  [DrawableProtoEnum.Hexagon]: (props: DrawableProto) => <Hexagon {...props} />,
  [DrawableProtoEnum.Circle]: (props: DrawableProto) => <Circle {...props} />,
  undefined: (props: DrawableProto) => <></>,
};

export const DrawingWithState: FC<{ drawables: DrawableProto[] }> = ({
  // @ts-ignore
  drawables,
}) => {
  return (
    <Drawing>
      {drawables.map((drawable: DrawableProto, index) => {
        // @ts-ignore
        return DrawablePrototypeToDrawable[drawable.type]({
          key: index,
          ...drawable,
        });
      })}
    </Drawing>
  );
};

export const useDrawing = () => {
  return { drawables: [] };
};
