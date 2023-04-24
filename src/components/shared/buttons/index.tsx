import { IconButton, IconButtonPropsColorOverrides } from "@mui/material";
import {
  ChangeHistoryOutlined,
  DeleteForeverTwoTone,
  HexagonOutlined,
  NearMe,
  OpenWith,
  ScatterPlot,
  SquareOutlined,
} from "@mui/icons-material";
import { FC, MouseEventHandler, ReactElement } from "react";
import { OverridableStringUnion } from "@mui/types";

export type ButtonProps = {
  onClick: MouseEventHandler;
  active?: boolean;
};

export enum ButtonColorClassName {
  Active = "MuiIconButton-colorPrimary",
  Default = "MuiIconButton-colorInherit",
}

export type ButtonFC = FC<ButtonProps>;

export const AllButtons: ButtonFC = ({ onClick, active = false }) => {
  return (
    <>
      <SelectButton onClick={onClick} active={active} />
      <MoveButton onClick={onClick} active={active} />
      <ClosestPointButton onClick={onClick} active={active} />
      <SquareButton onClick={onClick} active={active} />
      <TriangleButton onClick={onClick} active={active} />
      <HexagonButton onClick={onClick} active={active} />
    </>
  );
};

const IconButtonStateColor = {
  Default: "inherit",
  Active: "primary",
};

type IconButtonStateColorType =
  | OverridableStringUnion<
      | "default"
      | "primary"
      | "inherit"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning",
      IconButtonPropsColorOverrides
    >
  | undefined;

const IconButtonWithActive: FC<{
  onClick: MouseEventHandler;
  active: boolean;
  children: ReactElement;
  "data-testid": string;
}> = ({ onClick, active, children, "data-testid": dataTestId }) => {
  const color = (active
    ? IconButtonStateColor.Active
    : IconButtonStateColor.Default) as unknown as IconButtonStateColorType;
  return (
    <IconButton onClick={onClick} color={color} data-testid={dataTestId}>
      {children}
    </IconButton>
  );
};

export const SelectButtonId = "select";

export const SelectButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={SelectButtonId}
    >
      <NearMe />
    </IconButtonWithActive>
  );
};

export const MoveButtonId = "move";

export const MoveButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={MoveButtonId}
    >
      <OpenWith />
    </IconButtonWithActive>
  );
};

export const ClosestPointButtonId = "closest-point";

export const ClosestPointButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={ClosestPointButtonId}
    >
      <ScatterPlot />
    </IconButtonWithActive>
  );
};

export const SquareButtonId = "square";

export const SquareButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={SquareButtonId}
    >
      <SquareOutlined />
    </IconButtonWithActive>
  );
};

export const TriangleButtonId = "triangle";

export const TriangleButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={TriangleButtonId}
    >
      <ChangeHistoryOutlined />
    </IconButtonWithActive>
  );
};

export const HexagonButtonId = "hexagon";

export const HexagonButton: ButtonFC = ({ onClick, active = false }) => {
  return (
    <IconButtonWithActive
      onClick={onClick}
      active={active}
      data-testid={HexagonButtonId}
    >
      <HexagonOutlined />
    </IconButtonWithActive>
  );
};

export const ResetButtonId = "reset";

export const ResetButton: ButtonFC = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} data-testid={ResetButtonId}>
      <DeleteForeverTwoTone />
    </IconButton>
  );
};
