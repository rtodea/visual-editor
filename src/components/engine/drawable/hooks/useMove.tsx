import { DrawableProtoState } from "@/components/drawing/models";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useCallback, useState } from "react";
import {
  convert2dTo3d,
  convert3dTo2d,
  Point3d,
  vectorAsList,
} from "@/components/engine/drawing";
import { useLazyEffect } from "@/components/shared/hooks";
import { moveDrawable } from "@/store/slices/drawables";
import { useDispatch } from "react-redux";

const useDispatchMovePosition = ({ name }: { name: string }) => {
  const dispatch = useDispatch();

  return {
    dispatchNewPosition: (point: Point3d) => {
      dispatch(
        moveDrawable({
          name,
          position: convert3dTo2d(point),
        })
      );
    },
  };
};

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
  onMoveFinish,
}: {
  initialPosition: [number, number, number];
  userData: DrawableProtoState;
  name: string | undefined;
  onMoveFinish?: (point: Point3d) => void;
}) => {
  const { size, viewport, scene } = useThree();
  const aspect = size.width / viewport.width;

  const initialPoint3d = userData?.position
    ? convert2dTo3d(userData?.position)
    : { x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] };
  const [position, setPosition] = useState([
    initialPoint3d.x,
    initialPoint3d.y,
    initialPoint3d.z,
  ]);

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (!userData?.isDraggable) {
      return;
    }

    const [x0, y0, z0] = [initialPoint3d.x, initialPoint3d.y, initialPoint3d.z];

    const new3dPositionOffset = {
      x: x0 + mx / aspect,
      y: y0,
      z: z0 + my / aspect,
    };

    // TODO(robert): try different approaches for less lag
    // setPositionLowLevel(new3dPositionOffset);
    setPosition(vectorAsList(new3dPositionOffset));
    if (!down) {
      onMoveFinish?.(new3dPositionOffset);
    }
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

export const useMove = ({
  initialPosition,
  userData,
  name,
}: {
  initialPosition: [number, number, number];
  userData: DrawableProtoState;
  name: string | undefined;
}) => {
  const { dispatchNewPosition } = useDispatchMovePosition({ name: name || "" });
  const { bind, position } = useDragDrawable({
    initialPosition,
    userData,
    name,
    onMoveFinish: dispatchNewPosition,
  });

  return {
    bind,
    position,
  };
};
