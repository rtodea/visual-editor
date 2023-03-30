import { DrawableProtoState } from "@/components/placeholder/drawing/models";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import { useDispatch } from "react-redux";
import { useLazyEffect } from "@/components/shared/hooks";
import { moveDrawable } from "@/store/slices/drawables";
import { convert3dTo2d, vector } from "@/components/engine/drawing";
import { useDrag } from "@use-gesture/react";

export const useUpdatePositionOnDrag = ({
  initialPosition,
  userData,
  name,
}: {
  initialPosition: unknown;
  userData: DrawableProtoState;
  name: string;
}) => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // @ts-ignore
  const [position, setPosition] = useState<Vector3>(initialPosition);
  const dispatch = useDispatch();

  // @ts-ignore
  useLazyEffect(() => {
    // @ts-ignore
    const [x, y, z] = position;

    dispatch(
      moveDrawable({
        name,
        position: convert3dTo2d({
          x,
          y,
          z,
        }),
      })
    );
  }, [dispatch, name, position]);

  const bind = useDrag(
    ({ offset: [mx, my] }) => {
      if (!userData?.isDraggable) {
        return;
      }

      // @ts-ignore
      const [, y] = position;
      const new3dPosition = { x: mx / aspect, y, z: my / aspect };
      // @ts-ignore
      setPosition(vector(new3dPosition));
    },
    // @ts-ignore
    { pointerEvents: true }
  );

  return { bind, position };
};
