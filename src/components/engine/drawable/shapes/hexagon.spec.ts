import { describe, expect, xit } from "@jest/globals";
import { hexagonCenterToVertexList } from "@/components/engine/drawable/shapes/hexagon";

describe("Hexagon from center to vertices", () => {
  // TODO: fix weird import error preventing these tests to run
  xit("should return a list of 6 vertices", () => {
    const vertexList = hexagonCenterToVertexList({ x: 0, y: 0, z: 0 });
    expect(vertexList.length).toEqual(6);
    expect(vertexList).toEqual([]);
  });
});
