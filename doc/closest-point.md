## Closest Point Tool

This is the most complex tool and it will likely require some knowledge from geometry.
While the tool is active, an additional highlighted point should appear within each shape present in the editor area:
If mouse location is within a shape, the highlighted point location matches mouse location
If mouse location is outside of a shape, the highlighted point lies on the border of the shape, so that the distance
between the highlighted point and mouse location is minimal

See [an example video here](https://drive.google.com/file/d/1DVZapSUCr-pSfYjDcxnieZ2my0Nunv_9/view?usp=share_link)

All highlighted points should follow mouse location at all times.
You can assume that the shape polygons are not self-intersecting.

Example implementation:

```ts
interface Point {
  x: number;
  y: number;
}

function closestPointInPolygon(poly: Point[], pos: Point): Point {
// This function should return the closest point to “pos” that is
// inside the polygon defined by “poly”
}
```

Example input:

```ts
closestPointInPolygon([
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ], { x: 150, y: 50 }
);
```

With the example input, the function should return `{ x: 100, y: 50 }`.