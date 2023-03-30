import { DrawableProtoState } from "@/components/placeholder/drawing/models";
import { useDispatch } from "react-redux";
import { moveDrawable, selectDrawable } from "@/store/slices/drawables";
import { ThreeElements, useThree } from "@react-three/fiber";
import { DependencyList, EffectCallback, useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Vector3 } from "three";
import { convert3dTo2d, vector } from "@/components/engine/drawing";
import { useDrag } from "@use-gesture/react";

// Read more about this here: https://stackoverflow.com/a/67504622/351442
export function useLazyEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  wait = 3000
) {
  const cleanUp = useRef<void | (() => void)>();
  const effectRef = useRef<EffectCallback>();
  const updatedEffect = useCallback(effect, deps);
  effectRef.current = updatedEffect;
  const lazyEffect = useCallback(
    _.debounce(() => {
      cleanUp.current = effectRef.current?.();
    }, wait),
    []
  );
  useEffect(lazyEffect, deps);
  useEffect(() => {
    return () => {
      cleanUp.current instanceof Function ? cleanUp.current() : undefined;
    };
  }, []);
}

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
export const SelectionColor = "hotpink";
export const useSelection = ({
  name,
  userData,
  materialColor,
}: {
  name: string;
  userData: DrawableProtoState;
  materialColor: string;
}) => {
  const dispatch = useDispatch();

  if (!userData) {
    return {
      onClick: () => {},
      color: materialColor,
    };
  }
  const onSelected = () => {
    if (!userData.isSelectable) {
      return;
    }

    dispatch(selectDrawable({ name, isSelected: !userData.isSelected }));
  };
  const color =
    userData.isSelectable && userData.isSelected
      ? SelectionColor
      : materialColor;
  return { onClick: onSelected, color };
};
export const useHover = () => {
  const [hovered, setHover] = useState(false);
  const onPointerOver = () => setHover(true);
  const onPointerOut = () => setHover(false);

  return { onPointerOver, onPointerOut };
};
export const useDrawable = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const userData = props.userData as DrawableProtoState;

  const draggable = useUpdatePositionOnDrag({
    initialPosition: props.position,
    // @ts-ignore
    name: props.name,
    userData,
  });

  const selection = useSelection({
    // @ts-ignore
    name: props.name,
    userData,
    materialColor: props.materialColor,
  });

  const hover = useHover();

  const draggableProps = draggable.bind();
  const meshProps = {
    name: props.name,
    userData: props.userData,
    position: draggable.position,
    onClick: selection.onClick,
    onPointerOver: hover.onPointerOver,
    onPointerOut: hover.onPointerOut,
    "rotation-x": -Math.PI / 2,
    ...draggableProps,
  };

  return {
    meshProps,
    selection,
  };
};
