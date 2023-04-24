import React, { FC } from "react";
import { convert2dTo3d, vector3 } from "@/components/engine/drawing";
import { DrawableProto } from "@/components/drawing/models";
import { DrawableColor } from "@/components/engine/drawable/shapes/constants";
import { ThreeJsSquare } from "@/components/engine/drawable/shapes/square";
import { ThreeJsTriangle } from "@/components/engine/drawable/shapes/triangle";
import { ThreeJsHexagon } from "@/components/engine/drawable/shapes/hexagon";
import { ThreeJsCircle } from "@/components/engine/drawable/shapes/circle";

export const TreeJs2dSquare: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsSquare
      position={vector3(convert2dTo3d(center))}
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
      position={vector3(convert2dTo3d(center))}
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
      position={vector3(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};

export const ThreeJs2dCircle: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsCircle
      position={vector3(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};
