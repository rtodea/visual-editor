import { ThreeElements, useThree } from "@react-three/fiber";
import React, { FC, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import {
  convert2dTo3d,
  convert3dTo2d,
  vector,
} from "@/components/engine/drawing";
import { useDrag } from "@use-gesture/react";
import {
  DrawableProto,
  DrawableProtoState,
} from "@/components/placeholder/drawing/models";

export enum DrawableColor {
  Square = "red",
  Triangle = "green",
  Hexagon = "blue",
  Circle = "black",
}

export const useUpdatePositionOnDrag = ({
  initialPosition,
  userData,
}: {
  initialPosition: unknown;
  userData: DrawableProtoState;
}) => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // @ts-ignore
  const [position, setPosition] = useState<Vector3>(initialPosition);

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
      userData.position = convert3dTo2d(new3dPosition);
    },
    // @ts-ignore
    { pointerEvents: true }
  );

  return { bind, position };
};

export const useSelection = ({
  userData,
  materialColor,
}: {
  userData: DrawableProtoState;
  materialColor: string;
}) => {
  const [active, setActive] = useState(false);
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

    setActive(!active);
    userData.isSelected = !active;
  };
  const color = userData.isSelectable && active ? "hotpink" : materialColor;
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
    userData,
  });

  const selection = useSelection({
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

export const ThreeJsSquare = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = 1;
  const points = [
    { x: origin_x - offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y + offset },
    { x: origin_x - offset, y: origin_y + offset },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const squareShape = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable(props);
  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={squareShape}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};
export const ThreeJsTriangle = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const offset = 1;
  const points = [
    { x: origin_x - offset, y: origin_y - offset },
    { x: origin_x + offset, y: origin_y - offset },
    { x: origin_x, y: origin_y + offset },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const triangleShapeGeometry = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable({
    ...props,
    materialColor: DrawableColor.Triangle,
  });
  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={triangleShapeGeometry}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};
export const ThreeJsHexagon = (props: ThreeElements["mesh"]) => {
  const shape = new THREE.Shape();

  const origin_x = 0;
  const origin_y = 0;
  const radius = 1;
  const points = [
    { x: origin_x, y: origin_y + radius },
    { x: origin_x + radius * 0.866, y: origin_y + radius * 0.5 },
    { x: origin_x + radius * 0.866, y: origin_y - radius * 0.5 },
    { x: origin_x, y: origin_y - radius },
    { x: origin_x - radius * 0.866, y: origin_y - radius * 0.5 },
    { x: origin_x - radius * 0.866, y: origin_y + radius * 0.5 },
  ];

  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => {
    shape.lineTo(point.x, point.y);
  });

  const hexagonGeometry = new THREE.ShapeGeometry(shape);

  const { meshProps, selection } = useDrawable({
    ...props,
    materialColor: DrawableColor.Hexagon,
  });
  return (
    // @ts-ignore
    <mesh {...meshProps} geometry={hexagonGeometry}>
      <meshStandardMaterial color={selection.color} />
    </mesh>
  );
};

export const ThreeJsCircle = (props: ThreeElements["mesh"]) => {
  const geometry = new THREE.CircleGeometry(0.1, 32);

  return (
    <mesh {...props} geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial
        // wireframe={active}
        color={"black"}
      />
    </mesh>
  );
};

export const TreeJs2dSquare: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsSquare
      position={vector(convert2dTo3d(center))}
      name={name}
      materialColor={DrawableColor.Square}
      userData={state}
    />
  );
};

export const ThreeJs2dTriangle: FC<DrawableProto> = ({
  center,
  name,
  state,
}) => {
  return (
    <ThreeJsTriangle
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};

export const ThreeJs2dHexagon: FC<DrawableProto> = ({
  center,
  name,
  state,
}) => {
  return (
    <ThreeJsHexagon
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};

export const ThreeJs2dCircle: FC<DrawableProto> = ({ center, name, state }) => {
  return (
    <ThreeJsCircle
      position={vector(convert2dTo3d(center))}
      name={name}
      userData={state}
    />
  );
};
