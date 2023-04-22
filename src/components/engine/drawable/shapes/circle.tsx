import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

export const ThreeJsCircle = (props: ThreeElements["mesh"]) => {
  const geometry = new THREE.CircleGeometry(0.3, 32);

  return (
    <mesh {...props} geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial
        // wireframe={active}
        color={"black"}
      />
    </mesh>
  );
};
