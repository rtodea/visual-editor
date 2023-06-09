import React from "react";
import { CssBaseline } from "@mui/material";
import { SideMenu } from "@/components/shared/side-menu";
import { DrawingWithState } from "@/components/drawing";
import { EditorButtons, useEditorButtons } from "@/components/editor-buttons";
import { DrawingModeEnum } from "@/components/drawing/models";
import { useDrawing } from "@/components/drawing/hooks";
import {
  useAutoSave,
  useLoadFromLocalStorage,
  useResetDrawing,
} from "@/components/editor/hooks";

export const Editor = () => {
  useAutoSave();

  useLoadFromLocalStorage();
  const { reset } = useResetDrawing();

  const { setDrawingMode, ...drawing } = useDrawing();

  const editorButtons = useEditorButtons({
    selectButton: () => setDrawingMode(DrawingModeEnum.Select),
    moveButton: () => setDrawingMode(DrawingModeEnum.Drag),
    closestPointButton: () => setDrawingMode(DrawingModeEnum.ClosestPoint),
    squareButton: () => setDrawingMode(DrawingModeEnum.AddSquare),
    triangleButton: () => setDrawingMode(DrawingModeEnum.AddTriangle),
    hexagonButton: () => setDrawingMode(DrawingModeEnum.AddHexagon),
    resetButton: () => {
      setDrawingMode(DrawingModeEnum.Select);
      reset();
    },
  });

  return (
    <div>
      <CssBaseline />

      <SideMenu
        sideItems={<EditorButtons {...editorButtons} />}
        mainContent={<DrawingWithState {...drawing} />}
        sideItemsWidth={75}
      />
    </div>
  );
};
