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
import React, { FC, MouseEventHandler, useState } from "react";

enum ActiveButtonId {
  Select = "select",
  Move = "move",
  ClosestPoint = "closestPoint",
  Square = "square",
  Triangle = "triangle",
  Hexagon = "hexagon",
}

export type EditorButtonsConfig<T> = {
  selectButton: T;
  moveButton: T;
  closestPointButton: T;
  squareButton: T;
  triangleButton: T;
  hexagonButton: T;
};

export type EditorButtonsProps = EditorButtonsConfig<ButtonProps>;

export const useOnlyOneEditorButtonActive = (): EditorButtonsProps => {
  const [active, setActive] = useState(ActiveButtonId.Select);

  return {
    selectButton: {
      onClick: () => setActive(ActiveButtonId.Select),
      active: active === ActiveButtonId.Select,
    },
    moveButton: {
      onClick: () => setActive(ActiveButtonId.Move),
      active: active === ActiveButtonId.Move,
    },
    closestPointButton: {
      onClick: () => setActive(ActiveButtonId.ClosestPoint),
      active: active === ActiveButtonId.ClosestPoint,
    },
    squareButton: {
      onClick: () => setActive(ActiveButtonId.Square),
      active: active === ActiveButtonId.Square,
    },
    triangleButton: {
      onClick: () => setActive(ActiveButtonId.Triangle),
      active: active === ActiveButtonId.Triangle,
    },
    hexagonButton: {
      onClick: () => setActive(ActiveButtonId.Hexagon),
      active: active === ActiveButtonId.Hexagon,
    },
  };
};

export type EditorButtonsFC = FC<EditorButtonsConfig<ButtonProps>>;

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

const enhanceWith = (fn: MouseEventHandler, enhanceFn: MouseEventHandler) => {
  // @ts-ignore
  return (event) => {
    fn(event);
    enhanceFn(event);
  };
};

export type EditorButtonHandlers = EditorButtonsConfig<MouseEventHandler>;

export const enhanceEditorButtonsWithButtonHandlers = (
  editorButtonsProps: EditorButtonsProps,
  buttonHandlers: EditorButtonHandlers
) => {
  if (!buttonHandlers) {
    return editorButtonsProps;
  }

  const enhancedEditorButtonsProps = Object.keys(buttonHandlers).reduce(
    (enhanced, k) => {
      const key = k as unknown as keyof EditorButtonsProps;
      enhanced[key] = {
        active: editorButtonsProps[key].active,
        onClick: enhanceWith(
          editorButtonsProps[key].onClick,
          buttonHandlers[key]
        ),
      };

      return enhanced;
    },
    {} as Partial<EditorButtonsProps>
  );

  return { ...editorButtonsProps, ...enhancedEditorButtonsProps };
};

export const useEditorButtons = (buttonHandlers: EditorButtonHandlers) => {
  const onlyOneActive = useOnlyOneEditorButtonActive();
  return enhanceEditorButtonsWithButtonHandlers(onlyOneActive, buttonHandlers);
};
