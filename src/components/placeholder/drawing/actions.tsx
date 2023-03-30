import {
  DrawingModeEnum,
  Point2d,
} from "@/components/placeholder/drawing/models";

export enum DrawingActionEnum {
  MouseClickOnDrawing = "MOUSE_CLICK_ON_DRAWING",
}

export type DrawingAction = {
  type: DrawingActionEnum;
  payload: unknown;
};

export const mouseClickOnDrawing = ({
  activeDrawingMode,
  point2d,
}: {
  activeDrawingMode: DrawingModeEnum;
  point2d: Point2d;
}) => {
  return {
    type: DrawingActionEnum.MouseClickOnDrawing,
    payload: {
      point2d,
      activeDrawingMode,
    },
  };
};
