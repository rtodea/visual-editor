import { squareCenterToVertexList } from "@/components/engine/drawable/smart-shapes/closest-point/converters/square";

describe("Square from center to vertices", () => {
  it("should return a list of 4 vertices", () => {
    const vertexList = squareCenterToVertexList({ x: 0, y: 0, z: 0 });
    expect(vertexList.length).toEqual(4);
    expect(vertexList).toEqual([]);
  });
});
