import { DrawableProtoState } from "@/components/drawing/models";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useCallback, useState } from "react";
import {
  convert3dTo2d,
  Point3d,
  vectorAsList,
} from "@/components/engine/drawing";
import { useLazyEffect } from "@/components/shared/hooks";
import { moveDrawable } from "@/store/slices/drawables";
import { useDispatch } from "react-redux";

export const useDispatchPositionUpdate = ({
  name,
  position,
}: {
  name: string;
  position: [number, number, number];
}) => {
  const dispatch = useDispatch();
  useLazyEffect(() => {
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
};

export const useDragDrawable = ({
  initialPosition,
  userData,
  name,
}: {
  initialPosition: [number, number, number];
  userData: DrawableProtoState;
  name: string | undefined;
}) => {
  const { size, viewport, scene } = useThree();
  const aspect = size.width / viewport.width;

  const [position, setPosition] = useState(initialPosition);

  const bind = useDrag(({ offset: [mx, my] }) => {
    if (!userData?.isDraggable) {
      return;
    }

    const [x0, y0, z0] = initialPosition;
    // console.log(x0, y0, z0);

    const new3dPositionOffset = {
      x: x0 + mx / aspect,
      y: y0,
      z: z0 + my / aspect,
    };

    // TODO(robert): try different approaches for less lag
    // setPositionLowLevel(new3dPositionOffset);
    setPosition(vectorAsList(new3dPositionOffset));
  }, {});

  const setPositionLowLevel = useCallback(
    (point3d: Point3d) => {
      if (!name) {
        return;
      }
      const object = scene.getObjectByName(name);
      object?.position.set(point3d.x, point3d.y, point3d.z);
    },
    [scene, name]
  );

  return { bind, position };
};

export const useMoveWithDrag = ({
  initialPosition,
  userData,
  name,
}: {
  initialPosition: [number, number, number];
  userData: DrawableProtoState;
  name: string | undefined;
}) => {
  const { bind, position } = useDragDrawable({
    initialPosition,
    userData,
    name,
  });

  useDispatchPositionUpdate({
    name: name as string,
    position: position as [number, number, number],
  });

  return {
    bind,
    position,
  };
};
