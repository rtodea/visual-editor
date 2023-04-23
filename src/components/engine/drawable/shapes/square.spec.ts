import { describe, expect, xit } from "@jest/globals";
import { squareCenterToVertexList } from "@/components/engine/drawable/shapes/square";

describe("Square from center to vertices", () => {
  xit("should return a list of 4 vertices", () => {
    const vertexList = squareCenterToVertexList({ x: 0, y: 0, z: 0 });
    expect(vertexList.length).toEqual(4);
    expect(vertexList).toEqual([]);
  });
});
