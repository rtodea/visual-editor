import { Point2d } from "@/components/drawing/models";

type Vector2d = Point2d;

export const dotProduct = (v1: Vector2d, v2: Vector2d): number => {
  // This function should return the dot product of the two vectors.
  // The dot product is the sum of the products of the corresponding
  // entries of the two vectors.

  return v1.x * v2.x + v1.y * v2.y;
};

export const vectorLength = (v: Vector2d): number => {
  return Math.sqrt(v.x * v.x + v.y * v.y);
};

export const vectorFromPoints = (a: Point2d, b: Point2d): Vector2d => {
  return { x: b.x - a.x, y: b.y - a.y };
};

export const cosineOfAngleBetweenVectors = (
  v1: Vector2d,
  v2: Vector2d
): number => {
  const dot: number = dotProduct(v1, v2);
  const v1Length: number = vectorLength(v1);
  const v2Length: number = vectorLength(v2);
  return dot / (v1Length * v2Length);
};

export const projectedPointOnEdge = (
  [a, b]: [Point2d, Point2d],
  p: Point2d
) => {
  // This function should return the point on the line defined by `a` and `b`
  // that is closest to `p`.
  const v1: Vector2d = vectorFromPoints(a, b);
  const v2: Vector2d = vectorFromPoints(a, p);

  const cosineV1V2: number = cosineOfAngleBetweenVectors(v1, v2);
  const lengthOfProjectedVector: number = cosineV1V2 * vectorLength(v2);
  const v1Length = vectorLength(v1);
  const deltaX = (lengthOfProjectedVector * v1.x) / v1Length;
  const deltaY = (lengthOfProjectedVector * v1.y) / v1Length;

  return {
    x: a.x + deltaX,
    y: a.y + deltaY,
  };
};

export const isProjectionOnEdge = (
  pos: Point2d,
  edge: [Point2d, Point2d]
): boolean => {
  const v1 = vectorFromPoints(edge[0], edge[1]);
  const v2 = vectorFromPoints(pos, edge[1]);
  const v1DotV2 = dotProduct(v1, v2);
  const v1LengthSquared = v1.x * v1.x + v1.y * v1.y;
  return 0 <= v1DotV2 && v1DotV2 < v1LengthSquared;
};

export const polygonToEdges = (poly: Point2d[]): [Point2d, Point2d][] => {
  return poly.map((point: Point2d, index: number) => {
    return [point, poly[(index + 1) % poly.length]];
  });
};

export const pointDistance = (point1: Point2d, point2: Point2d): number => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Using answer from https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
export const isPointInPolygon = (polygon: Point2d[], p: Point2d): boolean => {
  // This function should return true if `pos` is inside the polygon
  // defined by `poly`, and false otherwise.

  // quick test
  const Xmin = Math.min(...polygon.map((p) => p.x));
  const Xmax = Math.max(...polygon.map((p) => p.x));
  const Ymin = Math.min(...polygon.map((p) => p.y));
  const Ymax = Math.max(...polygon.map((p) => p.y));
  if (p.x < Xmin || p.x > Xmax || p.y < Ymin || p.y > Ymax) {
    return false;
  }

  let isInside = false;
  let i = 0,
    j = polygon.length - 1;
  for (; i < polygon.length; j = i++) {
    if (
      polygon[i].y > p.y != polygon[j].y > p.y &&
      p.x <
        ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
          (polygon[j].y - polygon[i].y) +
          polygon[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
};

export const closestPointInPolygon = (
  poly: Point2d[],
  pos: Point2d
): Point2d | undefined => {
  // This function should return the closest point to `pos` that is
  // inside the polygon defined by `poly`.
  if (isPointInPolygon(poly, pos)) {
    return pos;
  }

  const edges = polygonToEdges(poly);
  const edgesWithClosestPoints = edges.filter((edge) =>
    isProjectionOnEdge(pos, edge)
  );

  let closestPointOnEdge: Point2d | undefined;
  let closestPointDistance = Number.MAX_VALUE;
  for (const edge of edgesWithClosestPoints) {
    const projectedPoint = projectedPointOnEdge(edge, pos);
    const projectedPointDistance = pointDistance(projectedPoint, pos);
    if (projectedPointDistance < closestPointDistance) {
      closestPointDistance = projectedPointDistance;
      closestPointOnEdge = projectedPoint;
    }
  }

  let closestPolygonVertex: Point2d | undefined;
  let closestPolygonVertexDistance = Number.MAX_VALUE;
  for (const vertex of poly) {
    const vertexDistance = pointDistance(vertex, pos);
    if (vertexDistance < closestPolygonVertexDistance) {
      closestPolygonVertexDistance = vertexDistance;
      closestPolygonVertex = vertex;
    }
  }

  if (!closestPointOnEdge) {
    return closestPolygonVertex;
  }
  if (closestPointDistance < closestPolygonVertexDistance) {
    return closestPointOnEdge;
  } else {
    return closestPolygonVertex;
  }
};
