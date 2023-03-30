import React, { useState } from "react";
import {
  DrawableProtoEnum,
  DrawingModeEnum,
} from "@/components/drawing/models";
import { useDispatch, useSelector } from "react-redux";
import {
  enableDrag,
  enableSelect,
  selectDrawables,
} from "@/store/slices/drawables";

const DrawingModeEnumToDispatchAction = {
  [DrawingModeEnum.Select]: enableSelect,
  [DrawingModeEnum.Drag]: enableDrag,
} as const;

export type DrawingContext = {
  mode: DrawingModeEnum;
  dispatch?: unknown;
};

export const DrawingContextToDrawable = {
  [DrawingModeEnum.AddSquare]: DrawableProtoEnum.Square,
  [DrawingModeEnum.AddTriangle]: DrawableProtoEnum.Triangle,
  [DrawingModeEnum.AddHexagon]: DrawableProtoEnum.Hexagon,
} as const;

export const useDrawing = () => {
  const drawables = useSelector(selectDrawables);
  // @ts-ignore
  const dispatch = useDispatch();
  const [drawingContext, setDrawingContext] = useState<DrawingContext>({
    mode: DrawingModeEnum.Select,
    dispatch,
  });

  return {
    drawables,
    setDrawingMode: (mode: DrawingModeEnum) => {
      // @ts-ignore
      setDrawingContext((drawingContext) => ({ ...drawingContext, mode }));
      if ([DrawingModeEnum.Select, DrawingModeEnum.Drag].includes(mode)) {
        // @ts-ignore
        dispatch(DrawingModeEnumToDispatchAction[mode]());
      }
    },
    drawingContext,
  };
};
