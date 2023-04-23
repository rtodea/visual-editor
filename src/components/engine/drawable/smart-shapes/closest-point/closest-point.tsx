import { useMouse3dPosition } from "@/components/engine/drawable/hooks/useMouse3dPosition";
import { ThreeJsCircle } from "@/components/engine/drawable/shapes/circle";
import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  convert2dTo3d,
  convert3dTo2d,
  Point3d,
} from "@/components/engine/drawing";
import { Vector3 } from "three";
import { DrawableProtoEnum } from "@/components/drawing/models";
import { closestPointInPolygon } from "@/components/drawing/closest-point";
import { triangleCenterToVertexList } from "@/components/engine/drawable/shapes/triangle";
import { hexagonCenterToVertexList } from "@/components/engine/drawable/shapes/hexagon";
import { squareCenterToVertexList } from "@/components/engine/drawable/shapes/square";
import { DrawableShapeElevation } from "@/components/engine/drawable/shapes/constants";

export const closestPoint = ({
  meshPosition,
  meshType,
  mousePoint3d,
}: {
  meshPosition: Vector3;
  meshType: DrawableProtoEnum;
  mousePoint3d: Point3d;
}): [number, number, number] => {
  const center = meshPosition;
  // @ts-ignore
  const centerToVertexList = VERTEX_LOOKUP_BY_MESH_TYPE[meshType];
  if (!centerToVertexList) {
    console.log("cannot find converted");
    return [mousePoint3d.x, mousePoint3d.y, mousePoint3d.z];
  }
  const vertexList = centerToVertexList(center);

  const vertex2dList = vertexList.map((vertex: Point3d) =>
    convert3dTo2d(vertex)
  );
  const mousePoint2d = convert3dTo2d(mousePoint3d);
  const closestPoint2d = closestPointInPolygon(vertex2dList, mousePoint2d);
  if (!closestPoint2d) {
    return [mousePoint3d.x, mousePoint3d.y, mousePoint3d.z];
  }

  const closestPoint3d = convert2dTo3d(closestPoint2d);
  return [closestPoint3d.x, closestPoint3d.y, closestPoint3d.z];
};

export const meshTypeFromName = (name: string): DrawableProtoEnum => {
  for (const meshTypeName of Object.values(DrawableProtoEnum)) {
    if (name.includes(meshTypeName)) {
      return meshTypeName;
    }
  }

  return DrawableProtoEnum.Unknown;
};

export const useClosestPoint = ({
  meshName,
}: {
  meshName: string;
}): {
  closestPointPosition: [number, number, number];
  meshType: DrawableProtoEnum;
} => {
  const scene = useThree((state) => state.scene);
  const { mouse3dPosition } = useMouse3dPosition();
  const [closestPointPosition, setClosestPointPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);

  const meshType = meshTypeFromName(meshName);

  useEffect(() => {
    const meshPosition = scene.getObjectByName(meshName)?.position;
    if (!meshPosition) {
      console.log("cannot find", meshName);
      return;
    }

    setClosestPointPosition(
      closestPoint({
        meshPosition,
        mousePoint3d: mouse3dPosition,
        meshType,
      })
    );
  }, [scene, mouse3dPosition, meshName, meshType]);

  return {
    closestPointPosition,
    meshType,
  };
};

const VERTEX_LOOKUP_BY_MESH_TYPE = {
  [DrawableProtoEnum.Triangle]: triangleCenterToVertexList,
  [DrawableProtoEnum.Square]: squareCenterToVertexList,
  [DrawableProtoEnum.Hexagon]: hexagonCenterToVertexList,
} as const;

export const useVertexPositions = ({ meshName }: { meshName: string }) => {
  const scene = useThree((state) => state.scene);
  const [vertexPositions, setVertexPositions] = useState<Point3d[]>([]);
  const meshType = meshTypeFromName(meshName);
  useEffect(() => {
    const mesh = scene.getObjectByName(meshName);
    if (!mesh || !mesh.position) {
      console.log("cannot find mesh", meshName);
      return;
    }
    const centerToVertexList: (center: Point3d) => Point3d[] =
      // @ts-ignore
      VERTEX_LOOKUP_BY_MESH_TYPE[meshType];
    if (!centerToVertexList) {
      console.log("cannot find vertex list", meshType);
      return;
    }

    const vertexList = centerToVertexList(mesh.position);
    console.log("vertexList", vertexList);
    setVertexPositions(vertexList);
  }, [scene, meshName, meshType]);
  return { vertexPositions };
};

export const CLOSEST_POINT_ELEVATION = 0.3;

export const ClosestPoint = ({ name }: { name: string }) => {
  const { closestPointPosition } = useClosestPoint({
    meshName: name,
  });
  closestPointPosition[1] = DrawableShapeElevation.ClosestPoint;

  return (
    <ThreeJsCircle
      name={`ClosestPoint_${name}`}
      position={closestPointPosition}
    />
  );
};
