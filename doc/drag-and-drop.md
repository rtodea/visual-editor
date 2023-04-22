### Fix shape movement

When creating a new shape, its centre should be under the cursor.

When moving a shape, it should move as if it was grabbed exactly
where the cursor was at the start of dragging.

E.g. If we’re dragging a triangle by its top, it should look like
we’re dragging the triangle by the top all the time during the drag,
and when we release it, the cursor location should also be the top of the triangle.
