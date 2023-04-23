import { describe, expect } from "@jest/globals";
import { triangleCenterToVertexList } from "@/components/engine/drawable/shapes/triangle";

describe("Triangle from center to vertices", () => {
  it("should return a list of 3 vertices", () => {
    const vertexList = triangleCenterToVertexList({ x: 0, y: 0, z: 0 });
    expect(vertexList.length).toEqual(3);
    expect(vertexList).toEqual([
      {
        x: -1,
        y: 0,
        z: 1,
      },
      {
        x: 1,
        y: 0,
        z: 1,
      },
      {
        x: 0,
        y: 0,
        z: -1,
      },
    ]);
  });
});
