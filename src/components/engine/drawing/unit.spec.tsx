import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import {
  convert2dTo3d,
  convert3dTo2d,
} from "@/components/engine/drawing/index";

const Mesh = () => {
  const meshRef = useRef();
  useFrame((_, delta) => {
    // @ts-ignore
    meshRef.current.rotation.x += delta;
  });

  return (
    // @ts-ignore
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2]} />
      <meshBasicMaterial />
    </mesh>
  );
};

describe("Mesh Test", () => {
  it("should work", async () => {
    const renderer = await ReactThreeTestRenderer.create(<Mesh />);

    expect(renderer.scene.children[0].instance.rotation.x).toEqual(0);

    await ReactThreeTestRenderer.act(async () => {
      await renderer.advanceFrames(2, 1);
    });

    expect(renderer.scene.children[0].instance.rotation.x).toEqual(2);
  });
});

describe("Converting coordinate systems", () => {
  it("should convert from 2D to 3D", () => {
    expect(convert2dTo3d({ x: 1, y: 10 })).toEqual({
      x: 1,
      y: 0,
      z: 10,
    });
  });

  it("should convert from 3D to 2D", () => {
    expect(convert2dTo3d({ x: 1, y: 10 })).toEqual({
      x: 1,
      y: 0,
      z: 10,
    });
  });

  it("should convert from 3d to 2d and back", () => {
    expect(convert2dTo3d(convert3dTo2d({ x: 1, y: 0, z: 10 }))).toEqual({
      x: 1,
      y: 0,
      z: 10,
    });
  });

  it("should convert from 2d to 3d and back", () => {
    expect(convert3dTo2d(convert2dTo3d({ x: 1, y: 10 }))).toEqual({
      x: 1,
      y: 10,
    });
  });
});
