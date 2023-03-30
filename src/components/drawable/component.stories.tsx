import React from "react";
import { Drawing } from "@/components/drawing";
import { Circle, Hexagon, Square, Triangle } from "@/components/drawable/index";
import { withMockedRedux } from "@/stories/helpers";

export default {
  title: "Placeholder/Drawing/Shapes",
  component: Drawing,
  decorators: [withMockedRedux],
};

export const SquareShape = () => {
  return (
    <Drawing>
      <Square center={{ x: 0, y: 0 }} name="square" />
    </Drawing>
  );
};

export const TriangleShape = () => {
  return (
    <Drawing>
      <Triangle center={{ x: 0, y: 0 }} name="triangle" />
    </Drawing>
  );
};

export const HexagonShape = () => {
  return (
    <Drawing>
      <Hexagon center={{ x: 0, y: 0 }} name="hexagon" />
    </Drawing>
  );
};

export const CircleShape = () => {
  return (
    <Drawing>
      <Circle center={{ x: 0, y: 0 }} name="circle" />
    </Drawing>
  );
};
