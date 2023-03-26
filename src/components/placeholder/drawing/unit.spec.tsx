import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ReactThreeTestRenderer from "@react-three/test-renderer";

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
