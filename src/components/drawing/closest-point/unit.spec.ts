import { describe, expect, it } from "@jest/globals";
import {
  closestPointInPolygon,
  dotProduct,
  projectedPointOnEdge,
  vectorLength,
} from "@/components/drawing/closest-point/index";

describe("closest point logic", () => {
  it("should return the closest point on line", () => {
    expect(
      closestPointInPolygon(
        [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
          { x: 10, y: 10 },
          { x: 0, y: 10 },
        ],
        { x: 15, y: 5 }
      )
    ).toEqual({ x: 10, y: 5 });
  });

  it("should return the pos because it is inside the polygon", () => {
    expect(
      closestPointInPolygon(
        [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
          { x: 10, y: 10 },
          { x: 0, y: 10 },
        ],
        { x: 5, y: 5 }
      )
    ).toEqual({ x: 5, y: 5 });
  });
});

describe("dot product", () => {
  it("should return the dot product of two vectors", () => {
    expect(dotProduct({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual(11);
  });
});

describe("line length", () => {
  it("should return the length of a line", () => {
    expect(vectorLength({ x: 3, y: 4 })).toEqual(5);
  });
});

describe("projected point on line", () => {
  it("should return the projected point on a line #1", () => {
    expect(
      projectedPointOnEdge(
        [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
        ],
        { x: 5, y: 5 }
      )
    ).toEqual({ x: 5, y: 0 });
  });

  it("should return the projected point on a line #2", () => {
    expect(
      projectedPointOnEdge(
        [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
        ],
        { x: 5, y: -5 }
      )
    ).toEqual({ x: 5, y: 0 });
  });
});
