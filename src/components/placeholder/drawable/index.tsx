import React, { FC } from "react";
import {
  ThreeJs2dCircle,
  ThreeJs2dHexagon,
  ThreeJs2dTriangle,
  TreeJs2dSquare,
} from "@/components/engine/drawable";
import { DrawableProto } from "@/components/placeholder/drawing/models";

export const Square: FC<DrawableProto> = (props) => {
  return <TreeJs2dSquare {...props} />;
};

export const Triangle: FC<DrawableProto> = (props) => {
  return <ThreeJs2dTriangle {...props} />;
};

export const Hexagon: FC<DrawableProto> = (props) => {
  return <ThreeJs2dHexagon {...props} />;
};

export const Circle: FC<DrawableProto> = (props) => {
  return <ThreeJs2dCircle {...props} />;
};
