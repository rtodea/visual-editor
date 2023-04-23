import { hexagonCenterToVertexList } from "@/components/engine/drawable/smart-shapes/closest-point/converters/hexagon";

describe("Hexagon from center to vertices", () => {
  it("should return a list of 6 vertices", () => {
    const vertexList = hexagonCenterToVertexList({ x: 0, y: 0, z: 0 });
    expect(vertexList.length).toEqual(6);
    expect(vertexList).toEqual([]);
  });
});
