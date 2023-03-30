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
import { DrawingContext } from "@/components/placeholder/drawing/hooks";

export const DefaultDrawingContext = {} as unknown as DrawingContext;
export const Drawing: DrawingFC = ({
  children,
  drawingContext = DefaultDrawingContext,
}) => {
  return (
    <div
      style={{
        border: "0px solid black",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <ThreeJsDrawing drawingContext={drawingContext}>
        {children}
      </ThreeJsDrawing>
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

export const DrawingWithState: FC<{
  drawables: DrawableProto[];
  drawingContext?: DrawingContext;
}> = ({ drawables, drawingContext = DefaultDrawingContext }) => {
  return (
    <Drawing drawingContext={drawingContext}>
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
