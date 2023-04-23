export type Point2d = {
  x: number;
  y: number;
};

export enum DrawableProtoEnum {
  Square = "square",
  Triangle = "triangle",
  Hexagon = "hexagon",
  Circle = "circle",
  Unknown = "unknown",
}

export type DrawableProtoState = {
  isDraggable: boolean;
  position: Point2d;

  isSelectable: boolean;
  isSelected: boolean;
};

export type DrawableProto = {
  name: string; // unique name to be persisted in the drawing engine
  center: Point2d;
  type?: DrawableProtoEnum;
  state?: DrawableProtoState;
};

export enum DrawingModeEnum {
  Select = "select",
  Drag = "drag",
  ClosestPoint = "closestPoint",

  AddSquare = "addSquare",
  AddTriangle = "addTriangle",
  AddHexagon = "addHexagon",
}
