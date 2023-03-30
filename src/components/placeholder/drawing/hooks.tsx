import React, { useState } from "react";
import {
  DrawableProto,
  DrawableProtoEnum,
  DrawingModeEnum,
} from "@/components/placeholder/drawing/models";
import {
  DrawingAction,
  DrawingActionEnum,
} from "@/components/placeholder/drawing/actions";

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
  console.log("setAddShapeMode", mode);
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
  dispatch?: unknown;
};

export const DrawingContextToDrawable = {
  [DrawingModeEnum.AddSquare]: DrawableProtoEnum.Square,
  [DrawingModeEnum.AddTriangle]: DrawableProtoEnum.Triangle,
  [DrawingModeEnum.AddHexagon]: DrawableProtoEnum.Hexagon,
} as const;

// in-house dispatch
export const useDispatchWithReducer = ({
  setDrawables,
}: {
  setDrawables: React.Dispatch<React.SetStateAction<DrawableProto[]>>;
}) => {
  return (action: DrawingAction) => {
    console.log("dispatch", action);
    if (action.type === DrawingActionEnum.MouseClickOnDrawing) {
      const { activeDrawingMode, point2d } = action.payload as unknown as {
        activeDrawingMode: DrawingModeEnum;
        point2d: { x: number; y: number };
      };

      // @ts-ignore
      const drawableType = DrawingContextToDrawable[activeDrawingMode];
      if (!drawableType) {
        return;
      }

      // @ts-ignore
      setDrawables((drawables) => {
        return [
          ...drawables,
          {
            type: drawableType,
            name: `${drawableType}_${Date.now()}`,
            center: point2d,
          },
        ];
      });
    }
  };
};

export const useDrawing = () => {
  const [drawables, setDrawables] = useState<DrawableProto[]>([]);
  // @ts-ignore
  const dispatch = useDispatchWithReducer({ setDrawables });
  const [drawingContext, setDrawingContext] = useState<DrawingContext>({
    mode: DrawingModeEnum.Select,
    dispatch,
  });

  return {
    drawables,
    setDrawingMode: (mode: DrawingModeEnum) => {
      // @ts-ignore
      setDrawingContext((drawingContext) => ({ ...drawingContext, mode }));
      // @ts-ignore
      DrawingModeToHandler[mode]?.({ setDrawables, mode });
    },
    drawingContext,
  };
};
