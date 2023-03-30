import React, { useEffect } from "react";
import { DrawingContext } from "@/components/placeholder/drawing/hooks";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { convert3dTo2d } from "@/components/engine/drawing/index";
import { DrawingModeEnum } from "@/components/placeholder/drawing/models";
import { mouseClickOnDrawing } from "@/components/placeholder/drawing/actions";

export const useCaptureMouseClickDrawingCoordinates = () => {
  const mouse = new THREE.Vector2();
  const intersectionPoint = new THREE.Vector3();
  const planeNormal = new THREE.Vector3();
  const plane = new THREE.Plane();
  const raycaster = new THREE.Raycaster();

  const renderer = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  const size = useThree((state) => state.size);

  // @ts-ignore
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / size.width) * 2 - 1;
    mouse.y = -(event.clientY / size.height) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    // TODO(rtodea): Investigate why this is needed
    intersectionPoint.x -= 1.5;
  };

  const onMouseClick = () => {
    console.log("scene", scene.userData.mode);
    if (
      ![
        DrawingModeEnum.AddSquare,
        DrawingModeEnum.AddTriangle,
        DrawingModeEnum.AddHexagon,
      ].includes(scene.userData.mode)
    ) {
      return;
    }
    const [x, y, z] = intersectionPoint.toArray();
    // @ts-ignore
    scene.userData.dispatch(
      mouseClickOnDrawing({
        activeDrawingMode: scene.userData.mode,
        point2d: convert3dTo2d({ x, y, z }),
      })
    );
  };

  // TODO(robert): investigate what is happening here
  useEffect(() => {
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    console.log("adding event listener");
    renderer.domElement.addEventListener("click", onMouseClick);
  }, []);
};

export const ThreeJsHooksIntegration = ({
  drawingContext,
}: {
  drawingContext: DrawingContext;
}) => {
  useCaptureMouseClickDrawingCoordinates();

  const scene = useThree((state) => state.scene);
  scene.userData = drawingContext;

  return <></>;
};
