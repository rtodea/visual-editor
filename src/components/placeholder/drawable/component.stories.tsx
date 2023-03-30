import React from "react";
import { Drawing } from "@/components/placeholder/drawing";
import { Hexagon, Square, Triangle } from "@/components/placeholder/drawable";

export default {
  title: "Placeholder/Drawing/Shapes",
  component: Drawing,
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
      <Triangle center={{ x: 0, y: 0 }} name="circle" />
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
