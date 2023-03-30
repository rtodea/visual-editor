import React, { FC } from "react";
import { convert2dTo3d, vector } from "@/components/engine/drawing";
import { DrawableProto } from "@/components/placeholder/drawing/models";
import {
  DrawableColor,
  ThreeJsCircle,
  ThreeJsHexagon,
  ThreeJsSquare,
  ThreeJsTriangle,
} from "@/components/engine/drawable/shapes";

export const TreeJs2dSquare: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsSquare
      position={vector(convert2dTo3d(center))}
      name={name}
      materialColor={DrawableColor.Square}
      userData={state}
    />
  );
};

export const ThreeJs2dTriangle: FC<DrawableProto> = ({
  center,
  name,
  state,
}) => {
  return (
    <ThreeJsTriangle
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};

export const ThreeJs2dHexagon: FC<DrawableProto> = ({
  center,
  name,
  state,
}) => {
  return (
    <ThreeJsHexagon
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};

export const ThreeJs2dCircle: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsCircle
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};
