import { Divider, List, ListItem } from "@mui/material";
import {
  ButtonProps,
  ClosestPointButton,
  HexagonButton,
  MoveButton,
  SelectButton,
  SquareButton,
  TriangleButton,
} from "@/components/shared/buttons";
import React, { FC, useState } from "react";

enum ActiveButtonId {
  Select = "select",
  Move = "move",
  ClosestPoint = "closestPoint",
  Square = "square",
  Triangle = "triangle",
  Hexagon = "hexagon",
}

export const useOnlyOneEditorButtonActive = () => {
  const [active, setActive] = useState(ActiveButtonId.Select);
  const onClick = (id: ActiveButtonId) => {
    setActive(id);
  };

  return {
    selectButton: {
      onClick: () => onClick(ActiveButtonId.Select),
      active: active === ActiveButtonId.Select,
    },
    moveButton: {
      onClick: () => onClick(ActiveButtonId.Move),
      active: active === ActiveButtonId.Move,
    },
    closestPointButton: {
      onClick: () => onClick(ActiveButtonId.ClosestPoint),
      active: active === ActiveButtonId.ClosestPoint,
    },
    squareButton: {
      onClick: () => onClick(ActiveButtonId.Square),
      active: active === ActiveButtonId.Square,
    },
    triangleButton: {
      onClick: () => onClick(ActiveButtonId.Triangle),
      active: active === ActiveButtonId.Triangle,
    },
    hexagonButton: {
      onClick: () => onClick(ActiveButtonId.Hexagon),
      active: active === ActiveButtonId.Hexagon,
    },
  };
};

export type EditorButtonsFC = FC<{
  selectButton: ButtonProps;
  moveButton: ButtonProps;
  closestPointButton: ButtonProps;
  squareButton: ButtonProps;
  triangleButton: ButtonProps;
  hexagonButton: ButtonProps;
}>;

export const EditorButtons: EditorButtonsFC = ({
  selectButton,
  moveButton,
  closestPointButton,
  squareButton,
  triangleButton,
  hexagonButton,
}) => {
  return (
    <List>
      <ListItem>
        <SelectButton {...selectButton} />
      </ListItem>
      <ListItem>
        <MoveButton {...moveButton} />
      </ListItem>
      <ListItem>
        <ClosestPointButton {...closestPointButton} />
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <SquareButton {...squareButton} />
      </ListItem>
      <ListItem>
        <TriangleButton {...triangleButton} />
      </ListItem>
      <ListItem>
        <HexagonButton {...hexagonButton} />
      </ListItem>
    </List>
  );
};

export const useEditorButtons = () => {
  return useOnlyOneEditorButtonActive();
};
