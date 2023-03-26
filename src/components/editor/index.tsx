import React from "react";
import { CssBaseline } from "@mui/material";
import { SideMenu } from "@/components/shared/side-menu";
import { DrawingWithState, useDrawing } from "@/components/placeholder/drawing";
import { EditorButtons, useEditorButtons } from "@/components/editor-buttons";

export const Editor = () => {
  const editorButtons = useEditorButtons();
  const drawing = useDrawing();

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
