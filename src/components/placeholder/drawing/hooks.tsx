import React, { useState } from "react";
import {
  DrawableProto,
  DrawableProtoEnum,
  DrawingModeEnum,
} from "@/components/placeholder/drawing/models";

const AddShapeModeToShape = {
  [DrawingModeEnum.AddSquare]: DrawableProtoEnum.Square,
  [DrawingModeEnum.AddTriangle]: DrawableProtoEnum.Triangle,
  [DrawingModeEnum.AddHexagon]: DrawableProtoEnum.Hexagon,
} as const;

const setAddShapeMode = ({
  setDrawables,
  mode,
}: {
  setDrawables: React.Dispatch<React.SetStateAction<DrawableProto[]>>;
  mode: DrawingModeEnum;
}) => {
  setDrawables((drawables) => {
    // @ts-ignore
    const shape = AddShapeModeToShape[mode];
    return [
      ...drawables,
      {
        center: { x: 0, y: 0 },
        type: shape,
        name: `${shape}_${Date.now()}`,
      },
    ];
  });
};

const setSelectMode = ({
  setDrawables,
}: {
  setDrawables: React.Dispatch<React.SetStateAction<DrawableProto[]>>;
}) => {
  // @ts-ignore
  setDrawables((drawables) => {
    return drawables.map((drawable) => {
      const state = {
        ...drawable.state,
        isDraggable: false,
        isSelectable: true,
      };

      return { ...drawable, state };
    });
  });
};
const setDragMode = ({
  setDrawables,
}: {
  setDrawables: React.Dispatch<React.SetStateAction<DrawableProto[]>>;
}) => {
  // @ts-ignore
  setDrawables((drawables) => {
    return drawables.map((drawable) => {
      const state = {
        ...drawable.state,
        isDraggable: true,
        isSelectable: false,
        isSelected: false,
      };

      return { ...drawable, state };
    });
  });
};
const DrawingModeToHandler = {
  [DrawingModeEnum.Select]: setSelectMode,
  [DrawingModeEnum.Drag]: setDragMode,
  [DrawingModeEnum.AddSquare]: setAddShapeMode,
  [DrawingModeEnum.AddTriangle]: setAddShapeMode,
  [DrawingModeEnum.AddHexagon]: setAddShapeMode,
};

export type DrawingContext = {
  mode: DrawingModeEnum;
};

export const useDrawing = () => {
  const [drawables, setDrawables] = useState<DrawableProto[]>([]);
  const [drawingContext, setDrawingContext] = useState<DrawingContext>({
    mode: DrawingModeEnum.Select,
  });

  return {
    drawables,
    setDrawingMode: (mode: DrawingModeEnum) => {
      // @ts-ignore
      setDrawingContext((drawingContext) => ({ ...drawingContext, mode }));
      console.log("setDrawingMode", mode);
      // @ts-ignore
      DrawingModeToHandler[mode]?.({ setDrawables, mode });
    },
    drawingContext,
  };
};
