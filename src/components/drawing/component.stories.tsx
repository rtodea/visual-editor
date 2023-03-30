import { Drawing, DrawingWithState } from "@/components/drawing/index";
import React, { useState } from "react";
import { Square } from "@/components/drawable";
import { DrawableProto, DrawableProtoEnum } from "@/components/drawing/models";

export default {
  title: "Placeholder/Drawing",
  component: Drawing,
};

export const Default = () => {
  return (
    <Drawing>
      <Square center={{ x: 0, y: 0 }} name="firstSquare" />
      <Square center={{ x: 4, y: 0 }} name="secondSquare" />
    </Drawing>
  );
};

export const WithState = () => {
  const [drawables, setDrawables] = useState<DrawableProto[]>([]);
  const onClick = () => {
    setDrawables([
      ...drawables,
      {
        center: { x: 0, y: 0 },
        type: DrawableProtoEnum.Square,
        name: "square",
        state: {
          isDraggable: true,
          position: { x: 0, y: 0 },
          isSelectable: false,
          isSelected: false,
        },
      },
    ]);
  };

  const drawablePositions = drawables.map(({ state }) => state?.position); // useDrawingInnerState();
  const toggleDraggingForAllDrawables = () => {
    setDrawables([
      ...drawables.map((drawable) => {
        const state = drawable.state || {
          isDraggable: true,
          isSelectable: false,
        };
        state.isDraggable = !state.isDraggable;
        state.isSelectable = !state.isSelectable;

        return drawable;
      }),
    ]);
  };

  return (
    <>
      <button onClick={onClick}>Add Square</button>
      <button onClick={toggleDraggingForAllDrawables}>
        Toggle Dragging/Selectable
      </button>
      {JSON.stringify(drawablePositions)}
      <DrawingWithState drawables={drawables} />
    </>
  );
};
